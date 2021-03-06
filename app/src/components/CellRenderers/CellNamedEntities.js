import { useState } from "react"
import {setFilter} from "../NetworkTableFilters"
import "../../assets/stylesheets/cells/named_entity.css"

function CellNamedEntities(props)
{


    const [isExpanded, expand] = useState(false)
    let named_entities = props.value
    if(named_entities && named_entities[0])
    {
    if(named_entities.length > 2)
    {
        return <div className="named-entity">
            
            
            {isExpanded? 
                <>
                <p>{named_entities.map((named_entity, i) => 
                        named_entity && <span 
                        key={i} 
                        onClick={(e) => {e.stopPropagation(); setFilter({props, value: named_entity})}}
                        className={"named-entity-tag"}
                        >{named_entity.toUpperCase()}</span>)}</p>
                <p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(false)}}>Show less</p>
                </>
                :<><p onClick={(e) => {e.stopPropagation(); setFilter({props, value: named_entities[0]})}}>
                <span className={"named-entity-tag"}>
                    {named_entities[0].toUpperCase()}
                </span>
            </p><p className="link" onClick={(e) => {e.stopPropagation(); e.preventDefault(); expand(true)}}>+ {named_entities.length - 1} more</p></>
            
            }
        </div>
    }
    else
    {
        return <div className="named-entity">
            <p>{named_entities.map((named_entity, i) => named_entity && <span 
                                                                            key={i} 
                                                                            onClick={(e) => {e.stopPropagation(); setFilter({props, value: named_entity})}}
                                                                            className={"named-entity-tag"}>{named_entity.toUpperCase()}</span>)}</p>
        </div>
    }
    }
    else
    {
        return <div><p className="NA">N/A</p></div>
    }
}

export default CellNamedEntities