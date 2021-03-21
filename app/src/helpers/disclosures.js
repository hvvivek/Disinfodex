import axios from 'axios'

let {REACT_APP_BACKEND_URI} = process.env

export async function getAllDisclosures(){
    let disclosures = []
    disclosures = await axios.get(`${REACT_APP_BACKEND_URI}/platforms?all=true`)
    disclosures = disclosures.data
    return disclosures
}