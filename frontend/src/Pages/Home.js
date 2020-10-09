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


class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            filterPanelCollapsed: true,
            selection: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
              },
              sourceFilters: {},
              dodFilterPanelCollapsed: false,
              platformFilterPanelCollapsed: false,
              sourceFilterPanelCollapsed: false,
              productFilterPanelCollapsed: false,
              policyFilterPanelCollapsed: false,
              geogrphicAreaFilterPanelCollapsed: false,
              active: "table"
        }
    }

    toggleFilterPanel = (e) => {
        this.setState({filterPanelCollapsed: !this.state.filterPanelCollapsed})
    }

    toggleFilterDropdown = (panelName) => {
        this.setState({[panelName]: !this.state[panelName]})
    }

    componentDidMount()
    {
        // this.getDataFromAirtable()

        this.getDataFromBackend()
    }

    getDataFromAirtable = () => {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('app9iX4yxpJsbOxAK');
        
        base('Disclosures').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                console.log('Retrieved', record.get('Date of Disclosure'));
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }

    getDataFromBackend = async () => {
        let sync_ids = await axios.get("http://localhost:3010/platforms?count=true")
        sync_ids = sync_ids.data["sync_ids"]

        let platform_records = []

        console.log(sync_ids)
        for(let i=0; i<15; i++)
        {
            let record = await axios.get(`http://localhost:3010/platforms?sync_id=${sync_ids[i]}`)
            // console.log(record.data.data)
            platform_records.push(record.data.data)
        }

        this.setState({platform_records: platform_records})

    }

    render_row = (data) => {


        let ID = data["ID"]
        let Date_Of_Disclosure = data["DISCLOSURE_DATE"]
        let Company = data["COMPANY"]
        let Network = data["Networks"]

        let Removal_Type = data["REMOVAL_TYPE"]
        let Removal_Number = data["REMOVAL_NUMBER"]

        let Engagement_Context = data["ENGAGEMENT_CONTEXT"]
        let Engagement_Number = data["ENGAGEMENT_NUMBER"]

        let Origin_Country = data["ORIGIN_COUNTRY"]
        let Targeted_Country = data["DESTINATION_COUNTRY"]

        let Named_Entities = data["NAMED_ENTITIES_FULL"]
        let Policy_Violations = data["POLICY_VIOLATIONS"]

        let URL = data["MAIN_URL"]
        let Secondary_URL = data["SECONDARY_URL"]

        let Description_Long = data["DESCRIPTION_LONG"]
        let Notes = data["NOTES"]
        let Archive_URL = data["ARCHIVE_URL"]

        return <tr key={ID}>
            <td xs={2}>
                <div className="id-column">
                    {ID}
                </div>
            </td>
            <td xs={2} className="dod-column">
                <div>
                    {Date_Of_Disclosure}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Company}
                </div>
            </td>
            <td xs={2}>
                <div>
                    {Network}
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
    }

    handleSelect = (ranges) => {
        console.log(ranges);
        this.setState({selection: ranges["selection"]})
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
      }

    toggleFilter = (filter, name) => {
        let temp = this.state[filter]
        temp[name] = !temp[name]
        this.setState({[filter]: temp})
    }

    renderCompanyFilterOptions = () => {
        let temp = this.state.platform_records
        if(temp)
        {
            console.log(temp.map(record => record["COMPANY"]))
            let companies = Array.from(new Set(temp.map(record => record["COMPANY"][0])))
            console.log(companies)
            // this.setState({company_filter_options: companies})
            if(companies.length > 0)
            {
                let renders = []
                for(let i=0; i<companies.length; i++)
                {
                    let company = companies[i]
                    renders.push(
                        <Col xs={12} className="option">
                            <Toggle
                                defaultChecked={this.state.sourceFilters[company]}
                                icons={false}
                                aria-label={company}
                                onChange={() => this.toggleFilter("sourceFilters", company)} />
                            <span>{company}</span>
                        </Col>
                    )
                }
                return renders
            }

        }
        return []
    }



    render()
    {
        

        let companyFilterOptions = this.renderCompanyFilterOptions()


        let filteredRecords = []
        if(this.state.platform_records)
        {
            filteredRecords = [...this.state.platform_records]

            let allFilters = [this.state.sourceFilters]
    
            for(let i=0; i<allFilters.length; i++)
            {
                console.log(Object.keys(allFilters[0]))
                if(Object.keys(allFilters[0]).length > 0)
                {
                    let companies_selected = []
                    for(let j=0; j<Object.keys(allFilters[0]).length; j++)
                    {
                        if(allFilters[0][Object.keys(allFilters[0])[j]])
                        {
                            companies_selected.push(Object.keys(allFilters[0])[j])
                        }
                    }
                    console.log(companies_selected)
                    if(companies_selected.length > 0 )
                    {
                        filteredRecords = filteredRecords.filter(a =>  {
                            console.log(a["COMPANY"][0])
    
                            return companies_selected.includes(a["COMPANY"][0])
                        })
                    }
                                                                                               
                }
            }
            console.log(filteredRecords)

        }

        let row_renders = []
        if(this.state.platform_records && this.state.platform_records.length > 14)
        {
            row_renders.push(
                <tr>
                    <th>
                        <div className="id-column">
                            ID
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div className="dod-column">
                            Date of Disclosure
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Company
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Network
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Removal Type
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Removal Number
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Engagement Context
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Engagement Number
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Target Country
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Origin Country
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Named Entities
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Policy Violations
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            URL
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Secondary URL
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Description
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Notes
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                    <th>
                        <div>
                            Archive URL
                            <i class="fas fa-caret-down"></i>
                        </div>
                    </th>
                </tr>
            )
            for(let i=0; i<filteredRecords.length; i++)
            {
                let row_data = filteredRecords[i]
                row_renders.push(this.render_row(row_data))
            }
        }
        
        
        return <>
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="#home">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>
                    {/* <hr style={{"width":"100%", "height":"2px", "backgroundColor":"red"}}></hr> */}

                </Navbar>
                {/* NAVBAR COMPONENT */}
                
                <Container fluid id="home">
                    <Row>
                        <Col xs={12} id="info-section">
                            <Row>
                            <Col xs={12} lg={4}>
                                <p>Disinfodex is an online database indexing public disclosures of disinformation campaigns issued by major online platforms, currently including Facebook, Instagram, Google, YouTube, Twitter, and Reddit. The database aims to help those working in the disinformation field to better analyze the information on actions taken against disinformation networks from these companies.</p>
                            </Col>
                            <Col xs={12} lg={{span:4, offset:4}}>
                                <p className="links"><a href="/about">About this project</a></p>
                                <p className="links"><a href="/" className="active">Database</a></p>
                                <p className="links"><a href="whitepaper">Whitepaper</a></p>
                            </Col>
                            </Row>
                        </Col>
                        <Col xs={12} id="search-section">
                            <Col xs={12} lg={{span:6, offset:3}}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i class="fas fa-search"></i>
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Search the database"
                                />
                            </InputGroup>
                                {/* <FormControl type="text" placeholder={"Search the database"} className="mr-sm-2">
                                <i class="fas fa-search"></i>
                                </FormControl> */}
                            </Col>
                            <Col xs={12} className="link">
                                <a href="www.google.com">Learn more about the data collection process</a>
                            </Col>
                        </Col>
                        <Col xs={12} id="view-options">
                            <Row className="justify-content-end">
                                <Col xs={6}>
                                    <Row className="justify-content-end">
                                        {/* <Col>
                                            <Button onClick={this.toggleFilterPanel}><span>{!this.state.filterPanelCollapsed? "⯅": "⯆"}</span> Filters</Button>
                                        </Col> */}
                                    </Row>
                                </Col>
                                <Col xs={12} md={6} lg={4} xl={3}>
                                    <Row className="justify-content-end">
                                        <Col>
                                            <p>View As:</p>
                                        </Col>
                                        <Col>
                                            <p className={this.state.active === "table"? "active-view view-link": "view-link"}><i class="fas fa-table"></i> Table</p>
                                        </Col>
                                        {/* <Col>
                                            <p><i class="fas fa-stream"></i> Timeline</p>
                                        </Col> */}
                                        <Col>
                                            <p className={this.state.active === "map"? "active-view view-link": "view-link"}><i class="fas fa-globe"></i> Map</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row>
                            <Col xs={12} id="filters-section">
                                <Collapse in={this.state.filterPanelCollapsed}>

                                    <Form>
                                        <Row>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Date of Disclosure</Form.Label>
                                                    <Form.Control type="date" name="date" placeholder="Date" onClick={() => this.toggleFilterDropdown("dodFilterPanelCollapsed")} />
                                                    <Collapse in={this.state.dodFilterPanelCollapsed}>
                                                        <div style={{"width":"200px"}}>
                                                            <DateRangePicker
                                                                ranges={[this.state.selection]}
                                                                onChange={this.handleSelect}
                                                            />
                                                        </div>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Disclosure Source</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("sourceFilterPanelCollapsed")}></Col>
                                                    <Collapse in={this.state.sourceFilterPanelCollapsed}>
                                                        <Col xs={12} className="filter-dropdown-panel">
                                                        {companyFilterOptions}
                                                        </Col>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Platform</Form.Label>
                                                    <Form.Control as="select" name="platform" placeholder="Platform"   onClick={() => this.toggleFilterDropdown("platformFilterPanelCollapsed")}/>
                                                    <Collapse in={this.state.platformFilterPanelCollapsed}>
                                                        <div style={{"width":"200px"}}>
                                                            <p>Platform 1</p>
                                                            <p>Platform 2</p>
                                                            <p>Platform 3</p>
                                                        </div>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Affected Product</Form.Label>
                                                    <Form.Control as="select" name="removed_content" placeholder="Removed Content"   onClick={() => this.toggleFilterDropdown("productFilterPanelCollapsed")}/>
                                                    <Collapse in={this.state.productFilterPanelCollapsed}>
                                                        <div style={{"width":"200px"}}>
                                                            <p>Product 1</p>
                                                            <p>Product 2</p>
                                                            <p>Product 3</p>
                                                        </div>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Geographic Area</Form.Label>
                                                    <Form.Control as="select" name="geography" placeholder="Geography"   onClick={() => this.toggleFilterDropdown("geogrphicAreaFilterPanelCollapsed")}/>
                                                    <Collapse in={this.state.geogrphicAreaFilterPanelCollapsed}>

                                                    <div style={{"width":"200px"}}>
                                                            <p>Geographic Area 1</p>
                                                            <p>Geographic Area 2</p>
                                                            <p>Geographic Area 3</p>
                                                        </div>
                                                        </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Policy Infringement</Form.Label>
                                                    <Form.Control as="select" name="policy_infringement" placeholder="Policy Infringement"   onClick={() => this.toggleFilterDropdown("policyFilterPanelCollapsed")}/>
                                                    <Collapse in={this.state.policyFilterPanelCollapsed}>
                                                        <div style={{"width":"200px"}}>
                                                            <p>Policy 1</p>
                                                            <p>Policy 2</p>
                                                            <p>Policy 3</p>
                                                        </div>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label></Form.Label>
                                                    <Form.Check type="checkbox" name="date" label="Contains Screenshots" />
                                                    
                                                </Form.Group>
                                            </Col>

                                        </Row>
                                    </Form>
                                </Collapse>
                            </Col>
                            <Col xs={12} lg={12} id="table-section">
                                <div className="table-wrapper">
                                    <table>
                                        <tbody>
                                            {this.state.platform_records && filteredRecords.length>0 && row_renders}
                                        </tbody>
                                    </table>
                                </div>

                                <iframe className="airtable-embed" 
                                        src="https://airtable.com/embed/shrYU6XDj0F0slvSP?backgroundColor=yellow&viewControls=on" 
                                        frameborder="0" 
                                        onmousewheel="" 
                                        width="100%" 
                                        height="533" 
                                        style={{"background": "transparent", "border": "1px solid #ccc;"}}></iframe>
                            </Col>

                            </Row>
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
                                        <img src={logo_1}></img>
                                    </Col>
                                    <Col className="logo-wrapper">
                                        <img src={logo_2}></img>
                                    </Col>
                                    <Col className="logo-wrapper">
                                        <img src={logo_3}></img>
                                    </Col>
                                </Row>
                            </Col>
                        
                        </Row>  
                    </footer>
                    
                </Container>
        </>
    }
}

export default Home