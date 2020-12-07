
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

class TableRow extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state = {
            showModal: false
        }
    }

    handleClose = () => {
        this.setState({showModal: false})
    }


    renderModalValue = (key, value, isModal) => {
        if(key && value)
        {
        if(typeof(value) != "object")
        {
            if(key=="URL" || key === "Secondary_URL" || key === "Archive_URL")
            {
                return <a target="_blank" rel="noopener noreferrer" href={value.toString()}>Link</a>

            }
            else
            {
                return value.toString()
            }        }
        else if(typeof(value) == "object" && value.length > 0)
        {
            if(key === "Company")
            {
                return value.map(data => <p className={key} style={{"backgroundColor": COMPANY_COLORS[data]}}>{data}</p>)
            }
            else if(key === "Networks")
            {
                if(isModal)
                {
                    return value.map(data => <p className={key} onClick={() => {this.setState({showModal: false}); this.props.handleNetworkModal("Network", data.Name)}}>{data.Name}</p>)
                }
                else
                {
                    return value.map(data => <p className={key}>{data.Name}</p>)
                }
            }
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

        let ID                  = data["ID"]
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
            Networks = networks.filter(network => Networks.includes(network.sync_id))
        }

        // if(Networks.length > 1)
        // {
        //     console.log(Date_Of_Disclosure)
        //     console.log(Networks)
        // }

        let payload = {
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
        


        return <> 
            {
             <Modal size="lg" centered show={this.state.showModal} onHide={this.handleClose}>
                
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
                
            </Modal>
            }

            <tr key={ID} 
                    onClick={() => this.setState({showModal: true})}
                    >
            <td xs={2} className="dod-column">
                <div>
                    {Date_Of_Disclosure}
                </div>
            </td>
            <td xs={2}>
                <div style={{backgroundColor: COMPANY_COLORS[Company]}} className="table-company">
                    {Company}
                </div>
            </td>
            <td xs={2}>
                <div className="table-network">
                    {this.renderModalValue("Networks", Networks, false)}
                    {/* {Networks && Networks.map(network => <p>{network.Name}</p>)} */}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Removal_Type}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Removal_Number}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Engagement_Context}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Engagement_Number}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Targeted_Country}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Origin_Country}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Named_Entities}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Policy_Violations}
                </div>
            </td>
            <td xs={2}>
                <div>
                    <a href={URL}>
                    {URL}</a>
                </div>
            </td>
            <td xs={2}>
                <div>
                <a href={Secondary_URL}>
                    {Secondary_URL}
                    </a>
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Description_Long}
                </div>
                
            </td>
            <td xs={2}>
                <div>
                    {Notes}
                </div>
            </td>
            <td xs={2}>
                <div>
                <a href={Archive_URL}>
                    {Archive_URL}
                    </a>
                </div>
            </td>
        </tr>
        </>
    }
}

export default TableRow