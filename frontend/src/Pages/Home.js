import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


import logo_1 from '../Assets/Images/sponsor_logo_1.png'


import Table from '../Components/Table'
import '../Stylesheets/Home.css'
class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {}
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
                    <Navbar.Brand href="#home">disinfodex</Navbar.Brand>
                    <Nav className="mr-auto">
                    
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                {/* NAVBAR COMPONENT */}
                
                <Container fluid>
                    
                    <Row>
                        <Col xs={12} id="info-section">
                            <Row>
                            <Col xs={12} lg={4}>
                                <p>Disinfodex is an online database indexing public disclosures of disinformation campaigns issued by major online platforms, currently including Facebook, Instagram, Google, YouTube, Twitter, and Reddit. The database aims to help those working in the disinformation field to better analyze the information on actions taken against disinformation networks from these companies.</p>
                            </Col>
                            <Col xs={12} lg={{span:4, offset:4}}>
                                <p><a>About this project</a></p>
                                <p><a className="active">Database</a></p>
                                <p><a>Whitepaper</a></p>
                            </Col>
                            </Row>
                        </Col>
                        <Col xs={12} id="search-section">
                            <Col xs={12} lg={{span:6, offset:3}}>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            </Col>
                        </Col>
                        <Col xs={12} id="view-options">
                            <Row className="justify-content-end">
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
                            <Col xs={12} lg={5} id="filters-section">
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control type="date" name="date" placeholder="Date" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Platform</Form.Label>
                                        <Form.Control as="select" name="platform" placeholder="Platform" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Removed Content</Form.Label>
                                        <Form.Control as="select" name="removed_content" placeholder="Removed Content" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Geography</Form.Label>
                                        <Form.Control as="select" name="geography" placeholder="Geography" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Policy Infringement</Form.Label>
                                        <Form.Control as="select" name="policy_infringement" placeholder="Policy Infringement" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Named Parties</Form.Label>
                                        <Form.Control as="select" name="named_parties" placeholder="Named Parties" />
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Check type="checkbox" name="date" label="Contains Screenshots" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button type="submit">Filter Results</Button>
                                    </Form.Group>


                                </Form>
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

export default Home