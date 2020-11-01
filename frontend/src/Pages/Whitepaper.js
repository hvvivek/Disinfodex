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
import Header from "../Components/Header"



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


class Whitepaper extends React.Component
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
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
                <Header active="how-to"></Header>

                <Container fluid id="home">
                    <Row>

                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col xs={12} style={{"paddingTop":"3rem", "paddingBottom":"3rem"}}>
                            <h2>
                                Disinfodex white paper
                            </h2>
                        
                            <p>You can read our white paper <a href={"https://drive.google.com/file/d/1tZNYX_STN6OfO8r-IDzzprtMolKl2aGK/view?usp=sharing"}>here.</a></p>

                            <h3>Executive summary:</h3>
                            <p>This  paper outlines the creation of the Disinfodex project, an online database indexing public disclosures of disinformation campaigns issued by major online platforms, currently including Facebook, Instagram, Google, YouTube, Twitter, and Reddit. The project was created by participants of the Assembly:Disinformation Fellowship at Harvard’s Berkman Klein Center.</p>
                            <p>By aggregating the resources in one searchable database, Disinfodex provides a way to analyze publicly available information on actions taken against disinformation networks from these companies. This paper explores considerations taken into account when building the database, which continues to be a work in progress at the time of this paper’s release, and outlines current practices around public disclosure of disinformation campaigns by major online platforms.</p>
                            <p>Advancing the discussion further, the paper explores the current landscape of publicly available information for those researching and working to combat online disinformation, and examines how the Disinfodex project may be built upon to create a useful shared infrastructure within the space. The paper frames an approach to thinking about challenges and risks of building a shared infrastructure, and calls for future steps for collaboration.</p>
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
                                        <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank" title="Carnegie Endowment for International Peace: Partnership for Countering Influence Operations"><img src={logo_1}></img></a>
                                    </Col>
                                    <Col className="logo-wrapper">
                                        <a href="https://cyber.harvard.edu/" target="_blank" title="Berkman Klein Center for Internet and Society at Harvard University"><img src={logo_2}></img></a>
                                    </Col>
                                    <Col className="logo-wrapper">
                                        <a href="https://miamifoundation.org/" target="_blank" title="The Miami Foundation"><img src={logo_3}></img></a>
                                    </Col>
                                </Row>
                            </Col>
                        
                        </Row>  
                    </footer>
                    
                </Container>
        </>
    }
}

export default Whitepaper