
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import facebook_logo from '../Assets/Logos/facebook_logo.png'
import twitter_logo from '../Assets/Logos/twitter_logo.png'
import reddit_logo from '../Assets/Logos/reddit_logo.png'
import youtube_logo from '../Assets/Logos/youtube_logo.png'
import graphika_logo from '../Assets/Logos/graphika_logo.png'
import dfr_lab_logo from '../Assets/Logos/dfr_lab_logo.png'

class ScreenshotsCarousel extends React.Component
{

    render()
    {
        let company_logo = null
        switch(this.props.company)
        {
            case "Facebook":
                company_logo = facebook_logo;
                break
            case "Twitter":
                company_logo = twitter_logo
                break
            case "Reddit":
                company_logo = reddit_logo
                break
            case "Google/Youtube":
                company_logo = youtube_logo
                break
            case "Graphika":
                company_logo = graphika_logo
                break
            case "DFRLab":
                company_logo = dfr_lab_logo
                break
            default:
                company_logo = facebook_logo
        }
        let render = null
        if(this.props.screenshots && this.props.screenshots.length > 0)
        {
            render = <Carousel showThumbs={false}>
                {this.props.screenshots.map(screenshot => <img style={{"maxHeight":"200px"}} src={screenshot["SCREENSHOT"]}></img>)}
            </Carousel>
        }
        else
        {
            render = 
            <div className="company-logo-wrapper">
                <img className="company-logo" src={company_logo}>

                </img>
                <p>No Screenshots available</p>
            </div>
        }

        return render
    }
    
}

export default ScreenshotsCarousel