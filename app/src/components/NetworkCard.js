import React from 'react'
import DisclosureCard from "./DisclosureCard"
import "../assets/stylesheets/network_card.css"

import CellSource from './CellRenderers/CellSource'
import CellNamedEntities from './CellRenderers/CellNamedEntities'
import CellTargetCountry from './CellRenderers/CellTargetCountry'
import CellOriginCountry from './CellRenderers/CellOriginCountry'



function NetworkCard(props)
{
    console.log(props)
    let {
        'Dates': DISCLOSURE_DATES,
        'Origin Countries Tagged': ORIGIN_COUNTRIES,
        'Target Countries Tagged': TARGET_COUNTRIES,
        'Company': PLATFORMS,
        'Named Entities': NAMED_ENTITIES,
        'Platform Reports': PLATFORM_REPORTS
    } = props


    return(
        <div>
            {/* <div>
                <h2>Network {NETWORK_ID}</h2>
            </div> */}
            <div className="card-wrapper">

                <div className="flex-5">
                    <div className="module">
                        <p className="sub-title">DISCLOSURE DATE(S)</p>
                        <p className="dates">{DISCLOSURE_DATES.map(date=> <span >{date}</span>)}</p>
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
                {PLATFORM_REPORTS.map(report => <div className="disclosure-card-wrapper"><DisclosureCard {...{sync_id: report}} /></div>)}
            </div>
        </div>
    )
}

export default NetworkCard