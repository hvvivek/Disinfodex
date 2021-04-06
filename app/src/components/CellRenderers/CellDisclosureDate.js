import { useState } from "react"
import "../../assets/stylesheets/cells/disclosure_date.css"
function CellDisclosureDate(props)
{
    const [isExpanded, expand] = useState(false)
    let dates = props.value
    if(dates.length > 2)
    {
        return <div className="disclosure-date">
            <p>{dates[0]}</p>
            {isExpanded? 
                <>
                {dates.map((date, i) => <p key={i}>{date}</p>)}
                <p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(false)}}>Show less</p>
                </>
                :<p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(true)}}>+ {dates.length - 1} more</p>
            
            }
        </div>
    }
    else
    {
        return <div className="disclosure-date">
            {dates.map((date, i) => <p key={i}>{date}</p>)}
        </div>
    }
}

export default CellDisclosureDate