import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Header from "../Components/Header"
import Footer from '../Components/Footer'

import '../Stylesheets/Home.css'

import "react-toggle/style.css" // for ES6 modules
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

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
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
                <Header active="about"></Header>

                <Container fluid id="home">
                    <Row>


                    </Row>
                </Container>
                
                <Container>
                    <Row>
                        <Col xs={12} style={{"paddingTop":"3rem", "paddingBottom":"3rem"}}>
                        <p>Disinfodex is a database of publicly available information about disinformation campaigns. It currently includes disclosures issued by major online platforms and accompanying reports from independent open source investigators. </p>
                        <p>Disinfodex is an independent index created to help those working in the disinformation space to better aggregate, analyze and interpret publicly available information about disinformation campaigns. Neither Disinfodex nor its team take position on the practices or findings of the entities whose reports they index. </p>
                        <p>Disinfodex was created by a team of journalists and technology professionals taking part in the 2020 Assembly Fellowship at Harvard’s Berkman Klein Center. The team includes Clement Wolf, Rhona Tarrant, Jenny Fan, Neal Ungerleider, Ashley Tolbert, and Gulsin Harman. You can read more about the background of the project in our white paper. </p>
                        </Col>
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
                <Footer></Footer>
        </>
    }
}

export default About