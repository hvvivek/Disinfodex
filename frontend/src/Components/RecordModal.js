
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import "../Stylesheets/Card.css"

let COMPANY_COLORS = {
    "Facebook": "rgba(59, 89, 152, 0.2)",
    "Twitter": "rgba(0, 172, 238, 0.2)",
    "Reddit": "rgb(255, 87, 0, 0.2)",
    "Google/YouTube": "rgb(196, 48, 43, 0.2)",
    "Graphika": "#AAAAAA",
    "DFRLab": "rgb(0, 134, 125, 0.2)"
}

class RecordModal extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            show: this.props.show || false
        }
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    renderModalValue = (key, value, isModal) => {
        if(typeof(value) != "object")
        {
            return value.toString()
        }
        else if(typeof(value) === "object" && value.length > 0)
        {
            if(key === "Company")
            {
                return value.map(data => <p className={key} style={{"backgroundColor": COMPANY_COLORS[data]}}>{data}</p>)
            }
            else if(key === "Networks")
            {
                // if(isModal)
                // {
                //     return value.map(data => <p className={key} onClick={() => {this.setState({showModal: false}); this.props.handleNetworkModal("Network", data.Name)}}>{data.Name}</p>)
                // }
                // else
                // {
                    return value.map(data => <p className={key}>{data.Name}</p>)
                // }
            }
        }
        else
        {
            return null
        }
    }

    render()
    {

        let {data, networks} = this.props

        let payload = {}
        if(data)
        {
        // let ID                  = data["ID"]
        let Date_Of_Disclosure  = data["DISCLOSURE_DATE"]
        let Company             = data["COMPANY"]
        let Networks            = data["NETWORK_ID"]
        let Removal_Type        = data["REMOVAL_TYPE"]
        let Removal_Number      = data["REMOVAL_NUMBER"]
        let Engagement_Context  = data["ENGAGEMENT_CONTEXT"]
        let Engagement_Number   = data["ENGAGEMENT_NUMBER"]
        let Origin_Country      = data["ORIGIN_COUNTRY"]
        let Targeted_Country    = data["DESTINATION_COUNTRY"]
        let Named_Entities      = data["NAMED_ENTITIES_FULL"]
        let Policy_Violations   = data["POLICY_VIOLATIONS"]
        let URL                 = data["MAIN_URL"]
        let Secondary_URL       = data["SECONDARY_URL"]
        let Description_Long    = data["DESCRIPTION_LONG"]
        let Notes               = data["NOTES"]
        let Archive_URL         = data["ARCHIVE_URL"]

        if(Networks)
        {
            Networks = networks
        }

        payload = {
            Date_Of_Disclosure, 
            Company, 
            Networks, 
            Removal_Type, 
            Removal_Number, 
            Engagement_Context, 
            Engagement_Number, 
            Targeted_Country, 
            Origin_Country, 
            Named_Entities, 
            Policy_Violations, 
            URL, 
            Secondary_URL, 
            Description_Long, 
            Notes, 
            Archive_URL
        }
    }
        


        return <>{data && <Modal size="lg" centered show={this.props.show} onHide={() => this.props.onToggle(false)}>
                
                <Modal.Header closeButton>

                    {payload["Company"]&& payload["Company"] + " - "}{payload["Date_Of_Disclosure"]}
                </Modal.Header>

                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} className="row-modal description-section modal-description-section">
                                {Object.keys(payload).map(key => 
                                <>{payload[key] && <Col xs={12} className="section">
                                    <p className="subtitle">{key}</p>
                                    <p>{this.renderModalValue(key, payload[key], true)}</p>
                                </Col>}</>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                
            </Modal>}</>
    }
}

export default RecordModal