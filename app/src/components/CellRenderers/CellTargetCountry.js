import { useState } from "react"
import {setFilter} from "../NetworkTableFilters"

import "../../assets/stylesheets/cells/target_country.css"
function CellTargetCountry(props)
{
    const [isExpanded, expand] = useState(false)
    let countries = props.value
    if(countries && countries[0])
    {
    if(countries.length > 2)
    {
        return <div className="target-country">
            {isExpanded? 
                <>
                {countries.map((country, i) => <p key={i}
                                onClick={(e) => {e.stopPropagation(); setFilter({props, value: country})}}
                                >{country.toUpperCase()}</p>)}
                <p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(false)}}>SHOW LESS</p>
                </>
                :<><p>{countries[0].toUpperCase()}</p><p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(true)}}>+ {countries.length - 1} MORE</p></>
            
            }
        </div>
    }
    else
    {
        return <div className="target-country">
            {countries.map((country, i) => <p key={i}
                                onClick={(e) => {e.stopPropagation(); setFilter({props, value: country})}}
                                >{country.toUpperCase()}</p>)}
        </div>
    }
    }
    else
    {
        return <div><p className="NA">N/A</p></div>
    }
}

export default CellTargetCountry