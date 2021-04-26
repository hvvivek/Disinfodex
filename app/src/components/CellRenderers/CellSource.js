import { useState } from "react"
import {setFilter} from "../NetworkTableFilters"

import "../../assets/stylesheets/cells/source.css"

function CellSource(props)
{
    const [isExpanded, expand] = useState(false)
    let sources = props.value
    if(sources.length > 2)
    {
        return <div className="source">
            <p>
                <span className={sources[0].toLowerCase() + " source-tag"}
                      onClick={(e) => {e.stopPropagation(); setFilter({props, value: sources[0]})}}>
                            {sources[0].toUpperCase()}
                </span>
            </p>
            {isExpanded? 
                <>
                <p>{sources.map((source, i) => 
                        <span key={i} 
                                className={source.toLowerCase() + " source-tag"}
                                onClick={(e) => {e.stopPropagation(); setFilter({props, value: source})}}
                                >
                                {source.toUpperCase()}
                        </span>)}</p>
                <p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(false)}}>Show less</p>
                </>
                :<p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(true)}}>+ {sources.length - 1} more</p>
            
            }
        </div>
    }
    else
    {
        return <div className="source">
            <p>{sources.map((source, i) => <span key={i} 
                                onClick={(e) => {e.stopPropagation(); setFilter({props, value: source})}}
                                className={source.toLowerCase().split("/")[0] + " source-tag"}>{source.toUpperCase()}</span>)}</p>
        </div>
    }
}

export default CellSource