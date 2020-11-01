import React from 'react'
import moment from 'moment'
// import ColumnResizer from 'react-column-resizer'

import ScrenshotsCarousel from '../Components/ScreenshotsCarousel'

// import getNames from 'country-list'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Modal from 'react-bootstrap/Modal'
import NetworkModal from "../Components/NetworkModal"
import Card from "../Components/Card"
import TableRow from "../Components/TableRow"

import logo_1 from '../Assets/Images/sponsor_logo_1.png'
import logo_2 from '../Assets/Images/berkman_klein.png'
import logo_3 from '../Assets/Images/miami_foundation.png'


import Table from '../Components/Table'
import '../Stylesheets/Home.css'
import Collapse from 'react-bootstrap/esm/Collapse'
import axios from 'axios'
import Toggle from 'react-toggle'

import "react-toggle/style.css" // for ES6 modules
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "../Stylesheets/Card.css"

import table from "../Assets/Icons/table.png"
import table_active from "../Assets/Icons/table_active.png"
import cards from "../Assets/Icons/cards.png"
import cards_active from "../Assets/Icons/cards_active.png"


import { DateRangePicker } from 'react-date-range';
import {BACKEND_URI, SYNC_URI} from '../constants'
import { CSVLink, CSVDownload } from "react-csv";

const { getCode, getNames } = require('country-list');
const ObjectsToCsv = require('objects-to-csv');

let COMPANY_COLORS = {
    "Facebook": "rgba(59, 89, 152, 0.2)",
    "Twitter": "rgba(0, 172, 238, 0.2)",
    "Reddit": "rgb(255, 87, 0, 0.2)",
    "Google/YouTube": "rgb(196, 48, 43, 0.2)",
    "Graphika": "#AAAAAA",
    "DFRLab": "rgb(0, 134, 125, 0.2)"
}

