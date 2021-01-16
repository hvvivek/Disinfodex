import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Footer from '../Components/Footer'

import axios from 'axios'

import {BACKEND_URI, SYNC_URI} from '../constants'

import '../Stylesheets/Home.css'
import '../Stylesheets/Sync.css'

class Sync extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    componentDidMount()
    {
        this.getSyncRecords()
        this.getAirtableStats()
        this.getDatabaseStats()
    }

    getAirtableStats = async () => {
        let stats = await axios.get(`${SYNC_URI}/stats`)
        stats = stats.data.stats
        this.setState({airtable_stats: stats})
    }

    getDatabaseStats = async () => {
        let stats = await axios.get(`${BACKEND_URI}/stats`)
        stats = stats.data
        this.setState({db_stats: stats})
    }

    getSyncRecords = async () => {
        let syncs = await axios.get(`${BACKEND_URI}/sync?all=true`)
        syncs = syncs.data
        console.log(syncs)
        syncs.reverse()
        this.setState({syncs: syncs})
    }

    startSync = async () => {
        let result = await axios.get(`${SYNC_URI}/sync`)
        result = result.data
        if(result.status)
        {
            this.getSyncRecords()
        }
    }

    renderSyncRecords = () =>
    {  
        let RENDERS = []
        if(this.state.syncs && this.state.syncs.length > 0)
        {
            for(let i=0; i<this.state.syncs.length; i++)
            {
                let sync= this.state.syncs[i]
                RENDERS.push(
                    <Col key={i}>
                        <Row>
                            <Col className="sync-td">{sync._id}</Col>
                            {/* <Col className="sync-td">{sync.log.add}</Col>
                            <Col className="sync-td">{sync.log.update}</Col>
                            <Col className="sync-td">{sync.log.delete}</Col>
                            <Col className="sync-td">{sync.log.error}</Col> */}
                            <Col className="sync-td">{sync.processed? "Done": "In Progress"}</Col>
                            <Col className="sync-td">{sync.createdAt}</Col>
                            <Col className="sync-td">{sync.processed? sync.updatedAt: ""}</Col>
                        </Row>
                        
                    </Col>
                )
            }
        }
        return RENDERS

    }

    render()
    {
        let keys = ["Networks", "Platform Reports", "Screenshots"]
        let stat_records = []
        if(this.state.airtable_stats && this.state.db_stats)
        {
            for(let i=0; i<keys.length; i++)
            {
                stat_records.push(<Row>
                    <Col xs={8}>
                        <p>{keys[i]}</p>
                    </Col>
                    <Col xs={2}>
                        <p>{this.state.airtable_stats[keys[i]]} </p>
                    </Col>
                    <Col xs={2}>
                    <p>{this.state.db_stats[keys[i]]} </p>
                    </Col>
                </Row>)
            }
        }
        return <>
            <div id="top">
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
            </div>
                
                <Container fluid id="sync">
                    
                    <Row>
                    <Col xs={12} lg={{span: 10, offset:1}}>
                        <Row>
                            <Col xs={12}>
                                <h2 style={{"textAlign":"center"}}>
                                    Current Sync Health
                                </h2>
                            </Col>
                            <Col xs={12}>
                                <Row>
                                    <Col xs={8}>
                                        <p>Table</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p>Airtable # Records</p>
                                    </Col>
                                    <Col xs={2}>
                                        <p>Database # Records</p>
                                    </Col>
                                </Row>
                                {stat_records}
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Button variant="dark" onClick={this.startSync}>Start Sync Job Manually</Button>
                        </Row>
                       </Col>
                       <Col xs={12} lg={{span: 10, offset:1}} id="sync-table">
                        <Col key={"-1"}>
                            <Row>
                                <Col className="sync-th">id</Col>
                                {/* <Col className="sync-th">added</Col>
                                <Col className="sync-th">updated</Col>
                                <Col className="sync-th">deleted</Col>
                                <Col className="sync-th">errors</Col> */}
                                <Col className="sync-th">status</Col>
                                <Col className="sync-th">started</Col>
                                <Col className="sync-th">completed</Col>
                            </Row>

                            </Col>
                            {this.renderSyncRecords()}

                       </Col>
                       
                    </Row>
                </Container>
                <Footer></Footer>

        </>
    }
}

export default Sync