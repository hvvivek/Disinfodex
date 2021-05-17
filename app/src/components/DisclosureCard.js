import { useState } from "react"
import close from "../assets/images/icons/close.png"
import open from "../assets/images/icons/open.png"

import "../assets/stylesheets/disclosure_card.css"
import CellPolicyViolations from './CellRenderers/CellPolicyViolations'
import COMPANY_LOGOS from "../config/COMPANY_LOGOS"


function DisclosureCard(props)
{
    let {defaultExpanded = false} = props
    const [isExpanded, setExpanded] = useState(defaultExpanded)

    const {
        COMPANY,
        DISCLOSURE_DATE,
        REMOVAL_TYPES,
        ENGAGEMENT_TYPE,
        POLICY_VIOLATIONS,
        'MAIN_URL': URL,
        SECONDARY_URL,
        NOTES,
        'DESCRIPTION_LONG': DESCRIPTION,
    } = props

    let logo = null
    let company_logo = COMPANY_LOGOS.filter(logo => logo.accessor === COMPANY[0])
    if(company_logo && company_logo.length > 0 && company_logo[0].src)
    {
        logo = <img src={company_logo[0].src} alt={company_logo[0].name}></img>
    }
    else
    {
        logo = COMPANY
    }
    

    return (
        <div className="disclosure-card">
            <div className="flex-container header" style={{"justifyContent":"space-between"}} onClick={() => setExpanded(!isExpanded)}>
                <h1>{logo}</h1>
                <div className="flex-container">
                    <h5>{DISCLOSURE_DATE}</h5>
                    {!isExpanded && <img src={close} onClick={() => setExpanded(true)} width="25" alt="close"></img>}
                    {isExpanded && <img src={open} onClick={() => setExpanded(false)} width="25" alt="open"></img>}
                </div>

            </div>
            {isExpanded && 
            <div>
                <div className="card-wrapper">
                    <div>
                        <p className="sub-title">DISCLOSURE DATE</p>
                        <p>{DISCLOSURE_DATE}</p>
                    </div>
                </div>
                <div className="card-wrapper">
                    <div className="flex-5">
                        <p className="sub-title">REMOVAL TYPES</p>
                        {REMOVAL_TYPES}
                    </div>
                    <div className="flex-5">
                        <p className="sub-title">ENGAGEMENT</p>
                        {ENGAGEMENT_TYPE}
                    </div>
                </div>

                <div className="card-wrapper">
                    <div className="flex-10">
                        <p className="sub-title">POLICY VIOLATIONS</p>
                        {/* <p>{POLICY_VIOLATIONS}</p> */}
                        <CellPolicyViolations {...{value:POLICY_VIOLATIONS}}/>
                    </div>
                </div>

                <div className="card-wrapper">
                    <div className="flex-5">
                        <p className="sub-title">URL</p>
                        <a target="_blank" rel="noreferrer noopener" href={URL}>{URL}</a>
                    </div>

                    <div className="flex-5">
                        <p className="sub-title">SECONDARY_URL</p>
                        <a target="_blank" rel="noreferrer noopener" href={URL}>{SECONDARY_URL}</a>
                    </div>
                </div>
                <div>
                    <div className="card-wrapper" style={{"flexDirection":"column"}}>
                        <p className="sub-title">NOTES</p>
                        <p>{NOTES}</p>
                    </div>
                    <div className="card-wrapper" style={{"flexDirection":"column"}}>
                        <p className="sub-title">DESCRIPTION</p>
                        <p>{DESCRIPTION}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default DisclosureCard