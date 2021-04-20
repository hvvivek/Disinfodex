import React, {useContext} from 'react'
import DisclosureCard from "./DisclosureCard"
import "../assets/stylesheets/network_card.css"

import CellSource from './CellRenderers/CellSource'
import CellNamedEntities from './CellRenderers/CellNamedEntities'
import CellTargetCountry from './CellRenderers/CellTargetCountry'
import CellOriginCountry from './CellRenderers/CellOriginCountry'
import DataContext from "../contexts/DataContext"


function StackDisclosures(disclosures)
{
    let REMOVAL_TYPES = []
    let ENGAGEMENT_TYPE = []
    for(let i=0; i<disclosures.length; i++)
    {
        let disclosure = disclosures[i]
        if(disclosure["REMOVAL_TYPE"])
        {
            // console.log(disclosure)
            if(disclosure["REMOVAL_NUMBER"])
            {
                REMOVAL_TYPES.push(<p style={{"marginBottom":"0px"}}><b>{disclosure["REMOVAL_NUMBER"]}</b> {disclosure["REMOVAL_TYPE"]}</p>)
            } 
            else
            {
                REMOVAL_TYPES.push(<p style={{"marginBottom":"0px"}}>{disclosure["REMOVAL_TYPE"]}</p>)
            }
        }

        if(disclosure["ENGAGEMENT_CONTEXT"])
        {
            ENGAGEMENT_TYPE.push(<p style={{"marginBottom":"0px"}}>{disclosure["ENGAGEMENT_CONTEXT"]}</p>)
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

    // console.log(props)

    let {
        'Dates': DISCLOSURE_DATES,
        'Origin Countries Tagged': ORIGIN_COUNTRIES,
        'Target Countries Tagged': TARGET_COUNTRIES,
        'Company': PLATFORMS,
        'Named Entities': NAMED_ENTITIES,
        'Platform Reports': PLATFORM_REPORTS
    } = props

    // let PLATFORM_REPORTS = value.disclosures.filter((report) => report.sync_id === props.sync_id)

    let disclosures = {}

    for(let i=0; i<PLATFORM_REPORTS.length; i++)
    {
        let platform_report = PLATFORM_REPORTS[i]
        platform_report = value.disclosures.filter((report) => report.sync_id === platform_report)[0]
        // console.log(platform_report)

        let disclosure_id = platform_report["RECORD_ID"].split("-").slice(0, -1).join("-")

        if(disclosure_id in disclosures)
        {
            disclosures[disclosure_id] = [platform_report, ...disclosures[disclosure_id]]
            // console.log(disclosures)
        } 
        else
        {
            disclosures[disclosure_id] = [platform_report]
        }
    }
    let disclosure_ids = Object.keys(disclosures)
    // console.log(disclosure_ids)

    PLATFORM_REPORTS = []
    for(let i=0; i<disclosure_ids.length; i++)
    {
        let reports = disclosures[disclosure_ids[i]]
        // console.log(reports)

        if(reports.length > 1)
        {
            // console.log(StackDisclosures(reports))
            PLATFORM_REPORTS.push([StackDisclosures(reports)])
        }
        else
        {
            PLATFORM_REPORTS.push(reports)
        }
    }

    // console.log(PLATFORM_REPORTS)


    return(
        <div>
            {/* <div>
                <h2>Network {NETWORK_ID}</h2>
            </div> */}
            <div className="card-wrapper">

                <div className="flex-5">
                    <div className="module">
                        <p className="sub-title">DISCLOSURE DATE(S)</p>
                        <p className="dates">{DISCLOSURE_DATES.map(date=> <span key={Math.random()}>{date}</span>)}</p>
                    </div>

                    <div className="module">
                        <p className="sub-title">ORIGIN COUNTRY</p>
                        <CellOriginCountry {...{value:ORIGIN_COUNTRIES}} />

                    </div>

                </div>
                <div className="flex-5">
                    <div className="module">
                        <p className="sub-title">PLATFORM</p>
                        <CellSource {...{value: PLATFORMS}}/>
                    </div>
                    <div className="module">
                        <p className="sub-title">TARGET COUNTRY</p>
                        <CellTargetCountry {...{value:TARGET_COUNTRIES}} />
                    </div>
                </div>
                
            </div>
            <div className="card-wrapper" style={{"flexDirection":"column"}}>
                <div className="module"> 
                    <p className="sub-title">NAMED ENTITIES</p>
                    <CellNamedEntities {...{value:NAMED_ENTITIES}}/>
                </div>
                
            </div>
            <div>
                {PLATFORM_REPORTS.map(report => <div key={Math.random()} className="disclosure-card-wrapper"><DisclosureCard {...report[0]} /></div>)}
            </div>
        </div>
    )
}

export default NetworkCard