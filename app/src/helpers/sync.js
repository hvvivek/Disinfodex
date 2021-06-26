import axios from 'axios'

let {REACT_APP_BACKEND_URI} = process.env

export async function getSyncData(){
    let syncs = []
    syncs = await axios.get(`${REACT_APP_BACKEND_URI}/sync?limit=10`)
    syncs = syncs.data
    return syncs
}