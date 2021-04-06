import { useState } from "react"
import "../../assets/stylesheets/cells/policy_violations.css"

function CellPolicyViolations(props)
{
    const [isExpanded, expand] = useState(false)
    let policy_violations = props.value
    if(policy_violations && policy_violations[0])
    {
    if(policy_violations.length > 2)
    {
        return <div className="policy-violation">
            <p><span className={"policy-violation-tag"}>{policy_violations[0].toUpperCase()}</span></p>
            {isExpanded? 
                <>
                <p>{policy_violations.map((policy_violation, i) => policy_violation && <span key={i} className={"policy-violation-tag"}>{policy_violation.toUpperCase()}</span>)}</p>
                <p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(false)}}>Show less</p>
                </>
                :<p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(true)}}>+ {policy_violations.length - 1} more</p>
            
            }
        </div>
    }
    else
    {
        return <div className="policy-violation">
            <p>{policy_violations.map((policy_violation, i) => policy_violation && <span key={i} className={"policy-violation-tag"}>{policy_violation.toUpperCase()}</span>)}</p>
        </div>
    }
    }
    else
    {
        return <div><p className="NA">N/A</p></div>
    }
}

export default CellPolicyViolations