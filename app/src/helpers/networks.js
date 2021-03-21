import axios from 'axios'

let {REACT_APP_BACKEND_URI} = process.env

export async function getAllNetworks(){
    let networks = []
    networks = await axios.get(`${REACT_APP_BACKEND_URI}/networks?all=true`)
    networks = networks.data
    return networks
}