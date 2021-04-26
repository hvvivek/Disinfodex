import React, { useContext, useState } from 'react'
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

import NetworksTable from "../components/NetworksTable"
import NetworksCards from "../components/NetworksCards"
import "../assets/stylesheets/style.css"
import DataContext from "../contexts/DataContext"
import SwitchToggler from "../components/SwitchToggler"
import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/core";


const override = css`
  display: block;
  margin: 0 auto;
  text-align: center;
`;

function Home(props)
{
    const [mode, setMode] = useState("table")
    const [filters, setFilters] = useState([])
    let data = useContext(DataContext)

    return <div className="flex-container" style={{"flexDirection":"column"}}>
            <Header {...{active: "database"}}/>

            <div className="flex-9">
                <SwitchToggler {...{"active": mode, setMode}}/>

                {(!data.networks || (data.networks.length === 0)) && 
                                
                    <ScaleLoader
                        css={override}
                        size={150}
                        color={"#003358"}
                        loading={true}
                    />
                }

                {data.networks && data.networks.length > 0 && mode === "table" &&                
                <NetworksTable {...{...props.data, filters, setFilters}}></NetworksTable>}

                {data.networks && data.networks.length > 0 && mode === "cards" &&                
                <NetworksCards {...{...props.data, filters, setFilters}}></NetworksCards>}
            </div>

            <Footer {...{active: "database"}}/>
        </div>
}

export default Home