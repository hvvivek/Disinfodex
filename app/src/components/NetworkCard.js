import React, {useContext} from 'react'
import DisclosureCard from "./DisclosureCard"
import "../assets/stylesheets/network_card.css"

import CellSource from './CellRenderers/CellSource'
import CellNamedEntities from './CellRenderers/CellNamedEntities'
import CellTargetCountry from './CellRenderers/CellTargetCountry'
import CellOriginCountry from './CellRenderers/CellOriginCountry'
import DataContext from "../contexts/DataContext"
import ScreenshotCarousel from './ScreenshotCarousel'


function StackDisclosures(disclosures)
{
    let REMOVAL_TYPES = []
    let ENGAGEMENT_TYPE = []
    for(let i=0; i<disclosures.length; i++)
    {
        let disclosure = disclosures[i]
        if(disclosure["REMOVAL_TYPE"])
        {
            if(disclosure["REMOVAL_NUMBER"])
            {
                REMOVAL_TYPES.push(<p key={Math.random()} style={{"marginBottom":"0px"}}><b>{disclosure["REMOVAL_NUMBER"]}</b> {disclosure["REMOVAL_TYPE"]}</p>)
            } 
            else
            {
                REMOVAL_TYPES.push(<p key={Math.random()} style={{"marginBottom":"0px"}}>{disclosure["REMOVAL_TYPE"]}</p>)
            }
        }

        if(disclosure["ENGAGEMENT_CONTEXT"])
        {
            ENGAGEMENT_TYPE.push(<p key={disclosure["ENGAGEMENT_CONTEXT"]} style={{"marginBottom":"0px"}}>{disclosure["ENGAGEMENT_CONTEXT"]}</p>)
        }
    }

    const {
        COMPANY,
        DISCLOSURE_DATE,
        POLICY_VIOLATIONS,
        MAIN_URL,
        SECONDARY_URL,
        NOTES,
        DESCRIPTION_LONG
    } = disclosures[0]

    return {
        COMPANY,
        DISCLOSURE_DATE,
        POLICY_VIOLATIONS,
        MAIN_URL,
        SECONDARY_URL,
        NOTES,
        DESCRIPTION_LONG,
        REMOVAL_TYPES,
        ENGAGEMENT_TYPE
    }
}

function NetworkCard(props)
{
    const value = useContext(DataContext)
    let {
        'Dates'                     : DISCLOSURE_DATES,
        'Origin Countries Tagged'   : ORIGIN_COUNTRIES,
        'Target Countries Tagged'   : TARGET_COUNTRIES,
        'Company'                   : PLATFORMS,
        'Named Entities Tagged'     : NAMED_ENTITIES,
        'Platform Reports'          : PLATFORM_REPORTS,
    } = props

    let {tableInstance} = props

    // let PLATFORM_REPORTS = value.disclosures.filter((report) => report.sync_id === props.sync_id)

    let disclosures = {}

    for(let i=0; i<PLATFORM_REPORTS.length; i++)
    {
        let platform_report = PLATFORM_REPORTS[i]
        platform_report = value.disclosures.filter((report) => report.sync_id === platform_report)[0]
        if (platform_report === undefined) continue
        let disclosure_id = platform_report["RECORD_ID"].split("-").slice(0, -1).join("-")

        if(disclosure_id in disclosures)
        {
            disclosures[disclosure_id] = [platform_report, ...disclosures[disclosure_id]]
        } 
        else
        {
            disclosures[disclosure_id] = [platform_report]
        }
    }
    let disclosure_ids = Object.keys(disclosures)

    PLATFORM_REPORTS = []
    for(let i=0; i<disclosure_ids.length; i++)
    {
        let reports = disclosures[disclosure_ids[i]]

        if(reports.length > 1)
        {
            PLATFORM_REPORTS.push([StackDisclosures(reports)])
        }
        else
        {
            PLATFORM_REPORTS.push(reports)
        }
    }



    return(
        <div>
            <div>
                <ScreenshotCarousel {...{row: props, isLogoShown: false}}/>
            </div>
            <div className="card-wrapper">

                <div className="flex-5">
                    <div className="module">
                        <p className="sub-title">DISCLOSURE DATE(S)</p>
                        <p className="dates">{DISCLOSURE_DATES.map(date=> <span key={Math.random()}>{date}</span>)}</p>
                    </div>

                    <div className="module">
                        <p className="sub-title">ORIGIN COUNTRY</p>
                        <CellOriginCountry {...{value:ORIGIN_COUNTRIES, id:"Origin Countries Tagged", tableInstance}} />

                    </div>

                </div>
                <div className="flex-5">
                    <div className="module">
                        <p className="sub-title">PLATFORM</p>
                        <CellSource {...{value: PLATFORMS, id:"Company Unique", tableInstance}}/>
                    </div>
                    <div className="module">
                        <p className="sub-title">TARGET COUNTRY</p>
                        <CellTargetCountry {...{value:TARGET_COUNTRIES, id:"Target Countries Tagged", tableInstance}} />
                    </div>
                </div>
                
            </div>
            <div className="card-wrapper" style={{"flexDirection":"column"}}>
                <div className="module"> 
                    <p className="sub-title">NAMED ENTITIES</p>
                    <CellNamedEntities {...{...props, value:NAMED_ENTITIES, id:"Named Entities Tagged", tableInstance}}/>
                </div>
                
            </div>
            <div>
                {PLATFORM_REPORTS.map(report => <div key={Math.random()} className="disclosure-card-wrapper"><DisclosureCard {...{...report[0], tableInstance}} /></div>)}
            </div>
        </div>
    )
}

export default NetworkCard