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


class HowTo extends React.Component
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
                
                <Container fluid id="home">
                    <Row>
                        <Col xs={12} id="info-section">
                            <Row>
                            <Col xs={12} lg={4}>
                                <p>Disinfodex is a database of publicly available information about disinformation campaigns. It currently includes disclosures issued by major online platforms and accompanying reports from independent open source investigators.</p>
                            </Col>
                            <Col xs={12} lg={{span:4, offset:4}}>
                                <p className="links"><a href="/">Database</a></p>
                                <p className="links"><a href="/about">About this project</a></p>
                                <p className="links"><a href="how-to" className="active">How it works</a></p>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col xs={12} style={{"paddingTop":"3rem", "paddingBottom":"3rem"}}>
                        
                        <p><b>Network ID:</b> Disinfodex indexes actions or findings about disinformation networks, by which we mean groups of accounts or entities coordinating in ways that may or may not be clear to users and platforms. Each platform and investigator may have different criteria for determining what constitutes a network and Disinfodex reflects these determinations.</p>

                        <p>To that end, for each distinct network detailed in disclosures or reports that we index, we generate an arbitrary network identifiers, or “Network ID”, which is structured as follows: [ENTITY]-[COUNTRY]-[DATE] – where:</p>
                        <ul>
                        <li>“ENTITY” refers to a 2 or 3 letters identifier for the entity releasing information about this network. The current list of entities includes: 
                        <ul>
                            <li>DFR: DFR Lab</li>
                            <li>GRA: Graphika</li>
                            <li>FB: Facebook</li>
                            <li>GY: Google/YouTube</li>
                            <li>RD: Reddit</li>
                            <li>TW: Twitter</li>
                        </ul>
                        
                        </li>
                            <li>
                                “COUNTRY” refers to the country of origin of a network, referred to via its 2-letter ISO country code as indexed here (for instance: FR for France, EG for Egypt). 
                                For cases where the country of origin is unclear, we mark the country section as “UNKNOWN’. For instance, GRA-UNKNOWN would refer to a network reported by Graphika whose country of origin is unknown
                                For cases where there are multiple countries of origin, we include all of their 2-letter codes in a sequence. For instance, GY-EGFR would refer to a network reported by Google/YouTube originating from Egypt and France.
                            </li>
                            <li>
                                “DATE” refers to the month and year of initial reporting of this network by the entity who disclosed it. For instance, DFR-EE-0519 would refer to a network reported on by DFR Lab for the first time in May 2019. 
                                If an entity later reports more information or actions taken about the same network, we will continue to use the same network ID. 
                                There are occasions for which an entity first reports on multiple separate networks originating from the same country at the same date. In that case, we add letters (A, B, C…) at the end of network IDs to differentiate these networks. For instance, DFR-EE-0519-A and DFR-EE-0519-B would refer to two separate networks reported on by DFR Lab for the first time in May 2019.
                            </li>
                        </ul>


                        <p><b>Other Attributes collected for each disclosure or report</b></p>
                        <p>For each disclosure or report that we index in Disinfodex, we capture the following attributes (using the exact same words as the platform itself). </p>

                        <p><i>Captured for both platforms and open source investigators:</i></p>
                        <ul>Date: the date of publication of the report or disclosure
                        <li>Company: the name of the organization releasing a report or disclosure</li>
                        <li>Network ID: the network identifiers of all networks related to this disclosure or report (see Network ID, above, for more information on identifiers).
                            <ul>
                                <li>This means that if, for instance, Twitter reports actions taken against a network of accounts that Graphika has also covered in a separate, third party report, two network IDs will be displayed – one from Twitter, one from Graphika. </li>
                                <li>The purpose of showing all network IDs is to help third Disinfodex users easily understand what connections exist between different public reports.</li>
                            </ul>
                        </li>  
                        <li>Source type: we differentiate between platforms and open source investigators</li>
                        <li>Destination country: any information shared about the country the network targeted (sometimes it may be more than one country; and sometimes it may be simply information about the languages the network used)</li>
                        <li>Origin country: any information shared about the country in which the network originated (here too it it may be more than one country or it may be languages instead of countries)</li>
                        <li>Named entities: any information shared about a specific entity connected to a campaign (e.g. Government of country X, PR agency Y. There may be more than one entity.)</li>
                        <li>Main URL: the primary URL associated with a disclosure or report (usually a blog post)</li>
                        <li>Secondary URL: any other relevant URL associated with a disclosure or report (usually a PDF)</li>
                        <li>Description: Long-form text providing information about the network and actions taken. 
                            <ul>
                                <li>In the case of disclosures from platforms, we aim to provide a comprehensive copy of the information shared by the platform. </li>
                                <li>In the case of open source investigator reports, which are usually longer, we aim to provide the most relevant excerpts from their reports. </li>
                            </ul>
                        </li>
                        <li>Other notes: any other information relevant about the network that does not fit in the prior categories (e.g. advertising spend, when available)</li>
                        <li>Screenshots: links to screenshots related to this disclosure, as provided by the platform or open source investigator. </li>
                        </ul>

                        <p>
                            <i>Captured only for platforms (as open source investigators do not take direct actions)</i>
                        </p>
                        <li>Removal type: in the case of platforms, this covers what they say they took action on (e.g. Facebook, Instagram, Twitter, or YouTube accounts). </li>
                        <li>Removal number: The numbers of removals that took place. </li>
                        <li>Engagement language: what the platform says, if anything, about the amount of engagement with the content or accounts that were removed (e.g. ‘more than X views’, ‘less than Y followers’)</li>
                        <li>Engagement number: raw numbers from the engagement language column, for ease of analysis by researchers.  </li>
                        <li>Policy violations: policy violation that resulted in the action taken by the platform. </li>
                        <li>Archive URL: link to an archive of the content that was removed, where available</li>

                        <p><b>Table view and card view:</b></p>
                        <p>At its launch, the disinfodex database is accessible via two main views: a Table view and a Card view.</p>

                        <p>The Table view is organized around disclosures of actions taken by platforms or new findings by third party investigators. Each line in the spreadsheet represents either an action taken by a platform on a specific product (“Removal Type”); or a separate report by a third party investigator. </p>

                        <p>For instance: when Facebook discloses actions taken against a network of accounts engaged in coordinated inauthentic behavior resulting in the removal of X Facebook accounts, Y Instagram accounts, and Z Facebook Pages, each of these actions are reflected in a separate line of the table view. If, for example, DFR Lab has published a third party report about this network of accounts, it would make for a fourth, separate line in the table. </p>

                        <p>When a user clicks on a line in the table it will lead to the card view for the related network(s). </p>

                        <p>The Card view provides detailed information about the network related to a disclosure, making it easy to see at a glance all the actions taken against a network and how it has been described by the entities that reported on it. </p>
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

export default HowTo