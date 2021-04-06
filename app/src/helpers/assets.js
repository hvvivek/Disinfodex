import axios from 'axios'

let {REACT_APP_BACKEND_URI} = process.env

export async function getAllScreenshots(){
    let screenshots = []
    screenshots = await axios.get(`${REACT_APP_BACKEND_URI}/screenshots?all=true`)
    screenshots = screenshots.data
    // console.log(screenshots)
    return screenshots
}