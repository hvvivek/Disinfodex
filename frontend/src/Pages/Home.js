import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'



import logo_1 from '../Assets/Images/sponsor_logo_1.png'
import logo_2 from '../Assets/Images/berkman_klein.png'
import logo_3 from '../Assets/Images/miami_foundation.png'


import Table from '../Components/Table'
import '../Stylesheets/Home.css'
import Collapse from 'react-bootstrap/esm/Collapse'
class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            filterPanelCollapsed: true
        }
    }

    toggleFilterPanel = (e) => {
        this.setState({filterPanelCollapsed: !this.state.filterPanelCollapsed})
    }

    componentDidMount()
    {
        this.getDataFromAirtable()
    }

    getDataFromAirtable = () => {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('app9iX4yxpJsbOxAK');
        
        base('Disclosures').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                console.log('Retrieved', record.get('Date of Disclosure'));
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    render()
    {
        return <>
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="#home">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
                
                <Container fluid id="home">
                    <Row>
                        <Col xs={12} id="info-section">
                            <Row>
                            <Col xs={12} lg={4}>
                                <p>Disinfodex is an online database indexing public disclosures of disinformation campaigns issued by major online platforms, currently including Facebook, Instagram, Google, YouTube, Twitter, and Reddit. The database aims to help those working in the disinformation field to better analyze the information on actions taken against disinformation networks from these companies.</p>
                            </Col>
                            <Col xs={12} lg={{span:4, offset:4}}>
                                <p class="links"><a>About this project</a></p>
                                <p class="links"><a className="active">Database</a></p>
                                <p class="links"><a>Whitepaper</a></p>
                            </Col>
                            </Row>
                        </Col>
                        <Col xs={12} id="search-section">
                            <Col xs={12} lg={{span:6, offset:3}}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i class="fas fa-search"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Search the database"
                                />
                            </InputGroup>
                                {/* <FormControl type="text" placeholder={"Search the database"} className="mr-sm-2">
                                <i class="fas fa-search"></i>
                                </FormControl> */}
                            </Col>
                            <Col xs={12} className="link">
                                <a href="www.google.com">Learn more about the data collection process</a>
                            </Col>
                        </Col>
                        <Col xs={12} id="view-options">
                            <Row className="justify-content-end">
                                <Col xs={6}>
                                    <Row className="justify-content-end">
                                        <Col>
                                            <Button onClick={this.toggleFilterPanel}><span>{!this.state.filterPanelCollapsed? "⯅": "⯆"}</span> Filters</Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={6}>
                                    <Row className="justify-content-end">
                                        <Col>
                                            <p>View As:</p>
                                        </Col>
                                        <Col>
                                            <p><i class="fas fa-table"></i> Table</p>
                                        </Col>
                                        <Col>
                                            <p><i class="fas fa-stream"></i> Timeline</p>
                                        </Col>
                                        <Col>
                                            <p><i class="fas fa-globe"></i> Map</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row>
                            <Col xs={12} id="filters-section">
                                <Collapse in={this.state.filterPanelCollapsed}>

                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Date of Disclosure</Form.Label>
                                                    <Form.Control type="date" name="date" placeholder="Date" />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Disclosure Source</Form.Label>
                                                    <Form.Control as="select" name="disclosure_source" placeholder="" />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Platform</Form.Label>
                                                    <Form.Control as="select" name="platform" placeholder="Platform" />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Affected Product</Form.Label>
                                                    <Form.Control as="select" name="removed_content" placeholder="Removed Content" />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Geographic Area</Form.Label>
                                                    <Form.Control as="select" name="geography" placeholder="Geography" />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Policy Infringement</Form.Label>
                                                    <Form.Control as="select" name="policy_infringement" placeholder="Policy Infringement" />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label></Form.Label>
                                                    <Form.Check type="checkbox" name="date" label="Contains Screenshots" />
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                    </Form>
                                </Collapse>
                            </Col>
                            <Col xs={12} lg={7} id="table-section">
                                <Table></Table>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
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