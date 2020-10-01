let mongoose = require('mongoose')
let express = require('express')
let Airtable = require('airtable')
let axios = require('axios').default
let cors = require('cors')


let app = express()

app.use(cors())


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyLO3BE5Awy7vWSg'
});
var base = Airtable.base('app9iX4yxpJsbOxAK');

let sync_ids = []
let log = {add: 0, error: 0, update: 0, delete: 0}

const TABLES_TO_SYNC = [
    {
        "route": "platforms",
        "base": "Platform Reports",
        "view": "All Records"
    },
    {
        "route": "third_party_reports",
        "base": "3rd Party Reports",
        "view": "Grid view"
    },
    {
        "route": "screenshots",
        "base": "Screenshots",
        "view": "Grid view"
    },
    {
        "route": "companies",
        "base": "Companies",
        "view": "Grid view"
    },
    {
        "route": "networks",
        "base": "Networks",
        "view": "Grid view"
    }
]

async function startSync(syncRecord, table)
{

    console.log(table)
    log = {add: 0, error: 0, update: 0, delete: 0}

    ///////////////////////////////////////////////////////
    // Get already existing sync ids
    sync_ids = []
    sync_ids = await axios.get(`http://localhost:3010/${table['route']}?count=true`)
    sync_ids = sync_ids.data["sync_ids"]
    ///////////////////////////////////////////////////////

    let pages = await base(table['base']).select({
        // maxRecords: 3,
        view: table["view"]}
        )
        
    pages.eachPage(async (records, fetchNextPage) => {
        for(let i=0; i<records.length; i++)
        {
            let record = records[i]
            sync_ids.pop(record.id)
            log = await addOrUpdateRecord(record, table, log)
            // console.log(record.id, index)
        }
        fetchNextPage()
    }, async function done(error) {
        // console.log("Done")
        if(error)
        { 
            console.log(error)
        }
        else
        {
            // console.log("Done")
            // console.log(log)
            // console.log(sync_ids)
            if(sync_ids.length > 0)
            {
                //////////////////////////////////////////
                // Delete these records
                for(let i=0; i<sync_ids.length; i++)
                {
                    // console.log("Inside loop")
                    let sync_id = sync_ids[i]
    
                    let delete_result = await axios.delete(`http://localhost:3010/${table['route']}?sync_id=${sync_id}`)
                    
                    delete_result = delete_result.data
                    // console.log(delete_result)
                    if(delete_result.status)
                    {
                        log = {...log, delete: log.delete + 1}
                    }

                }
            }
            // console.log(log)
            let final_result = await axios.put("http://localhost:3010/sync", {"_id": syncRecord.data._id, processed: true, log: log})
            console.log(final_result.data)
        }
    })
}

async function addOrUpdateRecord(record, table, current_log)
{
    let return_value = current_log
    let response = await axios.get(`http://localhost:3010/${table['route']}?sync_id=${record.id}`)
    // console.log(response.data)

    response = response.data

    if(response.status)
    {
        let payload = {_id: response.data._id, sync_id:record.id, ...record.fields}
        try {
            let response = await axios.put(`http://localhost:3010/${table['route']}`, payload)
            response = response.data
            return_value = {...return_value, update: return_value.update + 1}
        } catch (error) {
            console.log("ERROR")
            console.log(error["response"]["statusText"])
            return_value = {...return_value, error: return_value.error + 1}
        }
    }
    else
    {
        let payload = {sync_id:record.id, ...record.fields}
        try {
            let response = await axios.post(`http://localhost:3010/${table['route']}`, payload)
            response = response.data
            return_value = {...return_value, add: return_value.add + 1}

        } catch (error) {
            console.log("ERROR")
            console.log(error["response"]["statusText"])
            return_value = {...return_value, error: return_value.error + 1}
        }
    }

    return return_value
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


let PORT = process.env.PORT || 3020


app.get("/sync", async (req, res) => {
    
    let syncRecord = await axios.post("http://localhost:3010/sync", {log: {add: 0, update:0, delete:0, error:0}, processed: false})

    for(let i=0; i<TABLES_TO_SYNC.length; i++)
    {
        let result = startSync(syncRecord.data, TABLES_TO_SYNC[i])
        console.log(result)

    }
    // let result = startSync(syncRecord.data)

    res.json({
        "status": true,
        "message": "Syncing process has started. Come back in a few minutes to see the results",
        "sync_id": syncRecord.data.data._id
    })
})

app.listen(PORT, (err) => {
    if(err)
    {
        console.log("Error starting server on port " + PORT)
    }
    console.log("Litening on port ", PORT)
})