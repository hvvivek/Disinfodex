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
import axios from 'axios'
import Toggle from 'react-toggle'

import "react-toggle/style.css" // for ES6 modules
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


import { DateRangePicker } from 'react-date-range';


class About extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
        }
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
                                <p className="links"><a href="/about" className="active">About this project</a></p>
                                <p className="links"><a href="/">Database</a></p>
                                <p className="links"><a href="whitepaper">Whitepaper</a></p>
                                <p className="links"><a href="how-to">How to read the database?</a></p>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col xs={12} style={{"paddingTop":"3rem", "paddingBottom":"3rem"}}>
                        
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

export default About