import { useState, useContext } from "react"
import DataContext from "../contexts/DataContext"
import close from "../assets/images/icons/close.png"
import open from "../assets/images/icons/open.png"

import "../assets/stylesheets/disclosure_card.css"
import CellPolicyViolations from './CellRenderers/CellPolicyViolations'


function DisclosureCard(props)
{
    let {defaultExpanded = false} = props
    const [isExpanded, setExpanded] = useState(defaultExpanded)
    const value = useContext(DataContext)
    console.log(value)
    console.log(value['disclosures'])
    console.log(props)
    let report_data = value.disclosures.filter((report) => report.sync_id === props.sync_id)
    console.log(report_data)
    report_data = report_data[0]

    const {
        COMPANY,
        DISCLOSURE_DATE,
        'REMOVAL_TYPE': REMOVAL_TYPES,
        'ENGAGEMENT_CONTEXT': ENGAGEMENT_TYPE,
        POLICY_VIOLATIONS,
        'MAIN_URL': URL,
        SECONDARY_URL,
        NOTES,
        'DESCRIPTION_LONG': DESCRIPTION,
    } = report_data

    return (
        <div className="disclosure-card">
            <div className="flex-container header" style={{"justifyContent":"space-between"}} onClick={() => setExpanded(!isExpanded)}>
                <h1>{COMPANY}</h1>
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
                        <p>{REMOVAL_TYPES}</p>
                    </div>
                    <div className="flex-5">
                        <p className="sub-title">ENGAGEMENT</p>
                        <p>{ENGAGEMENT_TYPE}</p>
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
                        <a href={URL}>{URL}</a>
                    </div>

                    <div className="flex-5">
                        <p className="sub-title">SECONDARY_URL</p>
                        <a href={URL}>{SECONDARY_URL}</a>
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