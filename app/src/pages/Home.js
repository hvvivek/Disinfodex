import React, { useState } from 'react'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

import NetworksTable from "../components/NetworksTable"
import NetworksCards from "../components/NetworksCards"
import "../assets/stylesheets/style.css"

import SwitchToggler from "../components/SwitchToggler"

function Home(props)
{
    const [mode, setMode] = useState("table")
    
    return <div className="flex-container" style={{"flexDirection":"column"}}>
            <Header {...{active: "database"}}/>

            <div className="flex-9">
                <SwitchToggler {...{"active": mode, setMode}}/>

                {mode === "table" &&                
                <NetworksTable {...props.data}></NetworksTable>}

                {mode === "cards" &&                
                <NetworksCards {...props.data}></NetworksCards>}

            </div>

            <Footer {...{active: "database"}}/>
        </div>
}

export default Home