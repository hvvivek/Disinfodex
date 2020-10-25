import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import axios from 'axios'

import logo_1 from '../Assets/Images/sponsor_logo_1.png'


import {BACKEND_URI, SYNC_URI} from '../constants'

import Table from '../Components/Table'
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
                            <Col className="sync-td">{sync.log.add}</Col>
                            <Col className="sync-td">{sync.log.update}</Col>
                            <Col className="sync-td">{sync.log.delete}</Col>
                            <Col className="sync-td">{sync.log.error}</Col>
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
        return <>
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="/">disinfodex</Navbar.Brand>
                    <Nav className="mr-auto">
                    
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                {/* NAVBAR COMPONENT */}
                
                <Container fluid id="sync">
                    
                    <Row>
                    <Col xs={12} lg={{span: 10, offset:1}}>
                        <Row className="justify-content-center">
                            <Button variant="dark" onClick={this.startSync}>Start Sync Job Manually</Button>
                        </Row>
                       </Col>
                       <Col xs={12} lg={{span: 10, offset:1}} id="sync-table">
                        <Col key={"-1"}>
                            <Row>
                                <Col className="sync-th">id</Col>
                                <Col className="sync-th">added</Col>
                                <Col className="sync-th">updated</Col>
                                <Col className="sync-th">deleted</Col>
                                <Col className="sync-th">errors</Col>
                                <Col className="sync-th">status</Col>
                                <Col className="sync-th">started</Col>
                                <Col className="sync-th">completed</Col>
                            </Row>

                            </Col>
                            {this.renderSyncRecords()}

                       </Col>
                       
                    </Row>
                </Container>
                <Container fluid id="footer">
                    <footer>
                        <Row>
                            <Col xs={12} lg={5}>
                                <p>Disinfodex is a project of the Assembly: Disinformation 2020 Fellowship, with support from the Harvard Berkman Klein Center, Miami Foundation, and Carnegie Endowment’s Partnership for Countering Influence Operations.</p>
                            </Col>
                            <Col xs={12} lg={7}>
                                <Row>
                                    <Col>
                                        <img src={logo_1}></img>
                                    </Col>
                                    <Col>
                                        <img src={logo_1}></img>
                                    </Col>
                                    <Col>
                                        <img src={logo_1}></img>
                                    </Col>
                                </Row>
                            </Col>
                        
                        </Row>  
                    </footer>
                    
                </Container>
        </>
    }
}

export default Sync