import cards from "../assets/images/icons/cards.png"
import cards_active from "../assets/images/icons/cards_active.png"
import table_active from "../assets/images/icons/table_active.png"
import table from "../assets/images/icons/table.png"
import "../assets/stylesheets/switch_toggler.css"

function SwitchToggler(props)
{
    // console.log(props)
    let {active, setMode} = props

    return <div id="switch-toggler" style={{"display":"flex", "justifyContent":"flex-end"}}>
                <div style={{"display":"flex", "flexDirection":"row"}}>
                    <p>View As:</p>
                    <div onClick={() => setMode("table")} className={active === "table"? "active toggle": "toggle"} style={{"display":"flex", "flexDirection":"row"}}>
                        <img src={active === "table"? table_active: table} alt="table" width="40" height="30"></img>
                        <p>Table</p>
                    </div>
                    <div onClick={() => setMode("cards")} className={active === "cards"? "active toggle": "toggle"} style={{"display":"flex", "flexDirection":"row"}}>
                        <img src={active === "cards"? cards_active: cards} alt="cards" width="40" height="30"></img>
                        <p>Cards</p>
                    </div>
                </div>
            </div>
}

export default SwitchToggler