import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'

import "../assets/stylesheets/network_table_filters.css"

// This is a custom filter UI for selecting
// a unique option from a list
function DateColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {

    const [startDate, setStartDate] = useState(filterValue? filterValue[0]: null)
    const [endDate, setEndDate] = useState(moment(filterValue? filterValue[1]: null).format('YYYY-MM-DD'))
    const [expanded, expand] = useState(false)

    // Calculate the options for filtering
    // using the preFilteredRows

    // Render a multi-select box
    return (
        <div style={{"display":"flex"}} className="network-table-filters">
            <div className="date-filter-wrapper" onClick={() => expand(!expanded)}>
                {startDate? 
                <p>{moment(startDate).format('DD-MMM-YY')} &rarr; {endDate? moment(endDate).format('DD-MMM-YY'): moment().format('DD-MMM-YY')}</p>
                :
                <p style={{"color":"hsl(0, 0%, 50%)", "width":"100%"}}>Select...</p>
            }
            </div>
            {expanded && 
            <Modal show={expanded} onHide={() => expand(false)}>
                <Modal.Header closeButton style={{"border":"none"}}></Modal.Header>
                <Modal.Body>
                <form onSubmit={(e) => {e.preventDefault(); setFilter([startDate, endDate])}}>
                <div className="date-range-picker" >
                <div>
                    <label for="start_date">Start Date</label>
                    <input type="date" 
                            placeholder="Start Date"
                            value={startDate}
                            max={endDate}
                            onChange={(e) => setStartDate(e.target.value)}></input>
                </div>
                <div>
                    <label for="start_date">End Date</label>
                    <input type="date" 
                            placeholder="End Date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}></input>
                </div>
                </div>
                <div className="flex-container">
                <button className="pagination-button" style={{"marginBottom":"1rem"}} type="submit">Add Filter</button>
                </div>
                </form>
                </Modal.Body>
            </Modal>
            }
        </div>
    )
  }


function BooleanColumnFilter({column: { filterValue, setFilter, preFilteredRows, id }})
{
    return (
        <div>
            <label htmlFor="screenshots">Contains Screenshots</label>
            <input id="screenshots" onChange={(e) => {console.log(e.target.checked); setFilter(e.target.checked)}} checked={filterValue} type="checkbox"></input>
        </div>
    )
}

function SelectColumnFilter({
column: { filterValue, setFilter, preFilteredRows, id },
}) {
const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
    row.values[id] && row.values[id].forEach(value => value && value.length>0 && options.add(value))
    })
    return [...options.values()].sort()
}, [id, preFilteredRows])

let select_options = options.map((option, i) => {
    return {'value': option, 'label': option}
})

const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "90%",
      whiteSpace: "nowrap",
    //   overflow: "hidden",
    //   display: "initial",
      flexWrap: "nowrap",
      display: "block",
      "overflowX": "scroll"
    }),
    multiValue: (provided, state) => ({
        ...provided,
        // textOverflow: "none",
        width: "max-content",
        display:"inline-flex"
    }),
    input: (provided, state) => ({
        ...provided,
        // textOverflow: "none",
        width: "max-content",
        display:"inline-flex"

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
    control: (provided, state) => ({
        ...provided,
        // "display": "block"
    })
  };

// Render a multi-select box
return (
<Select value={filterValue} 
        isMulti={true} 
        styles={customStyles}
        onChange={e => {
            console.log(e)
            setFilter(e || undefined)
        }} 
        options={select_options}>
        
        </Select>
)
}

function NetworkTableFilters({
    headers
})
{
    return <div className="filters">

            {
                        // Apply the header row props
                        // Loop over the headers in each row
                        headers.map(column => (
                            column.canFilter ? <div key={column.Header} className={column.Header}>
                                {column.Header !== 'Screenshots' && <p>{column.Header}</p>}
                                {column.render('Filter')}
                            </div>: null
                        ))
            }
            </div>
}

export  {
    NetworkTableFilters,
    DateColumnFilter,
    SelectColumnFilter,
    BooleanColumnFilter
}