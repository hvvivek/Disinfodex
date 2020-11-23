import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "../Stylesheets/Home.css"

import logo_1 from '../Assets/Images/sponsor_logo_1.png'
import logo_2 from '../Assets/Images/berkman_klein.png'
import logo_3 from '../Assets/Images/miami_foundation.png'


class Footer extends React.Component {

    render() {
        return <Container fluid id="footer">
            <footer>
                <Row className="align-items-start">
                    <Col xs={12} lg={9}>
                        <p><a href="http://disinfodex.org" target="_blank">Disinfodex</a> is supported by the <a href="https://cyber.harvard.edu/" target="_blank">Berkman Klein Center at Harvard University</a> and the Ethics and Governance of Artificial Intelligence Fund at <a href="https://miamifoundation.org/" target="_blank">The Miami Foundation</a>. Disinfodex is a partner of <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank">Carnegie Endowment’s Partnership for Countering Influence Operations</a>.</p>
                        <br /><br />
                    </Col>
                    <Col xs={12} lg={3}>
                        <Row className="justify-content-end">
                            <Col className="logo-wrapper">
                                <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank" rel="noopener noreferrer" title="Carnegie Endowment for International Peace: Partnership for Countering Influence Operations" ><img alt="Carnegie Endowment for International Peace: Partnership for Countering Influence Operations" src={logo_1}></img></a>
                            </Col>
                            {/* <Col className="logo-wrapper">
                                <a href="https://cyber.harvard.edu/" target="_blank" rel="noopener noreferrer" title="Berkman Klein Center for Internet and Society at Harvard University" ><img alt="Berkman Klein Center for Internet and Society at Harvard University" src={logo_2}></img></a>
                            </Col> */}
                            {/* <Col className="logo-wrapper">
                                <a href="https://miamifoundation.org/" target="_blank" rel="noopener noreferrer" title="The Miami Foundation" ><img alt="The Miami Foundation" src={logo_3}></img></a>
                            </Col> */}
                        </Row>
                    </Col>

                </Row>
            </footer>

        </Container>
    }
}

export default Footer