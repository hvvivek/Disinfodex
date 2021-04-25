// import Slider from "react-slick";
import {useContext} from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import COMPANY_LOGOS from "../config/COMPANY_LOGOS"
import DataContext from '../contexts/DataContext'

function ScreenshotCarousel({row, card=null, openNetworkCard=null, isLogoShown=true})
{
    console.log(row)
    const {screenshots} = useContext(DataContext)
    let screenshot_ids = row["Screenshots"]
    let row_screenshots = []
    let companies = row["Company Unique"]
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
        console.log(company_logos)
        
    }

    if(screenshot_ids && screenshot_ids.length > 0)
    {
        row_screenshots = screenshot_ids.map(id => screenshots.filter(screenshot => screenshot.sync_id === id)[0].SCREENSHOT)
        // console.log(row_screenshots)

    }
     

    return <> 
        {row_screenshots && row_screenshots.length > 0 && 
        <Carousel 
            showThumbs={false}
            centerMode={true}
            >
            {row_screenshots.map(screenshot => <div key={screenshot} 
                                                    onClick={(e) => {card && openNetworkCard && openNetworkCard(card)}}
                                                    style={{"display":"flex", "width":"auto", "height":"calc(360px - 2rem)", "justifyContent":"center"}}>
                <img src={screenshot} style={{"height":"100%", "width":"auto"}} alt="screenshot"></img>
            </div>)}
        </Carousel>}
        {
            
            isLogoShown && (!row_screenshots || row_screenshots.length === 0) && 
            <div 
            onClick={(e) => {card && openNetworkCard && openNetworkCard(card)}}
            style={{"width":"100%", "height":"100%", "display":"flex", "justifyContent":"center", "alignItems":"center", "flexDirection":"column"}}>
                {company_logos.map(logo => 
                <img key={logo} src={logo} style={{"maxWidth":"80%", "maxHeight":"30%", "marginTop":"1rem"}} alt="facebook"></img>)}
            </div>
        }
    </>
}

export default ScreenshotCarousel