class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            data: null
        }
    }


    componentDidMount()
    {
        this.setState({loading: true})
        this.getDataFromBackend()
    }

    getDataFromBackend = async () => {
        console.log(this.props)

        const { match: { params } } = this.props;

        let sync_ids = await axios.get(`${BACKEND_URI}/platforms?count=true`)
        sync_ids = sync_ids.data["sync_ids"]

        let platform_records = []
        let networks = []
        let screenshots = []

        platform_records = await axios.get(`${BACKEND_URI}/platforms?all=true`)
        networks = await axios.get(`${BACKEND_URI}/networks?all=true`)
        screenshots = await axios.get(`${BACKEND_URI}/screenshots?all=true`)

        platform_records = platform_records.data
        networks = networks.data
        screenshots = screenshots.data

        let data = null
        let network = null
        if("network_id" in params)
        {
            data = networks.filter(network => network.Name === params["network_id"])[0]
        }


        let screenshots_filtered = []
        if(data)
        {
        if(data["Screenshots"])
        {
            for(let i=0; i<data["Screenshots"].length; i++)
            {
                let SYNC_ID = data["Screenshots"][i]
                let filtered = screenshots.filter(image => image.sync_id === SYNC_ID)
                if(filtered && filtered.length > 0 )
                {
                    screenshots_filtered.push(filtered[0])
                }
            }
        }
        let platform_records_filtered = []

        if(data["Platform Reports"])
        {
            for(let i=0; i<data["Platform Reports"].length; i++)
            {
                let SYNC_ID = data["Platform Reports"][i]
                let filtered = platform_records.filter(record => record.sync_id === SYNC_ID)
                if(filtered && filtered.length > 0 )
                {
                    platform_records_filtered.push(filtered[0])
                }
            }
        }

        let payload = {
            networks: [data.Name],
            startDate: data["Earliest Date"],
            endDate: data["Latest Date"],
            platforms: data["Company"],
            removal_types: data["Removal Type"],
            description: data["Description"],
            screenshots: screenshots_filtered,
            platform_records: platform_records_filtered
        }
    
        this.setState({data: payload, loading: false})
    }
    else{
        this.setState({loading: false})
    }

    }

    renderModalKey = (key) => {

        const dictionary = {'COMPANY': "Company", 
        'DESCRIPTION_LONG': "Description",  
        'ORIGIN_COUNTRY': "Origin Country", 
        'DESTINATION_COUNTRY': "Destination Country", 
        'DISCLOSURE_DATE': "Disclosure Date",
        'MAIN_URL':"URL", 
        'NAMED_ENTITIES_FULL': "Named Entities", 
        'RECORD_ID': "Record ID", 
        'SECONDARY_URL': "Additional URL"};

        return dictionary[key]

    }
    renderModalValue = (key, value, isModal) => {
        
        if(key === "MAIN_URL" || key === "SECONDARY_URL")
        {
            return <a target="_blank" rel="noopener noreferrer" href={value.toString()}>Link</a>
        }
        if(typeof(value) != "object")
        {
            return value.toString()
        }
        else if(typeof(value) == "object" && value.length > 0)
        {
            if(key == "COMPANY")
            {
                return value.map(data => <p className={key} style={{"backgroundColor": COMPANY_COLORS[data]}}>{data}</p>)
            }
            else if(key == "NETWORKS")
            {
                if(isModal)
                {
                    return value.map(data => <p className={key}>{data.Name}</p>)
                }
                else
                {
                    return value.map(data => <p className={key}>{data.Name}</p>)
                }
            }
        }
        else
        {
            return null
        }
    }

    filterData = (raw) => {
        const allowed = ['COMPANY', 'DESCRIPTION_LONG',  'ORIGIN_COUNTRY', 'DESTINATION_COUNTRY', 'DISCLOSURE_DATE', 'MAIN_URL', 'NAMED_ENTITIES_FULL', 'RECORD_ID', 'SECONDARY_URL'];

        const filtered = Object.keys(raw)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
        }, {});

        return filtered
    }

    render()
    {
        let data = {}
        if(this.state.data)
        {
            data = this.state.data
        }
        let {networks, startDate, endDate, platforms, removal_types, screenshots, platform_records} = data
        let descriptions = []
        if(data)
        {
            let unique_descriptions = []
            console.log(platform_records)

            if(platform_records)
            {
                for(let i=0; i<platform_records.length; i++)
                {
                    let record = platform_records[i]
                    if(!unique_descriptions.includes(record["DESCRIPTION_LONG"]))
                    {
                        descriptions.push(record) 
                        unique_descriptions.push(record["DESCRIPTION_LONG"])
                    }
                }
        }

        console.log(descriptions)
        descriptions = descriptions.map(record => <><p><b>From {record["COMPANY"][0]}</b></p><p>{record["DESCRIPTION_LONG"]}</p></>)
            console.log(descriptions)
            
        }
        return <>
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>

                </Navbar>
                {/* NAVBAR COMPONENT */}

                <Container fluid id="home">
                    <Row>
                        <Col xs={12} id="info-section">
                            <Row>
                            <Col xs={12} lg={4}>
                                <p>Disinfodex is a database of publicly available information about disinformation campaigns. It currently includes disclosures issued by major online platforms and accompanying reports from independent open source investigators.</p>
                            </Col>
                            <Col xs={12} lg={{span:4, offset:4}}>
                                <p className="links"><a href="/about" className="active">About this project</a></p>
                                <p className="links"><a href="/">Database</a></p>
                                <p className="links"><a href="/whitepaper">Whitepaper</a></p>
                                <p className="links"><a href="/how-to">How to read the database?</a></p>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                
                {this.state.data && 
                <Container>
                    <Row>
                        <Col xs={12} style={{"minHeight": "300px", "padding":"0px"}}>
                            <ScrenshotsCarousel screenshots={screenshots} company={platforms && platforms.length>0 && platforms[0]}></ScrenshotsCarousel>
                        </Col>
                        <Col xs={6} className="description-section modal-description-section">
                            <Col xs={12} className="section">
                                <p className="subtitle">Network</p>
                                <p>{networks && networks.map(network => <span id={network} className="network">{network}</span>)}</p>
                            </Col>

                            <Col xs={12} className="section">
                                <p className="subtitle">Known Active Dates</p>
                                <p className="active-date">{startDate} {endDate && " to " + endDate}</p>
                            </Col>

                            <Col xs={12} className="section">
                                <p className="subtitle">Platform</p>
                                <p>{platforms.map(platform => <span id={platform} className="platform" style={{"backgroundColor": COMPANY_COLORS[platform]}}>{platform}</span>)}</p>
                            </Col>

                            <Col xs={12} className="section">
                                <p className="subtitle">Removal Type</p>
                                <p>{removal_types && removal_types.map(type => <span id={type} className="type">{type}</span>)}</p>
                            </Col>
                        </Col>
                        <Col xs={6} style={{padding: "0px"}}>
                            <Col xs={12} className="section description">
                                <p className="subtitle">DESCRIPTION</p>
                                {descriptions}
                            </Col>
                        </Col>

                        <Col xs={12}>
                            <p className="divider">Platform Records: </p>
                            {platform_records.map(payload => 
                                <Row>
                                    <Col xs={12} className="row-modal description-section modal-description-section">
                                        <p className="platform_record_title"><b>{payload["COMPANY"]} - {payload["DISCLOSURE_DATE"]}</b></p>
                                        {Object.keys(this.filterData(payload)).map(key =>
                                            <>{payload[key] && <Col xs={12} className="section">
                                                <p className="subtitle">{this.renderModalKey(key)}</p>
                                                <p>{this.renderModalValue(key, payload[key], true)}</p>
                                            </Col>}</>
                                        )}
                                    </Col>
                                </Row>)}
                        </Col>
                    </Row>
                </Container>}

                {!this.state.data && this.state.loading && <p className="alert-message">Loading Data</p>}
                {!this.state.data && !this.state.loading && <p className="alert-message">No Network found with this ID</p>}

                <Container fluid id="footer">
                    <footer>
                        <Row className="align-items-end">
                            <Col xs={12} lg={3}>
                                <p>Disinfodex is a project of the Assembly: Disinformation 2020 Fellowship, with support from the Harvard Berkman Klein Center, Miami Foundation, and Carnegie Endowment’s Partnership for Countering Influence Operations.</p>
                            </Col>
                            <Col xs={12} lg={{span: 7, offset:2}}>
                                <Row className="justify-content-end">
                                    <Col className="logo-wrapper">
                                        <img src={logo_1}></img>
                                    </Col>
                                    <Col className="logo-wrapper">
                                        <img src={logo_2}></img>
                                    </Col>
                                    <Col className="logo-wrapper">
                                        <img src={logo_3}></img>
                                    </Col>
                                </Row>
                            </Col>
                        
                        </Row>  
                    </footer>
                    
                </Container>
        </>
    }
}

export default Home