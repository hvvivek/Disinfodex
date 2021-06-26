import {useContext} from "react"
import {CSVLink} from "react-csv";
import "../assets/stylesheets/download_csv.css"
import DataContext from '../contexts/DataContext'



function DownloadCSVButton(table)
{
    const {screenshots} = useContext(DataContext)

    function getScreenshotLink(id)
    {
        let screenshot = screenshots.filter(screenshot => screenshot.sync_id === id)[0].SCREENSHOT
        return screenshot
    }
    
    let {filteredRows} = table
    // let data = filteredRows.map(row => row.original)
    let csv_records = filteredRows.map(row => {
        let record = row.original
        return {
            "NAME": record["Name"],
            "COMPANY": record["Company Unique"],
            "EARLIEST DATE": record["Earliest Date"],
            "LATEST DATE": record["Latest Date"],
            "DISCLOSURE DATES": record["Dates"],
            "NAMED ENTITIES": record["Named Entities Unique"],
            "NUMBER OF REPORTS": record["Num of Reports"],
            "ORIGIN COUNTRIES": record["Origin Countries Unique"],
            "TARGET COUNTRIES": record["Target Countries Tagged"],
            "POLICY VIOLATION": record["Policy Violations Unique"],
            "REMOVAL TYPE": record["Removal Type Unique"],
            "SCREENSHOTS" : record["Screenshots (from Related Networks)"]?.map(id => getScreenshotLink(id)),
            "LINK": `https://disinfodex.org/${record["_id"]}`
        }
    })

    return (
        <CSVLink className="download-csv-btn" data={csv_records}>Download CSV</CSVLink>
    )
}

export default DownloadCSVButton