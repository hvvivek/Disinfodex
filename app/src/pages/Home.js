import React from 'react'
import Header from "../components/Header/Header"
import NetworksTable from "../components/NetworksTable"
import "../assets/stylesheets/style.css"

class Home extends React.Component
{
    render()
    {
        return <div className="flex-container" style={{"flexDirection":"column"}}>
                <Header {...{active: "database"}}/>

                <div className="flex-9">
                    <NetworksTable {...this.props.data}></NetworksTable>
                </div>
            </div>
    }
}

export default Home