import React from 'react'
import NetworksTable from "../components/NetworksTable"
import "../assets/stylesheets/style.css"

class Home extends React.Component
{
    render()
    {
        return <div className="flex-container">
                <div className="flex-9">
                    <NetworksTable {...this.props.data}></NetworksTable>
                </div>
            </div>
    }
}

export default Home