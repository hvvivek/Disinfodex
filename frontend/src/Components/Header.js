import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "../Stylesheets/Card.css"



class Header extends React.Component
{

    render()
    {
        return <Col xs={12} id="info-section">
                    <Row>
                    <Col xs={12} lg={4}>
                        <p>Disinfodex is a database of publicly available information about disinformation campaigns. It currently includes disclosures issued by major online platforms and accompanying reports from independent open source investigators.</p>
                    </Col>
                    <Col xs={12} lg={{span:4, offset:4}}>
                        <p className="links"><a href="/" className={this.props.active === "database" && "active"}>Database</a></p>
                        <p className="links"><a href="/about" className={this.props.active === "about" && "active"}>About this project</a></p>
                        <p className="links"><a href="how-to" className={this.props.active === "how-to" && "active"}>How it works</a></p>
                    </Col>
                    </Row>
                </Col>
    }
}

export default Header