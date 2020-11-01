
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import RecordModal from './RecordModal'
import ScrenshotsCarousel from './ScreenshotsCarousel'

import "../Stylesheets/Card.css"


let COMPANY_COLORS = {
    "Facebook": "rgba(59, 89, 152, 0.2)",
    "Twitter": "rgba(0, 172, 238, 0.2)",
    "Reddit": "rgb(255, 87, 0, 0.2)",
    "Google/YouTube": "rgb(196, 48, 43, 0.2)",
    "Graphika": "#AAAAAA",
    "DFRLab": "rgb(0, 134, 125, 0.2)"
}
class Card extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            show: false,
            show_disclosure_modal: false,
            current_record: {}
        }
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    renderModalKey = (key) => {

        const dictionary = {'COMPANY': "Company", 
        'DESCRIPTION_LONG': "Description",  
        'ORIGIN_COUNTRY': "Origin Country", 
        'DESTINATION_COUNTRY': "Destination Country", 
        'DISCLOSURE_DATE': "Disclosure Date",
        'MAIN_URL':"URL", 
        'NAMED_ENTITIES_FULL': "Named Entities", 
        'RECORD_ID': "Record ID", 
        'SECONDARY_URL': "Additional URL"};

        return dictionary[key]

    }
    renderModalValue = (key, value, isModal) => {
        
        if(key === "MAIN_URL" || key === "SECONDARY_URL")
        {
            return <a target="_blank" rel="noopener noreferrer" href={value.toString()}>Link</a>
        }
        if(typeof(value) != "object")
        {
            return value.toString()
        }
        else if(typeof(value) == "object" && value.length > 0)
        {
            if(key == "COMPANY")
            {
                return value.map(data => <p className={key} style={{"backgroundColor": COMPANY_COLORS[data]}}>{data}</p>)
            }
            else if(key == "NETWORKS")
            {
                if(isModal)
                {
                    return value.map(data => <p className={key}>{data.Name}</p>)
                }
                else
                {
                    return value.map(data => <p className={key}>{data.Name}</p>)
                }
            }
        }
        else
        {
            return null
        }
    }

    filterData = (raw) => {
        const allowed = ['COMPANY', 'DESCRIPTION_LONG',  'ORIGIN_COUNTRY', 'DESTINATION_COUNTRY', 'DISCLOSURE_DATE', 'MAIN_URL', 'NAMED_ENTITIES_FULL', 'RECORD_ID', 'SECONDARY_URL'];

        const filtered = Object.keys(raw)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
        }, {});

        return filtered
    }

    toggleRecordModal = (state) => {
        this.setState({show_disclosure_modal: state})
    }

    render()
    {


        let {networks, startDate, endDate, platforms, removal_types, screenshots, platform_records} = this.props.data

        let unique_descriptions = []
        let descriptions = []
        for(let i=0; i<platform_records.length; i++)
        {
            let record = platform_records[i]
            if(!unique_descriptions.includes(record["DESCRIPTION_LONG"]))
            {
                descriptions.push(record) 
                unique_descriptions.push(record["DESCRIPTION_LONG"])
            }
        }

        descriptions = descriptions.map(record => <><p className="divider"><b>From {record["COMPANY"][0]}</b></p><p className="divider-body">{record["DESCRIPTION_LONG"]}</p></>)

        return <Col sm={12} md={6} className="_card">
                <RecordModal data={this.state.current_record} networks={[this.props.data]} show={this.state.show_disclosure_modal} onToggle={this.toggleRecordModal}></RecordModal>
                <Modal size="lg" centered show={this.state.show} onHide={this.handleClose}>
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
                                    <Col xs={12} className="section description-section">
                                        {/* <p className="subtitle">DESCRIPTION</p>
                                        {descriptions} */}

                                        <p className="subtitle">DISCLOSURES</p>
                                        {platform_records.map(record => <p className={record["COMPANY"] + " disclosure"} style={{"backgroundColor": COMPANY_COLORS[record["COMPANY"]]}} onClick={() => this.setState({show_disclosure_modal: true, current_record: record})}>{record["RECORD_ID"]}</p>)}
                                    </Col>
                                </Col>
                                

                                <Col xs={12}>
                                    <p className="divider">Description: </p>
                                    {/* {platform_records.map(payload => 
                                        <Row>
                                            <Col xs={12} className="row-modal description-section modal-description-section">
                                                <p className="platform_record_title"><b>{payload["COMPANY"]} - {payload["DISCLOSURE_DATE"]}</b></p>
                                                {Object.keys(this.filterData(payload)).map(key =>
                                                    <>{payload[key] && <Col xs={12} className="section">
                                                        <p className="subtitle">{this.renderModalKey(key)}</p>
                                                        <p>{this.renderModalValue(key, payload[key], true)}</p>
                                                    </Col>}</>
                                                )}
                                            </Col>
                                        </Row>)} */}
                                    {descriptions}
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
                            <p className="subtitle">Platform</p>
                            <p>{platforms.map(platform => <span id={platform} className="platform" style={{"backgroundColor": COMPANY_COLORS[platform]}}>{platform}</span>)}</p>
                        </Col>

                        <Col xs={12} className="section">
                            <p className="subtitle">Known Active Dates</p>
                            <p className="active-date">{startDate} {endDate && " to " + endDate}</p>
                        </Col>

                        <Col xs={12} className="section">
                            <p className="subtitle">Removal Type</p>
                            <p>{removal_types && removal_types.map(type => <span id={type} className="type">{type}</span>)}</p>
                        </Col>

                        <Col xs={12} className="section">
                            <p className="subtitle">Network</p>
                            <p>{networks && networks.map(network => <span id={network} className="network">{network}</span>)}</p>
                        </Col>
                    </Col>

                </Row>
            </Col>
        </Col>
    }
}

export default Card