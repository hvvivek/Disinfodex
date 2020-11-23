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
            <div id="top">
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
                <Header active="about"></Header>
            </div>

                <Container id="home">
                    <Row>
                        <Col xs={12}>
                        <h2>About this Project</h2>

                        <p>Disinfodex is a database of publicly available information about disinformation campaigns. It currently includes disclosures issued by major online platforms and accompanying reports from independent open source investigators.</p>

                        <p>Disinfodex is an independent index created to help those working in the disinformation space to better aggregate, analyze and interpret publicly available information about disinformation campaigns. Neither Disinfodex nor its team take position on the practices or findings of the entities whose reports they index. </p>

                        <p>Disinfodex was developed during the <a href="https://cyber.harvard.edu/story/2020-02/announcing-2020-assembly-fellowship-cohort" target="_blank">Assembly: Disinformation 2020 Fellowship</a>, and is supported by the <a href="https://cyber.harvard.edu/" target="_blank">Berkman Klein Center at Harvard University</a> and the Ethics and Governance of Artificial Intelligence Fund at <a href="https://miamifoundation.org/" target="_blank">The Miami Foundation</a>. Disinfodex is a partner of <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank">Carnegie Endowment’s Partnership for Countering Influence Operations</a>.</p>
                        
                        <p>The Disinfodex team includes Clement Wolf, Rhona Tarrant, Jenny Fan, Neal Ungerleider, Ashley Tolbert, and Gulsin Harman. You can read more about the background of the project in our <a href="%PUBLIC_URL%/Disinfodex_paper.pdf" target="_blank">white paper</a>.</p>
                        </Col>
                        
                        <Col xs={12}>
                            <h4>Beta version</h4>
                            <p>As of Autumn 2020, the Disinfodex project is entering a beta testing phase, where we will seek to improve the database and website design based on feedback from users. Please feel free to share feedback with us via the email address below. We are particularly interested in understanding:</p>
                            <ul>
                                <li>What could make Disinfodex more useful for your purposes</li>
                                <li>What could make Disinfodex easier to understand and navigate for new users</li>
                                <li>What other content or services would you like us to provide</li>
                            </ul>

                            <h4>White paper</h4>
                            <p>This project is based on a May 2020 white paper by the Disinfodex team which outlines the case for designing such a database and its potential use cases. You can read that white paper <a href={"https://drive.google.com/file/d/1tZNYX_STN6OfO8r-IDzzprtMolKl2aGK/view?usp=sharing"}>here.</a></p>

                            <h4>Contact the team</h4>
                            <p>You can reach us by email at <a href="mailto:teamdisinfodex@gmail.com">teamdisinfodex@gmail.com</a>.</p>
                        </Col>
                    </Row>
                </Container>
                <Footer></Footer>
        </>
    }
}

export default About