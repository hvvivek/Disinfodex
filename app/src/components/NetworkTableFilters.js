import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import Select, {components} from 'react-select'
import {useAsyncDebounce} from "react-table"

import "../assets/stylesheets/network_table_filters.css"

// This is a custom filter UI for selecting
// a unique option from a list
function DateColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {

    const [startDate, setStartDate] = useState(filterValue ? filterValue[0] : null)
    const [endDate, setEndDate] = useState(moment(filterValue ? filterValue[1] : null).format('YYYY-MM-DD'))
    const [expanded, expand] = useState(false)
    const minDate = '2017-01-01'
    // Calculate the options for filtering
    // using the preFilteredRows

    // Render a multi-select box
    return (
        <div style={{ "display": "flex" }} className="network-table-filters">
            <div className="date-filter-wrapper" onClick={() => expand(!expanded)}>
                {(startDate && endDate) ?
                    <p>{moment(startDate).format('DD-MMM-YY')} &rarr; {endDate ? moment(endDate).format('DD-MMM-YY') : moment().format('DD-MMM-YY')}</p>
                    :
                    <p style={{ "color": "hsl(0, 0%, 50%)", "width": "100%" }}>Select...</p>
                }
                {
                    (startDate && endDate) && <i class="fas fa-times" onClick={(e) => {e.stopPropagation(); setStartDate(null, setEndDate(null, setFilter([null, null])));  }}></i> 
                    
                }
            </div>
            {expanded &&
                <Modal show={expanded} onHide={() => expand(false)}>
                    <Modal.Header closeButton style={{ "border": "none" }}></Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => { e.preventDefault(); setFilter([startDate, endDate]); expand(false) }}>
                            <div className="date-range-picker" >
                                <div>
                                    <label for="start_date">Start Date</label>
                                    <input type="date"
                                        placeholder="Start Date"
                                        value={startDate}
                                        min={minDate}
                                        max={endDate}
                                        onChange={(e) => setStartDate(e.target.value)}></input>
                                </div>
                                <div>
                                    <label for="start_date">End Date</label>
                                    <input type="date"
                                        placeholder="End Date"
                                        value={endDate}
                                        min={startDate}
                                        max={moment().format('YYYY-MM-DD')}
                                        onChange={(e) => setEndDate(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="flex-container">
                                <button className="pagination-button" style={{ "marginBottom": "1rem" }} type="submit">Add Filter</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}


function BooleanColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    return (
        <div>
            <label htmlFor="screenshots">CONTAINS SCREENSHOTS &nbsp;</label>
            <input id="screenshots" onChange={(e) => { setFilter(e.target.checked) }} checked={filterValue} type="checkbox"></input>
        </div>
    )
}

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            row.values[id] && row.values[id].forEach(value => value && value.length > 0 && options.add(value))
        })
        return [...options.values()].sort()
    }, [id, preFilteredRows])

    let select_options = options.map((option, i) => {
        return { 'value': option, 'label': option }
    })

    const customStyles = {
        valueContainer: (provided, state) => ({
            ...provided,
            textOverflow: "ellipsis",
            maxWidth: "90%",
            // whiteSpace: "nowrap",
            // flexWrap: "nowrap",
            flexWrap: "wrap",
            display: "block",
            // "overflowX": "auto",
            "overflowY":"auto"
        }),
        multiValue: (provided, state) => ({
            ...provided,
            // textOverflow: "none",
            width: "max-content",
            display: "inline-flex"
        }),
        input: (provided, state) => ({
            ...provided,
            // textOverflow: "none",
            width: "max-content",
            display: "inline-flex"

        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            width: "1rem",
            height: "1rem",
            padding: "0px"

        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            width: "1rem",
            height: "1rem",
            padding: "0px"

        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            "display": "none"
        }),
        option: (provided, state) => ({
            ...provided,
            ":hover": {
                backgroundColor: "#cccccc"
            }
        })
    };

    const customOption = (props) => {
        return <components.Option {...props}>
            <input type={"checkbox"} style={{"marginRight":"0.5rem"}} checked={props.isSelected}/> {props.data.label}
        </components.Option>
    }
    // Render a multi-select box
    return (
        <Select value={filterValue}
            isMulti={true}
            styles={customStyles}
            hideSelectedOptions={false}
            components = {{Option: customOption}}
            onChange={e => {
                setFilter(e || undefined)
            }}
            options={select_options}>

        </Select>
    )
}

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    // const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span style={{"display":"flex", "alignItems":"center", "width":"100%", "justifyContent":"center"}}>

        <i className="fas fa-search" style={{
            "border": "1px solid #ced4da",
            "borderRight":"0px",
            "height":"100%",
            "padding":"1rem",
            "fontSize":"24px",
            "color":"#ced4da",
            "borderRadius":"5px 0px 0px 5px"
            }}></i>
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`Search the database`}
          className="search-bar"
          style={{
            fontSize: '1rem',
            border: "1px solid #ced4da",
            "borderRadius": "0px 5px 5px 0px",
            "padding": "1rem",
            "minWidth":"200px",
            // "width":"40%",
            "borderLeft":"0"
          }}
        />
      </span>
    )
  }

function NetworkTableFilters({
    headers, tableInstance
}) {
    return <div className="filters">
        {
            // Apply the header row props
            // Loop over the headers in each row
            headers.map(column => (
                column.canFilter ? <div key={column.Header} className={column.Header}>
                    {column.Header !== 'Screenshots' && <p>{column.Header.toUpperCase()}</p>}
                    {column.render('Filter')}
                </div> : null
            ))
        }
    </div>
}


function exists(rows, id, filterValue)
{
    return rows.filter(row => {
        const rowValue = row.values[id]
        return filterValue? rowValue && rowValue.length > 0: true
      })
}

function betweenDates(rows, id, filterValue)
{
    return rows.filter(row => {

        if(filterValue && filterValue[0] && filterValue[1])
        {

          let rowValue = row.values[id]
          if(rowValue)
          {
          rowValue = rowValue.map(val => moment(val))
          let minDate = moment.min(rowValue)
          let maxDate = moment.min(rowValue)
          if(moment(filterValue[0]) <= minDate && moment(filterValue[1]) >= maxDate)
          {
            return true
          }
          else
          {
            return false
          }
        }
        else
        {
          return false
        }
        }
        else
        {
          return true
        }
        

      })
}

function inArray(rows, id, filterValue)
{
    return rows.filter(row => {
        const rowValue = row.values[id]
        if(filterValue && filterValue.length > 0)
        {
        if(rowValue)
        {
          const filteredArray = filterValue.filter(filterOption => row.values[id].includes(filterOption.value))
          return filteredArray.length > 0
        }
        else
        {
            return false
        }
      }
      else
      {
          return true
      }
      })
}


function setFilter({props, value})
{
    let columnFilter = props.state.filters.filter(column => column.id === props.column.id)[0]

    if(columnFilter)
    {
        let values = columnFilter.value
        values.push({value: value, label: value})
        props.setFilter(props.column.id, values)
    }
    else{
        props.setFilter(props.column.id, [{value: value, label: value}])
    }
}

export {
    NetworkTableFilters,
    DateColumnFilter,
    SelectColumnFilter,
    BooleanColumnFilter,
    GlobalFilter,
    exists,
    betweenDates,
    inArray,
    setFilter
}