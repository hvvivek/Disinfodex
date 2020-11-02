import React from 'react'
import moment from 'moment'
// import ColumnResizer from 'react-column-resizer'

// import getNames from 'country-list'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import NetworkModal from "../Components/NetworkModal"
import Card from "../Components/Card"
import TableRow from "../Components/TableRow"

import '../Stylesheets/Home.css'
import Collapse from 'react-bootstrap/esm/Collapse'
import axios from 'axios'
import Header from "../Components/Header"
import Footer from '../Components/Footer'

import "react-toggle/style.css" // for ES6 modules
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import table from "../Assets/Icons/table.png"
import table_active from "../Assets/Icons/table_active.png"
import cards from "../Assets/Icons/cards.png"
import cards_active from "../Assets/Icons/cards_active.png"

import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";


import { DateRangePicker } from 'react-date-range';
import {BACKEND_URI} from '../constants'
import { CSVLink } from "react-csv";

import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

const {getNames } = require('country-list');
const ObjectsToCsv = require('objects-to-csv');

const override = css`
  display: block;
  margin: 0 auto;
  text-align: center;
`;

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
                default: true
              },
              sourceFilters: {},
              search_term: "",

              removal_type_filters: {},
              geography_filters: {},
              origin_country_filters: {},
              destination_country_filters: {},
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
              originCountryFilterPanelCollapased: false,
              destinationCountryFilterPanelCollapsed: false,

              currentSort: "DISCLOSURE_DATE",
              ascendingSort: false,
              active: "cards",
              cards_latest_first: true,

              skip: 0,
              limit: 25,

              cards_page: 0
        }
    }

    toggleFilterPanel = (e) => {
        this.setState({filterPanelCollapsed: !this.state.filterPanelCollapsed})
    }

    toggleFilterDropdown = (panelName) => {

        let panels = [
            "dodFilterPanelCollapsed",
            "platformFilterPanelCollapsed",
            "sourceFilterPanelCollapsed",
            "productFilterPanelCollapsed",
            "policyFilterPanelCollapsed",
            "geogrphicAreaFilterPanelCollapsed",
            "originCountryFilterPanelCollapased",
            "destinationCountryFilterPanelCollapsed",
        ]

        let new_state = {}
        for(let i=0;i<panels.length; i++)
        {
            if(panels[i] !== panelName)
            {
                new_state[panels[i]] = false
            }
        }
        new_state[panelName] = !this.state[panelName]
        this.setState(new_state)
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
        // let sync_ids = await axios.get(`${BACKEND_URI}/platforms?count=true`)
        // sync_ids = sync_ids.data["sync_ids"]

        let platform_records = []
        let networks = []
        let screenshots = []

        platform_records = await axios.get(`${BACKEND_URI}/platforms?all=true`)
        networks = await axios.get(`${BACKEND_URI}/networks?all=true`)
        screenshots = await axios.get(`${BACKEND_URI}/screenshots?all=true`)

        platform_records = platform_records.data
        networks = networks.data
        screenshots = screenshots.data

        this.setState({platform_records: platform_records, networks: networks, screenshots: screenshots})

    }

    render_card = (data) => {

        let screenshots = []
        if(data["Screenshots"])
        {
            for(let i=0; i<data["Screenshots"].length; i++)
            {
                let SYNC_ID = data["Screenshots"][i]
                let filtered = this.state.screenshots.filter(image => image.sync_id === SYNC_ID)
                if(filtered && filtered.length > 0 )
                {
                    screenshots.push(filtered[0])
                }
            }
        }
        let platform_records = []

        if(data["Platform Reports"])
        {
            for(let i=0; i<data["Platform Reports"].length; i++)
            {
                let SYNC_ID = data["Platform Reports"][i]
                let filtered = this.state.platform_records.filter(record => record.sync_id === SYNC_ID)
                if(filtered && filtered.length > 0 )
                {
                    platform_records.push(filtered[0])
                }
            }
        }

        let payload = {
            networks: [data.Name],
            startDate: data["Earliest Date"],
            endDate: data["Latest Date"],
            platforms: data["Company"],
            removal_types: data["Removal Type"],
            description: data["Description"],
            screenshots: screenshots,
            platform_records: platform_records
        }
        return <Card data={payload}></Card>
    }

    handleClose = () => {
        this.setState({showRowModal: false})
    }

    render_network_card = (key, value) => {
        if(key === "Network")
        {
            let data = this.state.networks && this.state.networks.filter(network => network.Name === value)
            
            if(data.length > 0)
            {
                data = data[0]
            }

            let screenshots = []
            if(data["Screenshots"])
            {
                for(let i=0; i<data["Screenshots"].length; i++)
                {
                    let SYNC_ID = data["Screenshots"][i]
                    let filtered = this.state.screenshots.filter(image => image.sync_id === SYNC_ID)
                    if(filtered && filtered.length > 0 )
                    {
                        screenshots.push(filtered[0])
                    }
                }
            }

            let platform_records = []

            if(data["Platform Reports"])
            {
                for(let i=0; i<data["Platform Reports"].length; i++)
                {
                    let SYNC_ID = data["Platform Reports"][i]
                    let filtered = this.state.platform_records.filter(record => record.sync_id === SYNC_ID)
                    if(filtered && filtered.length > 0 )
                    {
                        platform_records.push(filtered[0])
                    }
                }
            }

            let payload = {
                networks: [data.Name],
                startDate: data["Earliest Date"],
                endDate: data["Latest Date"],
                platforms: data["Company"],
                removal_types: data["Removal Type"],
                description: data["Description"],
                screenshots: screenshots,
                platform_records: platform_records
            }

            this.setState({showRowModal: false, showNetworkModal: true, networkModalData: payload})
        }
        else
        {
            this.setState({showNetworkModal: false, networkModalData: null})
        }
    }

    handleModalClose = () => {
        this.setState({showRowModal: false, showNetworkModal: false})
    }

    handleSelect = (ranges) => {
        this.setState({selection: {...ranges["selection"], default: false}})
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
            unique_options = unique_options.filter(Boolean).sort()
            // If there are atleast 1 option
            if(unique_options.length > 0)
            {
                for(let i=0; i<unique_options.length; i++)
                {
                    let option = unique_options[i]

                    // Create dropdown renders
                    final_renders.push(
                        <Col xs={12} className="option">
                            <span>{option}</span>
                            <Checkbox
                                defaultChecked={this.state[filter][option]}
                                checked={this.state[filter][option]}
                                onChange={() => this.toggleFilter(filter, option)}
                            />
                        </Col>
                    )
                }
            }

            return final_renders
        }
    }
    
    renderCountryOptions = (key, filter) => {
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
            let country_list = getNames()

            // console.log(unique_options)
            // console.log(country_list)

            window.country_list = country_list
            window.unique_options = unique_options
            let filtered_list = []
            let unfiltered = []
            for(let i=0; i<unique_options.length; i++)
            {
                if(country_list.includes(unique_options[i]))
                {
                    filtered_list.push(unique_options[i])
                }
                else
                {
                    unfiltered.push(unique_options[i])
                }
            }

            for(let i=0; i<unfiltered.length; i++)
            {
                let broken = unfiltered[i].split(",")
                // console.log(unfiltered[i])
                // console.log(broken)
                for(let j=0; j<broken.length; j++)
                {
                    if(country_list.includes(broken[j].trim()))
                    {
                        filtered_list.push(broken[j].trim())
                    }
                }

                broken = unfiltered[i].split("and")
                for(let j=0; j<broken.length; j++)
                {
                    // console.log(broken[i])
                    if(country_list.includes(broken[j].trim()))
                    {
                        filtered_list.push(broken[j].trim())
                    }
                }
                
                
            }

            unique_options = [...new Set(filtered_list)].sort()
            // console.log(unfiltered)
            

            // If there are atleast 1 option
            if(unique_options.length > 0)
            {
                for(let i=0; i<unique_options.length; i++)
                {
                    let option = unique_options[i]

                    // Create dropdown renders
                    final_renders.push(
                        <Col xs={12} className="option">
                            <span>{option}</span>
                            <Checkbox
                                defaultChecked={this.state[filter][option]}
                                onChange={() => this.toggleFilter(filter, option)}
                            />
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
            let options = Array.from(new Set(temp.map(record => record[key])))
            
            if(options.length > 0)
            {

                let renders = []
                for(let i=0; i<options.length; i++)
                {
                    let option = options[i]
                    renders.push(
                        <Col xs={12} className="option">
                            <span>{option}</span>
                            <Checkbox
                                defaultChecked={this.state[filterState][option]}
                                onChange={() => this.toggleFilter(filterState, option)}
                            />
                        </Col>
                    )
                }
                return renders
            }

        }
        return []
    }

    handlePageSwitch = (i) => {
        this.setState({cards_page: i})
    }

    handleCardsPagination = (i) => {
        this.setState({cards_page: i})
    }

    downloadDataAsCSV = async (data) =>
    {
        const csv = new ObjectsToCsv(data);
        console.log(await csv.toString())
        let csvContent = "data:text/csv;charset=utf-8," + await csv.toString()
        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }
    

    render()
    {

        //Company Filter
        let company_filter_options    = this.renderFilterOptions('COMPANY', 'company_filters')

        //Removal Type Filter
        let removal_type_options      = this.renderFilterOptions('REMOVAL_TYPE', 'removal_type_filters')

        //Policy Violation Filter
        // let infringement_options     = this.renderFilterOptions('POLICY_VIOLATIONS', 'infringement_filters')


        //Policy Violation Filter
        let source_options     = this.renderFilterOptions('SOURCE_TYPE', 'source_filters')

        //Geography
        let origin_country_options     = this.renderCountryOptions('ORIGIN_COUNTRY', 'origin_country_filters')
        let destination_country_options     = this.renderCountryOptions('DESTINATION_COUNTRY', 'destination_country_filters')
        // let geography_options = []
        // if(origin_country_options && destination_country_options)
        // {
        //     geography_options = [...origin_country_options, ...destination_country_options]
        // }
        // let removealTypeOptions = this.renderCategoryFilterOptions('REMOVAL_TYPE', removal_type_filters)


        let FILTERS = ['COMPANY', 'REMOVAL_TYPE', 'POLICY_VIOLATIONS', 'SOURCE_TYPE', 'ORIGIN_COUNTRY','DESTINATION_COUNTRY', 'SCREENSHOTS', 'DOD', 'SEARCH']
        
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
                            filter_labels["COMPANY"] = companies_to_filter
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
                            filter_labels["REMOVAL_TYPE"] = removal_types_to_filter
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
                            filter_labels["POLICY_VIOLATIONS"] = policy_infringements_to_filter
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
                            filter_labels["SOURCE_TYPE"] = sources_to_filter
                            filtered_records = filtered_records.filter((record) => sources_to_filter.includes(record['SOURCE_TYPE']))
                        }
                        
                    }
                    break
                case 'DESTINATION_COUNTRY':
                    let dest_geo_to_filter = this.state.destination_country_filters && Object.keys(this.state.destination_country_filters)

                    if(dest_geo_to_filter)
                    {
                        dest_geo_to_filter = dest_geo_to_filter.filter(key => this.state.destination_country_filters[key])
                        if(dest_geo_to_filter.length > 0)
                        {
                            filter_labels["DESTINATION_COUNTRY"] = dest_geo_to_filter
                            filtered_records = filtered_records.filter((record) => dest_geo_to_filter.includes(record['DESTINATION_COUNTRY']) || (record['DESTINATION_COUNTRY'] && record['DESTINATION_COUNTRY'].includes(dest_geo_to_filter)))
                        }
                        
                    }
                    break

                case 'ORIGIN_COUNTRY':
                    let origin_geo_to_filter = this.state.origin_country_filters && Object.keys(this.state.origin_country_filters)

                    if(origin_geo_to_filter)
                    {
                        origin_geo_to_filter = origin_geo_to_filter.filter(key => this.state.origin_country_filters[key])
                        console.log(origin_geo_to_filter)

                        if(origin_geo_to_filter.length > 0)
                        {
                            filter_labels["ORIGIN_COUNTRY"] = origin_geo_to_filter
                            let country_filters = []
                            for(let i=0; i<origin_geo_to_filter.length; i++)
                            {
                                country_filters = [...country_filters, ...filtered_records.filter((record) => {
                                    console.log(record['ORIGIN_COUNTRY'])
                                    console.log(origin_geo_to_filter[i])
                                    return record['ORIGIN_COUNTRY'] && (record['ORIGIN_COUNTRY'].toLowerCase().trim().includes(origin_geo_to_filter[i].toLowerCase().trim()) || record['ORIGIN_COUNTRY'].toLowerCase().trim() === origin_geo_to_filter[i].toLowerCase().trim())
                                }
                                    )
                                ]
                            }
                            filtered_records = country_filters

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
                case 'SCREENSHOTS':
                    if (this.state.contains_screenshots_filter) {
                        
                        filtered_records = filtered_records.filter((record) => {

                            let NETWORK_IDS = record['NETWORK_ID']
                            if(NETWORK_IDS)
                            {
                                for(let a=0; a<NETWORK_IDS.length; a++)
                                {
                                    let NETWORK = this.state.networks.filter(network => network.sync_id === NETWORK_IDS[a])
                                    console.log(NETWORK)
                                    if(NETWORK && NETWORK.length > 0)
                                    {
                                        if("Screenshots" in NETWORK[0])
                                        {
                                            return true
                                        }
                                    }
                                }
                            }

                            return false
                        }

                        
                        )
                    }
                    break

                case 'DOD':
                    let dates_to_filter = this.state.selection

                    if(dates_to_filter && !dates_to_filter["default"])
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

                            return JSON.stringify(record).toLowerCase().includes(search_term.toLowerCase())
                        })
                    }
                    break
                default:
                    break
            }
        }

        let row_renders = []
        if(this.state.platform_records && this.state.platform_records.length > 0)
        {
            let COLUMNS = [
                {name: "Date of Disclosure", slug: "dod", index: "DISCLOSURE_DATE"},
                {name: "Company", slug: "company", index: "COMPANY"},
                {name: "Network", slug: "network"},
                {name: "Removal Type", slug: "removal_type", index: "REMOVAL_TYPE"},
                {name: "Removal Number", slug: "removal_number", index: "REMOVAL_NUMBER"},
                {name: "Engagement Context", slug: "engagement_context"},
                {name: "Engagement Number", slug: "engagement_number", index: "ENGAGEMENT_NUMBER"},
                {name: "Target Country", slug: "target_country", index: "DESTINATION_COUNTRY"},
                {name: "Origin Country", slug: "origin_country", index: "ORIGIN_COUNTRY"},
                {name: "Named Entities", slug: "named_entities"},
                {name: "Policy Violations", slug: "policy_violations", index: "POLICY_VIOLATIONS"},
                {name: "URL", slug: "url", index: "MAIN_URL"},
                {name: "Secondary URL", slug: "secondary_url", index: "SECONDARY_URL"},
                {name: "Description", slug: "description"},
                {name: "Notes", slug: "notes"},
                {name: "Archive URL", slug: "archive_url", index: "ARCHIVE_URL"}
            ]

            row_renders.push(
                <tr>
                    {
                    COLUMNS.map(column => <th>
                        <div className="dod-column">
                            {column["name"]}
                            {column["index"] && this.state.currentSort !== column["index"] && <i class="fas fa-caret-down" onClick={() => this.setState({currentSort: column["index"], ascendingSort: !this.state.ascendingSort})}></i>}
                            {column["index"] && this.state.currentSort === column["index"] && <i class={this.state.ascendingSort? "fas fa-arrow-up": "fas fa-arrow-down"} onClick={() => this.setState({currentSort: column["index"], ascendingSort: !this.state.ascendingSort})}></i>}

                        </div>
                    </th>)
                    }
                </tr>
            )
            
            if(this.state.currentSort)
            {
                const SORT_KEY = this.state.currentSort
                filtered_records = filtered_records.sort((a,b) => this.state.ascendingSort? a[SORT_KEY] > b[SORT_KEY]: a[SORT_KEY] < b[SORT_KEY])
            }

            let data_to_show = filtered_records.slice(this.state.skip, this.state.skip + this.state.limit)
            for(let i=0; i<data_to_show.length; i++)
            {
                let row_data = data_to_show[i]
                row_renders.push(
                    <TableRow data={row_data} networks={this.state.networks} handleNetworkModal={this.render_network_card}></TableRow>
                    )
            }
        }
    

        let filtered_networks = filtered_records.flatMap(record=> record["NETWORK_ID"])
        filtered_networks = [...new Set(filtered_networks)]

        


        let card_renders = []
        let networks = this.state.networks || []
        let cards_pagination = []

        networks = networks.filter(network => filtered_networks.indexOf(network["sync_id"])>=0)
        if(this.state.contains_screenshots_filter)
        {
            networks = networks.filter(network => "Screenshots" in network)
        }

        if(this.state.cards_latest_first)
        {
            networks.sort(function(a,b)
            {
                if(a["Latest Date"] && b["Latest Date"])
                {
                    return a["Latest Date"] <= b["Latest Date"]
                }
                return false
            })
        }
        else
        {
            networks.sort(function(a,b)
            {
                if(a["Latest Date"] && b["Latest Date"])
                {
                    return a["Latest Date"] >= b["Latest Date"]
                }
                return false
            })
        }
        
        
        if(networks.length > 0)
        {
            // let start = this.state.cards_page * 10
            let start = this.state.skip

            // let end = (this.state.cards_page+1) * 10
            let end = this.state.skip + this.state.limit

            if(end>networks.length)
            {
                end = networks.length
            }

            for(let i=start; i<end; i++)
            {
                let card_data = networks[i]
                card_renders.push(this.render_card(card_data))
            }

            let num_pages = Math.ceil(networks.length/10)
            for(let i=0; i<num_pages; i++)
            {
                cards_pagination.push(<span className={this.state.cards_page === i? "card-pages active": "card-pages"} onClick={() => this.handlePageSwitch(i)}>{i+1}</span>)
            }
        }
        
        return <>
                {/* NAVBAR COMPONENT */}
                <Navbar id="navbar">
                    <Navbar.Brand href="/">dis<span>•</span>info<span>•</span>dex</Navbar.Brand>

                </Navbar>
                {/* NAVBAR COMPONENT */}

                <Header active="database"></Header>

                <Container fluid id="home">
                    <Row>
                        {this.state.showNetworkModal && <NetworkModal 
                                                            show={this.state.showNetworkModal} 
                                                            handleClose={this.handleModalClose} 
                                                            data={this.state.networkModalData} />}


                        <Col xs={12} id="search-section">
                            <Col xs={12} lg={{span:6, offset:3}}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <i className="fas fa-search"></i>
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
                                <a href="/how-to">Learn more about how the data is reported</a>
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
                                <Col xs={12} md={6} lg={4} xl={4}>
                                    <Row className="justify-content-end">
                                        <Col>
                                            <p>View As:</p>
                                        </Col>
                                        <Col className="icon-wrapper" onClick={() => this.setState({active: "table"})}>
                                            {this.state.active === "table"? <img src={table_active} alt="Table View"></img> : <img src={table} alt="Table View"></img>}
                                            <span className={this.state.active === "table"? "active-view view-link": "view-link"} >Table</span>
                                        </Col>
                                        {/* <Col>
                                            <p><i class="fas fa-stream"></i> Timeline</p>
                                        </Col> */}
                                        <Col className="icon-wrapper" onClick={() => this.setState({active: "cards"})}>
                                            {this.state.active === "cards"? <img src={cards_active} alt="Card View"></img> : <img src={cards} alt="Card View"></img>}
                                            <span className={this.state.active === "cards"? "active-view view-link": "view-link"}>Cards</span>
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
                                                    {filter_labels["DOD"]? <p className="time-filter">{moment(this.state.selection["startDate"]).format("MMM DD YYYY")  + " - " + moment(this.state.selection["endDate"]).format("MMM DD YYYY")} <i class="fas fa-times" onClick={(e) => {e.stopPropagation(); let temp = {...this.state.selection}; temp["default"] = true; this.setState({selection: temp})}}></i></p> : <p className="no-filter">Select <span><i class="fas fa-caret-down"></i></span></p>}
                                                    </Col>
                                                    <Collapse in={this.state.dodFilterPanelCollapsed}>
                                                        <Col xs={12} className="filter-dropdown-panel filter-dropdown-panel-date">
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
                                                        {filter_labels["COMPANY"]? filter_labels["COMPANY"].map(company => <p className={"pill " + company.replace("/", "")}>{company}<span onClick={(e) => {e.stopPropagation(); this.toggleFilter('company_filters', company)}}><i class="fas fa-times"></i></span></p>): <p className="no-filter">Select <span><i class="fas fa-caret-down"></i></span></p>}
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
                                                        {filter_labels["SOURCE_TYPE"] ? filter_labels["SOURCE_TYPE"].map(company => <p className={"pill " + company.replace("/", "")}>{company}<span onClick={(e) => {e.stopPropagation(); this.toggleFilter('source_filters', company)}}><i class="fas fa-times"></i></span></p>) : <p className="no-filter">Select <span><i class="fas fa-caret-down"></i></span></p>}
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
                                                        {filter_labels["REMOVAL_TYPE"] ? filter_labels["REMOVAL_TYPE"].map(company => <p className={"pill " + company.replace("/", "")}>{company}<span onClick={(e) => {e.stopPropagation(); this.toggleFilter('removal_type_filters', company)}}><i class="fas fa-times"></i></span></p>) : <p className="no-filter">Select <span><i class="fas fa-caret-down"></i></span></p>}
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
                                                    <Form.Label>Origin Country</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("originCountryFilterPanelCollapased")}>
                                                        {filter_labels["ORIGIN_COUNTRY"] ? filter_labels["ORIGIN_COUNTRY"].map(company => <p className={"pill " + company.replace("/", "")}>{company}<span onClick={(e) => {e.stopPropagation(); this.toggleFilter('origin_country_filters', company)}}><i class="fas fa-times"></i></span></p>) : <p className="no-filter">Select <span><i class="fas fa-caret-down"></i></span></p>}
                                                    </Col>
                                                    <Collapse in={this.state.originCountryFilterPanelCollapased}>

                                                        <Col xs={12} className="filter-dropdown-panel">
                                                            {origin_country_options}
                                                        </Col>
                                                        </Collapse>
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>Target Country</Form.Label>
                                                    <Col xs={12} className="filter-dropdown" onClick={() => this.toggleFilterDropdown("destinationCountryFilterPanelCollapsed")}>
                                                        {filter_labels["DESTINATION_COUNTRY"] ? filter_labels["DESTINATION_COUNTRY"].map(company => <p className={"pill " + company.replace("/", "")}>{company}<span onClick={(e) => {e.stopPropagation(); this.toggleFilter('destination_country_filters', company)}}><i class="fas fa-times"></i></span></p>) : <p className="no-filter">Select <span><i class="fas fa-caret-down"></i></span></p>}
                                                    </Col>
                                                    <Collapse in={this.state.destinationCountryFilterPanelCollapsed}>

                                                        <Col xs={12} className="filter-dropdown-panel">
                                                            {destination_country_options}
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
                                
                                {this.state.active === "table" && 
                                <>
                                <div className="table-wrapper">
                                    <table>
                                        <tbody>
                                            {this.state.platform_records && filtered_records.length>0 && row_renders}
                                        </tbody>
                                    </table>
                                </div>
                                
                                </>}
                                {this.state.active === "cards" && 
                                    <Col xs={12}>
                                            <Col xs={12}>
                                            <Row className="justify-content-end">

                                                <p className="sort-content-link" onClick={() => this.setState({ cards_latest_first: !this.state.cards_latest_first })}>
                                                    <i className={this.state.cards_latest_first ? "fas fa-sort-numeric-up" : "fas fa-sort-numeric-down"}></i>
                                                    {this.state.cards_latest_first ? "Sort Cards: Oldest to Newest" : "Sort Cards: Newest to Oldest"}
                                                </p>
                                                </Row>

                                            </Col>
                                        <Row>
                                            {card_renders}
                                        </Row>
                                    </Col>
                                }
                                {(!this.state.platform_records || (this.state.platform_records.length === 0)) && 
                                
                                <ScaleLoader
                                    css={override}
                                    size={150}
                                    color={"#003358"}
                                    loading={true}
                                />
                                }
                            </Col>
                            <Col xs={12} id="pagination-section">
                                
                                {   this.state.active === "table" && 
                                    <Col xs={12} id="pagination-wrapper">
                                        <Col xs={12}>
                                    <Row className="justify-content-end">
                                        <Col className="record-index">
                                            <Row>
                                            <Col xs={12}>
                                                <p>Viewing {this.state.skip+1} - {(this.state.skip + this.state.limit) <= filtered_records.length? this.state.skip + this.state.limit: filtered_records.length} out of {filtered_records.length}</p>
                                            </Col>
                                            </Row>
                                        </Col>
                                        
                                        <Col xs={1} style={{"textAlign": "right", "display": "grid", "alignItems": "center", "justifyItems": "end"}}>
                                            <span>Showing</span>
                                        </Col>
                                        <Col xs={1}>
                                            <Col xs={12} className="filter-dropdown limit-dropdown" onClick={() => this.setState({"limit_dropdown": !this.state.limit_dropdown})}>
                                                {this.state.limit}
                                            </Col>
                                            <Collapse in={this.state.limit_dropdown}>
                                                <Col xs={12} className="filter-dropdown-panel limit-dropdown-options">
                                                    <Row>
                                                        {[10, 25, 50, filtered_records.length].map(num => <Col xs={12}><p onClick={() => this.setState({limit_dropdown: false, limit: num})}>{num === filtered_records.length? "All": num}</p></Col>)}
                                                    </Row>
                                                </Col>
                                                </Collapse>
                                        </Col>
                                        {(this.state.skip >= this.state.limit) && <Button onClick={(e) => {this.setState({skip: this.state.skip - this.state.limit})}}>Previous</Button> }
                                        {(this.state.skip + this.state.limit) < filtered_records.length && <Button onClick={(e) => {this.setState({skip: this.state.skip + this.state.limit})}}>Next</Button> }
                                    </Row>
                                    <Row>
                                    <Col  xs={12} className="download-csv">
                                                <CSVLink
                                                    data={filtered_records}
                                                    filename={"my-file.csv"}
                                                    className="btn btn-primary"
                                                    target="_blank">
                                                Download CSV
                                                </CSVLink>
                                            </Col>
                                    </Row>
                                    </Col>
                                </Col>
                                }
                                {
                                    this.state.active === "cards" && <>
                                    
                                <Col xs={12} id="pagination-wrapper">
                                    <Col xs={12}>     
                                    <Row className="justify-content-end">
                                        <Col className="record-index">
                                            <Row>
                                            <Col xs={12}>
                                                <p>Viewing {this.state.skip+1} - {(this.state.skip + this.state.limit) <= filtered_networks.length? this.state.skip + this.state.limit: filtered_networks.length} out of {filtered_networks.length}</p>
                                            </Col>
                                            </Row>
                                        </Col>
                                        
                                        <Col xs={1} style={{"textAlign": "right", "display": "grid", "alignItems": "center", "justifyItems": "end"}}>
                                            <span>Showing</span>
                                        </Col>
                                        <Col xs={1}>
                                            <Col xs={12} className="filter-dropdown limit-dropdown" onClick={() => this.setState({"limit_dropdown": !this.state.limit_dropdown})}>
                                                {this.state.limit}
                                            </Col>
                                            <Collapse in={this.state.limit_dropdown}>
                                                <Col xs={12} className="filter-dropdown-panel limit-dropdown-options">
                                                    <Row>
                                                        {[10, 25, 50, filtered_networks.length].map(num => <Col xs={12}><p onClick={() => this.setState({limit_dropdown: false, limit: num})}>{num===filtered_networks.length? "All": num}</p></Col>)}
                                                    </Row>
                                                </Col>
                                                </Collapse>
                                        </Col>

                                        {(this.state.skip >= this.state.limit) && <Button onClick={(e) => {this.setState({skip: this.state.skip - this.state.limit})}}>Previous</Button> }
                                        {(this.state.skip + this.state.limit) < filtered_networks.length && <Button onClick={(e) => {this.setState({skip: this.state.skip + this.state.limit})}}>Next</Button> }
                                    </Row>
                                    
                                    </Col>   
                                </Col>

                            
                                    </>
                                }
                            </Col>

                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Footer></Footer>
        </>
    }
}

export default Home