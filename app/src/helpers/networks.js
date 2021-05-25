import axios from 'axios'

let {REACT_APP_BACKEND_URI} = process.env

export async function getAllNetworks(){
    let networks = []
    networks = await axios.get(`${REACT_APP_BACKEND_URI}/networks?all=true`)
    networks = networks.data

    //Removing ones with related networks
    networks = networks.filter((network) => network["Network Source Type"] && (network["Network Source Type"].includes("Platform") || (network["Related Networks"] && network["Related Networks"] === 1)))

    return networks
}