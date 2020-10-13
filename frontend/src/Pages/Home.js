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
import {BACKEND_URI, SYNC_URI} from '../constants'
class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            filterPanelCollapsed: true,
            selection: {
                startDate: new Date("Jan 01 2000"),
                endDate: new Date(),
                key: 'selection',
              },
              sourceFilters: {},
              search_term: "",

              removal_type_filters: {},
              geography_filters: {},
              infringement_filters: {},
              source_filters: {},
              company_filters: {},
              contains_screenshots_filter: false,


              dodFilterPanelCollapsed: false,
              platformFilterPanelCollapsed: false,
              sourceFilterPanelCollapsed: false,
              productFilterPanelCollapsed: false,
              policyFilterPanelCollapsed: false,
              geogrphicAreaFilterPanelCollapsed: false,
              active: "table",

              skip: 0,
              limit: 10
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
        let sync_ids = await axios.get(`${BACKEND_URI}/platforms?count=true`)
        sync_ids = sync_ids.data["sync_ids"]

        let platform_records = []

        // console.log(sync_ids)
        // for(let i=0; i<15; i++)
        // {
        //     let record = await axios.get(`${BACKEND_URI}/platforms?sync_id=${sync_ids[i]}`)
        //     // console.log(record.data.data)
        //     platform_records.push(record.data.data)
        // }

        let records = await axios.get(`${BACKEND_URI}/platforms?all=true`)
        platform_records = records.data

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
        this.setState({[filter]: temp, skip:0})
    }

    renderFilterOptions = (key, filter) => {

        //Empty array for render options
        let final_renders = []

        // Create a copy of the platform records
        let records = []

        if(this.state.platform_records)
        {
            records = [...this.state.platform_records]
        }

        // Make sure that there are atleast 1 record available
        if(records && records.length > 0)
        {
            let all_options = records.flatMap(function(record){
                // Extract
                let cell_data = record[key]
                if(cell_data)
                {
                    return cell_data
                }
            })

            let unique_options = Array.from(new Set(all_options))
            unique_options = unique_options.filter(Boolean)
            // If there are atleast 1 option
            if(unique_options.length > 0)
            {
                for(let i=0; i<unique_options.length; i++)
                {
                    let option = unique_options[i]

                    // Create dropdown renders
                    final_renders.push(
                        <Col xs={12} className="option">
                            <Toggle
                                defaultChecked={this.state[filter][option]}
                                icons={false}
                                aria-label={option}
                                onChange={() => this.toggleFilter(filter, option)} />
                            <span>{option}</span>
                        </Col>
                    )
                }
            }

            return final_renders
        }
    }   


    renderCategoryFilterOptions = (key, filterState) => {
        let temp = this.state.platform_records

        if(temp)
        {
            console.log(key)
            let options = Array.from(new Set(temp.map(record => record[key])))
            
            if(options.length > 0)
            {

                let renders = []
                for(let i=0; i<options.length; i++)
                {
                    let option = options[i]
                    renders.push(
                        <Col xs={12} className="option">
                            <Toggle
                                defaultChecked={this.state[filterState][option]}
                                icons={false}
                                aria-label={option}
                                onChange={() => this.toggleFilter(filterState, option)} />
                            <span>{option}</span>
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
        

        //Company Filter
        let company_filter_options    = this.renderFilterOptions('COMPANY', 'company_filters')

        //Removal Type Filter
        let removal_type_options      = this.renderFilterOptions('REMOVAL_TYPE', 'removal_type_filters')

        //Policy Violation Filter
        let infringement_options     = this.renderFilterOptions('POLICY_VIOLATIONS', 'infringement_filters')


        //Policy Violation Filter
        let source_options     = this.renderFilterOptions('SOURCE_TYPE', 'source_filters')

        //Geography
        let origin_country_options     = this.renderFilterOptions('ORIGIN_COUNTRY', 'geography_filters')
        let destination_country_options     = this.renderFilterOptions('DESTINATION_COUNTRY', 'geography_filters')
        let geography_options = []
        if(origin_country_options && destination_country_options)
        {
            geography_options = [...origin_country_options, ...destination_country_options]
        }
        // let removealTypeOptions = this.renderCategoryFilterOptions('REMOVAL_TYPE', removal_type_filters)


        let FILTERS = ['COMPANY', 'REMOVAL_TYPE', 'POLICY_VIOLATIONS', 'SOURCE_TYPE', 'GEOGRAPHY', 'SCREENSHOTS', 'DOD', 'SEARCH']
        
        let filtered_records = []
        
        if(this.state.platform_records)
        {
            filtered_records = [...this.state.platform_records]
        }

        let filter_labels = {}

        for(let i=0; i<FILTERS.length; i++)
        {
            let FILTER = FILTERS[i]

            switch(FILTER)
            {
                case 'COMPANY':
                    let companies_to_filter = this.state.company_filters && Object.keys(this.state.company_filters)
                    if(companies_to_filter)
                    {
                        companies_to_filter = companies_to_filter.filter(key => this.state.company_filters[key])
                        if(companies_to_filter.length > 0)
                        {
                            filter_labels["COMPANY"] = true
                            filtered_records = filtered_records.filter(function(record){
                                let result = false
                                if(record['COMPANY'])
                                {
                                    for(let j=0; j<record['COMPANY'].length; j++)
                                    {
                                        if(companies_to_filter.includes(record['COMPANY'][j]))
                                        {
                                            result = true
                                            break
                                        }
                                    }
                                }
                                
                                return result
                            } 
                        )
                        }
                        
                    }
                    break

                case 'REMOVAL_TYPE':
                    let removal_types_to_filter = this.state.removal_type_filters && Object.keys(this.state.removal_type_filters)

                    if(removal_types_to_filter)
                    {
                        removal_types_to_filter = removal_types_to_filter.filter(key => this.state.removal_type_filters[key])
                        if(removal_types_to_filter.length > 0)
                        {
                            filter_labels["REMOVAL_TYPE"] = true
                            filtered_records = filtered_records.filter((record) => removal_types_to_filter.includes(record['REMOVAL_TYPE']))
                        }
                        
                    }
                    break

                case 'POLICY_VIOLATIONS':
                    let policy_infringements_to_filter = this.state.infringement_filters && Object.keys(this.state.infringement_filters)

                    if(policy_infringements_to_filter)
                    {
                        policy_infringements_to_filter = policy_infringements_to_filter.filter(key => this.state.infringement_filters[key])
                        if(policy_infringements_to_filter.length > 0)
                        {
                            filter_labels["POLICY_VIOLATIONS"] = true
                            filtered_records = filtered_records.filter((record) => policy_infringements_to_filter.includes(record['POLICY_VIOLATIONS']))
                        }
                        
                    }
                    break
                case 'SOURCE_TYPE':
                    let sources_to_filter = this.state.source_filters && Object.keys(this.state.source_filters)

                    if(sources_to_filter)
                    {
                        sources_to_filter = sources_to_filter.filter(key => this.state.source_filters[key])
                        if(sources_to_filter.length > 0)
                        {
                            filter_labels["SOURCE_TYPE"] = true
                            filtered_records = filtered_records.filter((record) => sources_to_filter.includes(record['SOURCE_TYPE']))
                        }
                        
                    }
                    break
                case 'GEOGRAPHY':
                    let geo_to_filter = this.state.geography_filters && Object.keys(this.state.geography_filters)

                    if(geo_to_filter)
                    {
                        geo_to_filter = geo_to_filter.filter(key => this.state.geography_filters[key])
                        if(geo_to_filter.length > 0)
                        {
                            filter_labels["GEOGRAPHY"] = true
                            filtered_records = filtered_records.filter((record) => geo_to_filter.includes(record['ORIGIN_COUNTRY']) || geo_to_filter.includes(record['DESTINATION_COUNTRY']))
                        }
                        
                    }
                    break
                // case 'SCREENSHOTS':
                //     if(this.state.contains_screenshots_filter)
                //     {
                //         filtered_records = filtered_records.filter((record) => record['SCREENSHOTS'] && record['SCREENSHOTS'].length > 0)
                //     }
                //     break

                case 'DOD':
                    let dates_to_filter = this.state.selection

                    if(dates_to_filter)
                    {
                        filter_labels["DOD"] = true

                        filtered_records = filtered_records.filter((record) => {
                            return new Date(record["DISCLOSURE_DATE"]) >= dates_to_filter.startDate && new Date(record["DISCLOSURE_DATE"]) <= dates_to_filter.endDate
                        })
                    }
                    break

                case 'SEARCH':
                    let search_term = this.state.search_term.trim()

                    if(search_term.length > 0)
                    {
                        filter_labels["SEARCH"] = true

                        filtered_records = filtered_records.filter((record) => {
                            console.log(JSON.stringify(record))

                            return JSON.stringify(record).includes(search_term)
                        })
                    }
                default:
                    break
            }
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

            let data_to_show = filtered_records.slice(this.state.skip, this.state.skip + this.state.limit)
            for(let i=0; i<data_to_show.length; i++)
            {
                let row_data = data_to_show[i]
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
                                    value={this.state.search_term}
                                    onChange={(e) => this.setState({search_term: e.target.value})}
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
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("dodFilterPanelCollapsed")}>
                                                        {filter_labels["DOD"] && <p>Filter Active</p>}
                                                    </Col>
                                                    <Collapse in={this.state.dodFilterPanelCollapsed}>
                                                        <Col xs={12} className="filter-dropdown-panel">
                                                            <DateRangePicker
                                                                ranges={[this.state.selection]}
                                                                onChange={this.handleSelect}
                                                            />
                                                        </Col>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Companies</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("sourceFilterPanelCollapsed")}>
                                                        {filter_labels["COMPANY"] && <p>Filter Active</p>}
                                                    </Col>
                                                    <Collapse in={this.state.sourceFilterPanelCollapsed}>
                                                        <Col xs={12} className="filter-dropdown-panel">
                                                            {company_filter_options}
                                                        </Col>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Source Type</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("platformFilterPanelCollapsed")}>
                                                        {filter_labels["SOURCE_TYPE"] && <p>Filter Active</p>}
                                                    </Col>
                                                    <Collapse in={this.state.platformFilterPanelCollapsed}>
                                                        <Col xs={12} className="filter-dropdown-panel">
                                                            {source_options}
                                                        </Col>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Removal Type</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("productFilterPanelCollapsed")}>
                                                        {filter_labels["REMOVAL_TYPE"] && <p>Filter Active</p>}
                                                    </Col>
                                                    <Collapse in={this.state.productFilterPanelCollapsed}>
                                                        <Col xs={12} className="filter-dropdown-panel">
                                                        {removal_type_options}
                                                        </Col>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Geographic Area</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("geogrphicAreaFilterPanelCollapsed")}>
                                                        {filter_labels["GEOGRAPHY"] && <p>Filter Active</p>}
                                                    </Col>
                                                    <Collapse in={this.state.geogrphicAreaFilterPanelCollapsed}>

                                                        <Col xs={12} className="filter-dropdown-panel">
                                                            {geography_options}
                                                        </Col>
                                                        </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Policy Infringement</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("policyFilterPanelCollapsed")}>
                                                        {filter_labels["POLICY_VIOLATIONS"] && <p>Filter Active</p>}
                                                    </Col>
                                                    <Collapse in={this.state.policyFilterPanelCollapsed}>
                                                    <Col xs={12} className="filter-dropdown-panel">
                                                        {infringement_options}
                                                        </Col>
                                                    </Collapse>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group>
                                                    <Form.Label></Form.Label>
                                                    <Form.Check type="checkbox" name="date" value={this.state.contains_screenshots_filter} onChange={(e) => this.setState({contains_screenshots_filter: e.target.checked})} label="Contains Screenshots" />
                                                    
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
                                            {this.state.platform_records && filtered_records.length>0 && row_renders}
                                        </tbody>
                                    </table>
                                </div>
                                <Col xs={12} id="pagination-wrapper">
                                    <Row className="justify-content-end">
                                        <Col className="record-index">
                                            <p>Viewing {this.state.skip} - {(this.state.skip + this.state.limit) <= filtered_records.length? this.state.skip + this.state.limit: filtered_records.length} out of {filtered_records.length}</p>
                                        </Col>
                                        {(this.state.skip >= this.state.limit) && <Button onClick={(e) => {this.setState({skip: this.state.skip - this.state.limit})}}>Previous</Button> }
                                        {(this.state.skip + this.state.limit) < filtered_records.length && <Button onClick={(e) => {this.setState({skip: this.state.skip + this.state.limit})}}>Next</Button> }
                                    </Row>
                                </Col>

                                {/* <iframe className="airtable-embed" 
                                        src="https://airtable.com/embed/shrYU6XDj0F0slvSP?backgroundColor=yellow&viewControls=on" 
                                        frameborder="0" 
                                        onmousewheel="" 
                                        width="100%" 
                                        height="533" 
                                        style={{"background": "transparent", "border": "1px solid #ccc;"}}></iframe> */}
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