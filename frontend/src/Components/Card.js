
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import ScrenshotsCarousel from './ScreenshotsCarousel'

import "../Stylesheets/Card.css"



class Card extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            show: false
        }
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    render()
    {
        let COMPANY_COLORS = {
            "Facebook": "rgba(59, 89, 152, 0.2)",
            "Twitter": "rgba(0, 172, 238, 0.2)",
            "Reddit": "rgb(255, 87, 0, 0.2)",
            "Google/YouTube": "rgb(196, 48, 43, 0.2)",
            "Graphika": "#AAAAAA",
            "DFRLab": "rgb(0, 134, 125, 0.2)"
        }

        let {networks, startDate, endDate, platforms, removal_types, screenshots, platform_records} = this.props.data

        let descriptions = platform_records.map(record => <><p><b>From {record["COMPANY"][0]}</b></p><p>{record["DESCRIPTION_LONG"]}</p></>)
        return <Col xs={6} className="_card">

            <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Network {networks[0]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} style={{"minHeight": "300px", "padding":"0px"}}>
                                <ScrenshotsCarousel screenshots={screenshots} company={platforms && platforms.length>0 && platforms[0]}></ScrenshotsCarousel>
                            </Col>
                            <Col xs={6} className="description-section modal-description-section">
                                <Col xs={12} className="section">
                                    <p className="subtitle">Network</p>
                                    <p>{networks && networks.map(network => <span id={network} className="network">{network}</span>)}</p>
                                </Col>

                                <Col xs={12} className="section">
                                    <p className="subtitle">Known Active Dates</p>
                                    <p className="active-date">{startDate} {endDate && " to " + endDate}</p>
                                </Col>

                                <Col xs={12} className="section">
                                    <p className="subtitle">Platform</p>
                                    <p>{platforms.map(platform => <span id={platform} className="platform" style={{"backgroundColor": COMPANY_COLORS[platform]}}>{platform}</span>)}</p>
                                </Col>

                                <Col xs={12} className="section">
                                    <p className="subtitle">Removal Type</p>
                                    <p>{removal_types && removal_types.map(type => <span id={type} className="type">{type}</span>)}</p>
                                </Col>
                            </Col>
                            <Col xs={6} style={{padding: "0px"}}>
                                <Col xs={12} className="section description">
                                    <p className="subtitle">DESCRIPTION</p>
                                    {descriptions}
                                </Col>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                
            </Modal>

            <Col xs={12} className="wrapper">
                <Row style={{"height":"100%"}}>
                    <Col xs={5} style={{"padding":"0"}}>
                        <ScrenshotsCarousel screenshots={screenshots} company={platforms && platforms.length>0 && platforms[0]}></ScrenshotsCarousel>
                    </Col>
                    
                    <Col xs={7} className="description-section" onClick={this.handleOpen}>
                        <Col xs={12} className="section">
                            <p className="subtitle">Network</p>
                            <p>{networks && networks.map(network => <span id={network} className="network">{network}</span>)}</p>
                        </Col>

                        <Col xs={12} className="section">
                            <p className="subtitle">Known Active Dates</p>
                            <p className="active-date">{startDate} {endDate && " to " + endDate}</p>
                        </Col>

                        <Col xs={12} className="section">
                            <p className="subtitle">Platform</p>
                            <p>{platforms.map(platform => <span id={platform} className="platform" style={{"backgroundColor": COMPANY_COLORS[platform]}}>{platform}</span>)}</p>
                        </Col>

                        <Col xs={12} className="section">
                            <p className="subtitle">Removal Type</p>
                            <p>{removal_types && removal_types.map(type => <span id={type} className="type">{type}</span>)}</p>
                        </Col>
                    </Col>

                </Row>
            </Col>
        </Col>
    }
}

export default Card