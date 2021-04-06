import React, { useState } from 'react'
import { useTable, usePagination, useFilters, useFlexLayout } from 'react-table'

import "../assets/stylesheets/networks_table.css"


import CellDisclosureDate from './CellRenderers/CellDisclosureDate'
import CellSource from './CellRenderers/CellSource'
import CellNamedEntities from './CellRenderers/CellNamedEntities'
import CellTargetCountry from './CellRenderers/CellTargetCountry'
import CellOriginCountry from './CellRenderers/CellOriginCountry'

import {NetworkTableFilters, DateColumnFilter} from './NetworkTableFilters'
import NetworkTablePagination from './NetworkTablePagination'
import { Modal } from 'react-bootstrap'
import NetworkCard from './NetworkCard'
import {SelectColumnFilter, BooleanColumnFilter} from "./NetworkTableFilters"
import moment from 'moment'

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
        // <></>
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

function Table(props)
{

    const [isModalOpen, setModelOpen] = useState(false)
    const [currentNetwork, setCurrentNetwork] = useState(null)


    const openNetworkCard = (row_data) => {
      console.log(row_data)
      setCurrentNetwork(row_data)
      setModelOpen(true)
    }

    const data = React.useMemo(
        () => props.networks, [props.networks]
    )

    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
      )

      const filterTypes = React.useMemo(
        () => ({
          exists: (rows, id, filterValue) => {
            return rows.filter(row => {
              const rowValue = row.values[id]
              return filterValue? rowValue && rowValue.length > 0: true
            })
          },
          betweenDates: (rows, id, filterValue) => {
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
          },
          inArray: (rows, id, filterValue) => {
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
          },
        }),
        []
      )

    const columns = React.useMemo(
        () => [
            {
                Header: "Network",
                accessor: "Name",
                className: 'network',
                disableFilters: true
            },
            {
                Header: "Disclosure Date",
                accessor: "Dates",
                // disableFilters: true,
                Filter: DateColumnFilter,
                filter: 'betweenDates',
                Cell: CellDisclosureDate
            }
            ,
            {
                Header: "Source",
                accessor: "Company",
                Filter: SelectColumnFilter,
                filter: 'inArray',
                Cell: CellSource
            }
            ,
            /* TODO: Change mapping to platform */
            // {
            //     Header: "Platform",
            //     accessor: "Company"
            // },

            {
                Header: "Removal Types",
                accessor: "Removal Type",
                Filter: SelectColumnFilter,
                filter: 'inArray',
                Cell: props => { return <div>{props.value.toString()}</div>}
            },
            {
                Header: "Named Entities",
                accessor: "Named Entities",
                Filter: SelectColumnFilter,
                filter: 'inArray',
                Cell: CellNamedEntities
            },
            {
                Header: "Origin Countries",
                accessor: "Origin Countries Tagged",
                Filter: SelectColumnFilter,
                filter: 'inArray',
                Cell: CellOriginCountry
            },
            {
                Header: "Target Countries",
                accessor: "Target Countries Tagged",
                Filter: SelectColumnFilter,
                filter: 'inArray',
                Cell: CellTargetCountry,
                // isVisible: true

            },
            {
              Header: "Source Type",
              accessor: "Source Type",
              Filter: SelectColumnFilter,
              isVisible: false,
              filter: 'inArray',
              defaultCanFilter: true,
              Cell: () => <></>,
              // Header: () => <></>
              // Cell: props => { return <div>{props.value.toString()}</div>}
          },
          {
            Header: "Policy Violations",
            accessor: "Policy Violations",
            Filter: SelectColumnFilter,
            isVisible: false,
            filter: 'inArray',
            // Cell: props => { return <div>{props.value.toString()}</div>}
        },
        {
          Header: "Screenshots",
          accessor: "Screenshots",
          Filter: BooleanColumnFilter,
          isVisible: false,
          filter: 'exists',
          // Cell: props => { return <div>{props.value.toString()}</div>}
      }
        ], []
    )

    const tableInstance = useTable({ columns, data , filterTypes, defaultColumn, initialState: { pageIndex: 0, pageSize:5, hiddenColumns: ["Source Type", "Policy Violations", "Screenshots"] },}, useFilters, useFlexLayout, usePagination)
    // console.log(tableInstance)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        headers,
        // rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        // setPageSize,
        state: { pageIndex, pageSize },

        // visibleColumns,

      } = tableInstance


    return (
        <>
        <NetworkTableFilters {...{headers}}/>
        <div {...getTableProps()} className="table">
            {/* <colgroup>
                {headerGroups.map(headerGroups => headerGroups.headers.map(column => <col className="col-1" span="1" style={{"width": "10%"}}/>))}
            </colgroup> */}
            <div className="table-header">
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <div {...headerGroup.getHeaderGroupProps()} className="table-header-row">
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => {
                          // console.log(column)

                          return (
                            // Apply the header cell props
                            <div {...column.getHeaderProps()} className={"table-header-cell " + column.Header}>
                            {// Render the header
                            column.render('Header')}
                            {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                            </div>
                            )
                          })}
                        </div>
                    ))}
            </div>
                {/* Apply the table body props */}
            <div {...getTableBodyProps()} className="table-body">
                {// Loop over the table rows
                page.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <div {...row.getRowProps()} className="table-body-row" onClick={() => openNetworkCard(row.original)}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                        // Apply the cell props
                        return (
                        <div {...cell.getCellProps()} className={"table-body-cell " + cell.column.Header}>
                            {// Render the cell contents
                            cell.render('Cell')}
                        </div>
                        )
                    })}
                    </div>
                )
                })}
            </div>
        </div>
        {isModalOpen && <NetworkCardModal {...{isModalOpen, setModelOpen, currentNetwork}}/>}
        {/* <Modal show={isModalOpen} onHide={()=>setModelOpen(false)}>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
                <NetworkCard {...currentNetwork}/>
          </Modal.Body>
        </Modal> */}
        <NetworkTablePagination {...{
          pageSize,
          pageCount,
          canPreviousPage,
          canNextPage,
          previousPage,
          nextPage,
          gotoPage,
          pageOptions,
          pageIndex
        }}
        />
        </>
    )
}

function NetworkCardModal(props)
{
    let {isModalOpen, setModelOpen, currentNetwork} = props
      return <Modal show={isModalOpen} size="lg" onHide={()=>setModelOpen(false)} className="network-card">
          <Modal.Header closeButton>
            <h1>Network {currentNetwork.Name}</h1>
          </Modal.Header>
          <Modal.Body>
                <NetworkCard {...currentNetwork}/>
          </Modal.Body>
        </Modal>
}

export default Table