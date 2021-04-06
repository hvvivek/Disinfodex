import { useState } from "react"
import "../../assets/stylesheets/cells/source.css"

function CellSource(props)
{
    const [isExpanded, expand] = useState(false)
    let sources = props.value
    if(sources.length > 2)
    {
        return <div className="source">
            <p><span className={sources[0].toLowerCase() + " source-tag"}>{sources[0].toUpperCase()}</span></p>
            {isExpanded? 
                <>
                <p>{sources.map((source, i) => <span key={i} className={source.toLowerCase() + " source-tag"}>{source.toUpperCase()}</span>)}</p>
                <p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(false)}}>Show less</p>
                </>
                :<p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(true)}}>+ {sources.length - 1} more</p>
            
            }
        </div>
    }
    else
    {
        return <div className="source">
            <p>{sources.map((source, i) => <span key={i} className={source.toLowerCase().split("/")[0] + " source-tag"}>{source.toUpperCase()}</span>)}</p>
        </div>
    }
}

export default CellSource