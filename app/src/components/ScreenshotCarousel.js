// import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import COMPANY_LOGOS from "../config/COMPANY_LOGOS"

function ScreenshotCarousel({row, screenshots})
{
    let screenshot_ids = row.allCells.filter(cell => cell.column.Header === "Screenshots")[0].value
    let row_screenshots = []
    let companies = row.values["Company"]
    let company_logos = []
    if(companies && companies.length > 0)
    {
        for(let i=0; i<companies.length; i++)
        {
            let company = companies[i]
            let logo = COMPANY_LOGOS.filter(record => record.accessor === company)
            if(logo && logo.length > 0)
            {
                company_logos.push(logo[0].src)
            }
        }
        
    }

    if(screenshot_ids && screenshot_ids.length > 0)
    {
        row_screenshots = screenshot_ids.map(id => screenshots.filter(screenshot => screenshot.sync_id === id)[0].SCREENSHOT)
        // console.log(row_screenshots)

    }
     

    return <> 
        {row_screenshots && row_screenshots.length > 0 && <Carousel showThumbs={false}>
            {row_screenshots.map(screenshot => <div key={screenshot} style={{"display":"flex", "width":"auto", "height":"calc(360px - 2rem)"}}>
                <img src={screenshot} style={{"height":"100%", "width":"auto"}} alt="screenshot"></img>
            </div>)}
        </Carousel>}
        {
            (!row_screenshots || row_screenshots.length === 0) && <div style={{"width":"100%", "height":"100%", "display":"flex", "justifyContent":"center", "alignItems":"center", "flexDirection":"column"}}>
                {company_logos.map(logo => 
                <img key={logo} src={logo} style={{"maxWidth":"80%", "maxHeight":"30%", "marginTop":"1rem"}} alt="facebook"></img>)}
            </div>
        }
    </>
}

export default ScreenshotCarousel