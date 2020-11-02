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
            <div id="top">
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
                <Header active="how-to"></Header>
            </div>

                <Container id="home">
                    <Row>
                        <Col xs={12}>

                            <h2>How it Works</h2>

                            <p>In this page, you will find more information about the contents of the Disinfodex database and about the ways to search and read the database. In addition, you will find a FAQ addressing questions such as our source inclusion process, frequency of updating, and other considerations.</p>

                            <h4>What you will find in the Disinfodex database</h4>

                            <p>Disinfodex.org indexes, aggregates and makes it easier to search and analyze publicly available information about disinformation campaigns posted since 2017. As of Autumn 2020, it focuses on information released by the following technology companies:</p>

                            <ul>
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Google/Youtube</li>
                                <li>Reddit</li>
                            </ul>

                            <p>For these companies, Disinfodex typically indexes information posted on the company’s official channels or by its official representatives on social media, which specifically pertains to actions taken against networks of accounts, pages, etc. driving disinformation campaigns.</p>

                            <p>In addition, it includes information released by the following organizations’ open source investigation teams (with more to come):</p>

                            <ul>
                                <li>Graphika</li>
                                <li>DFRLab</li>
                            </ul>

                            <p>For these organizations, Disinfodex will typically index in-depth reports published about actions taken by one or more or the technology companies mentioned above against disinformation networks, as opposed to other reports these organizations might publish (for instance, reports analyzing trends in the disinformation landscape).</p>
                            
                            <p>We aim to make it easy for users to see when such reports are connected and relate to the same networks.</p>



                            <h2>How to search and use the Disinfodex database</h2>

                            <p>This section covers the different views of the database, the search box and filters for the database, and how to download a CSV version of the database.</p>

                            <h4>Card view and Table view</h4>

                            <p>As of November 2020, the Disinfodex database indexes action taken against more than 180 networks since 2017. These can be explored in two ways: a card view (default) and a table view. We recommend that you use the card view if you intend to browse information that is on the website, and the table view if you want to compare multiple entries for the purpose of an analysis. More on each view:</p>

                            <p>The <b>Card view</b> (default view for the page) provides an easily readable recap of actions taken against each network in the database. Networks are listed in reverse chronological order by default (newest first), and for each of them, we will show the platform name and date as well as a network code that indicates countries of origin and destination.</p>

                            <p>Upon clicking on a card, you can read the full description of the network and actions taken against it. If multiple entities (e.g. a platform and an open source investigator) have released information about the same network, we will show these descriptions side by side.</p>

                            <p>The <b>Table view</b> is organized around disclosures of actions taken by platforms or new findings by third party investigators. Clicking on a line will lead to the card view for further exploration of a network. Each line in the spreadsheet represents either an action taken by a platform on a specific product (“Removal Type”); or a separate report by a third party investigator.</p>

                            <p>For instance: when Facebook discloses actions taken against a network of accounts engaged in coordinated inauthentic behavior resulting in the removal of X Facebook accounts, Y Instagram accounts, and Z Facebook Pages, each of these actions are reflected in a separate line of the table view.</p>

                            <h4>Searching the Disinfodex</h4>

                            <p>Both the Card and Table views are meant to be easily searched or filtered so you can find the exact information you need.</p>

                            <p>You can search each view by typing the keyword(s) you are interested in directly in the search bar that’s above the database. All relevant entries will be pulled dynamically.</p>
                            
                            <p>Alternatively, you can use the filters displayed above the table to focus on specific companies, dates, types of removals, or countries.</p>

                            <h4>Downloading Disinfodex</h4>

                            <p>You can download a CSV of the disinfodex database by clicking the ‘download CSV’ link that appears at the bottom left of the Table view. Downloading Disinfodex is free, as is using information from the database for your research or journalistic projects – we simply ask that you cite us if you do.</p>


                            <h2>How to read the Disinfodex database</h2>

                            <p>The Disinfodex database codes public disclosures alongside a number of attributes, for the purpose of making them easier for you to search and analyze. This section outlines what each of these attributes represent, starting with the arbitrary Network Codes that we generate for each network in the database.</p>

                            <h4>Reading network codes in the Disinfodex database</h4>

                            <p>Disinfodex indexes actions or findings about disinformation networks, by which we mean groups of accounts or entities coordinating in ways that may or may not be clear to users and platforms. Each platform and investigator may have different criteria for determining what constitutes a network and Disinfodex reflects these determinations.</p>

                            <p>To that end, for each distinct network detailed in disclosures or reports that we index, we generate an arbitrary network identifiers, or “Network ID”, which is structured as [ENTITY]-[COUNTRY]-[DATE] – where:</p>

                            <ul>
                                <li><b>"ENTITY"</b> refers to a 2 or 3 letters identifier for the entity releasing information about this network. The current list of entities includes:
                                    <ul>
                                        <li>DFR: DFR Lab</li>
                                        <li>GRA: Graphika</li>
                                        <li>FB: Facebook</li>
                                        <li>GY: Google/YouTube</li>
                                        <li>RD: Reddit</li>
                                        <li>TW: Twitter</li>
                                    </ul>
                                </li>

                                <li><b>"COUNTRY"</b> refers to the country of origin of a network, referred to via its 2-letter ISO country code as indexed here (for instance: FR for France, EG for Egypt). For cases where the country of origin is unclear, we mark the country section as “UNKNOWN’. For instance, GRA-UNKNOWN would refer to a network reported by Graphika whose country of origin is unknown For cases where there are multiple countries of origin, we include all of their 2-letter codes in a sequence. For instance, GY-EGFR would refer to a network reported by Google/YouTube originating from Egypt and France.</li>

                                <li><b>“DATE”</b> refers to the month and year of initial reporting of this network by the entity who disclosed it. For instance, DFR-EE-0519 would refer to a network reported on by DFR Lab for the first time in May 2019. If an entity later reports more information or actions taken about the same network, we will continue to use the same network ID. There are occasions for which an entity first reports on multiple separate networks originating from the same country at the same date. In that case, we add letters (A, B, C…) at the end of network IDs to differentiate these networks. For instance, DFR-EE-0519-A and DFR-EE-0519-B would refer to two separate networks reported on by DFR Lab for the first time in May 2019.</li>
                            </ul>

                            <h2>Attributes in the Disinfodex database</h2>

                            <p>The database comprises the following attributes, as relevant for each entry:</p>

                            <ul>
                                <li><b>Date:</b> the date of publication of the report or disclosure</li>
                                <li><b>Company:</b> the name of the organization releasing a report or disclosure</li>
                                <li><b>Network ID:</b> the network identifiers of all networks related to this disclosure or report (see Network ID, above, for more information on identifiers).
                                    <ul>
                                        <li>This means that if, for instance, Twitter reports actions taken against a network of accounts that Graphika has also covered in a separate, third party report, two network IDs will be displayed – one from Twitter, one from Graphika. </li>
                                        <li>The purpose of showing all network IDs is to help third Disinfodex users easily understand what connections exist between different public reports.</li>
                                    </ul>
                                </li>  
                                <li><b>Source type:</b> we differentiate between platforms and open source investigators</li>
                                <li><b>Destination country:</b> any information shared about the country the network targeted (sometimes it may be more than one country; and sometimes it may be simply information about the languages the network used)</li>
                                <li><b>Origin country:</b> any information shared about the country in which the network originated (here too it it may be more than one country or it may be languages instead of countries)</li>
                                <li><b>Named entities:</b> any information shared about a specific entity connected to a campaign (e.g. Government of country X, PR agency Y. There may be more than one entity.)</li>
                                <li><b>Main URL:</b> the primary URL associated with a disclosure or report (usually a blog post)</li>
                                <li><b>Secondary URL:</b> any other relevant URL associated with a disclosure or report (usually a PDF)</li>
                                <li><b>Description:</b> Long-form text providing information about the network and actions taken. 
                                    <ul>
                                        <li>In the case of disclosures from platforms, we aim to provide a comprehensive copy of the information shared by the platform. </li>
                                        <li>In the case of open source investigator reports, which are usually longer, we aim to provide the most relevant excerpts from their reports. </li>
                                    </ul>
                                </li>
                                <li><b>Other notes:</b> any other information relevant about the network that does not fit in the prior categories (e.g. advertising spend, when available)</li>
                                <li><b>Screenshots:</b> links to screenshots related to this disclosure, as provided by the platform or open source investigator.</li>
                                </ul>

                            <p>In addition, the following attributes are captured specifically for reports provided by technology companies:</p>

                            <ul>
                                <li>Removal type: in the case of platforms, this covers what they say they took action on (e.g. Facebook, Instagram, Twitter, or YouTube accounts). </li>
                                <li>Removal number: The numbers of removals that took place. </li>
                                <li>Engagement language: what the platform says, if anything, about the amount of engagement with the content or accounts that were removed (e.g. ‘more than X views’, ‘less than Y followers’)</li>
                                <li>Engagement number: raw numbers from the engagement language column, for ease of analysis by researchers.</li>
                                <li>Policy violations: policy violation that resulted in the action taken by the platform.</li>
                                <li>Archive URL: link to an archive of the content that was removed, where available</li>
                            </ul>
                        
                        <h2>FAQ</h2>

                        <h4>How did you select the organizations whose content you index in the Disinfodex database?</h4>
                        
                        <p>We included the disclosures of four major technology companies that have provided information about actions taken against disinformation campaigns on a regular basis since 2017. In addition, we are in the process of including open source investigators, selected with guidance from the Carnegie Endowment’s Partnership for Countering Influence Operations, who meet certain standards of methodology and transparency.</p>

                        <h4>How often is the Disinfodex database updated?</h4>
                        <p>We aim to include new updates within days of their release by the organizations whose content we index. </p>

                        <h4>Who writes the content in the Disinfodex database?</h4>
                        <p>All the content in the database comes directly from the entities that are indexed. Whether it is for raw numbers or full text (e.g. descriptions; naming countries or organizations…), we simply replicate the wording of the entity.</p>

                        <h4>I have seen a mistake in the database, how can I call it out?</h4>
                        <p>Thanks for spotting it, please let us know by reaching out at <a href="mailto:teamdisinfodex@gmail.com">teamdisinfodex@gmail.com</a>.</p>

                        <h4>What is your funding structure?</h4>

                        <p>Disinfodex is a small-scale and mostly volunteer-led project. As of November 2020, our funding comes from the <a href="https://miamifoundation.org/" target="_blank">Miami Foundation</a> and the <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank">Carnegie Endowment for International Peace’s Partnership for Countering Influence Operations</a>. We have also benefited from support from the <a href="https://cyber.harvard.edu/" target="_blank">Harvard Berkman Klein Center</a>’s <a href="https://www.berkmankleinassembly.org/" target="_blank">Assembly program</a>.</p>                    
                        </Col>
                    </Row>
                </Container>
                <Footer></Footer>
        </>
    }
}

export default HowTo