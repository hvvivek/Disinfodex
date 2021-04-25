import React, { useState } from 'react'
import { useTable, usePagination, useFilters, useFlexLayout, useSortBy, useGlobalFilter } from 'react-table'
import {NetworkTableFilters, GlobalFilter, exists, betweenDates, inArray} from './NetworkTableFilters'
import NetworkTablePagination from './NetworkTablePagination'
import { Modal } from 'react-bootstrap'
import NetworkCard from './NetworkCard'
import COLUMNS from "../config/TABLE_VIEW"
import DataViewer from "./DataViewer"
import "../assets/stylesheets/networks_table.css"

function NetworksTable(props)
{

    const [isModalOpen, setModelOpen] = useState(false)
    const [currentNetwork, setCurrentNetwork] = useState(null)

    // Initialize table
    const data = React.useMemo(() => props.networks, [props.networks])
    const filterTypes = React.useMemo(() => ({exists, betweenDates,inArray}),[])
    const columns = React.useMemo(() => COLUMNS, [])


    const openNetworkCard = (row_data) => {
      setCurrentNetwork(row_data)
      setModelOpen(true)
    }
    
    const tableInstance = useTable(
      {
        columns, 
        data, 
        filterTypes, 
        initialState: 
          { 
            pageIndex : 0, 
            pageSize : 25, 
            hiddenColumns: ["Source Type", "Policy Violations", "Screenshots"] 
          }
      }, 
      useGlobalFilter,
      useFilters, 
      useSortBy,
      useFlexLayout, 
      usePagination
    )
    
    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        headers,
        page,
        state: { pageIndex, pageSize },
      } = tableInstance

      

    return (
        <>
        <div className="" style={{"display":"flex", "alignItems":"center", "marginTop":"2rem", "marginBottom":"4rem", "flexDirection":"column"}}>
          <GlobalFilter {...tableInstance}/>
          <a href="/how-to" style={{"marginTop":"1.5rem"}}>Learn more about how the data is reported</a>
        </div>
        <NetworkTableFilters {...{headers, tableInstance}}/>
        <DataViewer {...{tableInstance}}/>
        <div {...getTableProps()} className="table">
            <div className="table-header" style={{"width":"auto"}}>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <div {...headerGroup.getHeaderGroupProps()} className="table-header-row">
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => {
                          // console.log(column)

                          return (
                            // Apply the header cell props
                            <div {...column.getHeaderProps(column.getSortByToggleProps())} className={"table-header-cell " + column.Header}>
                            {// Render the header
                            column.render('Header')}
                            <span className={column.isSorted? "active": ""}>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? '↓'
                                  : '↑'
                                : ''}
                            </span>
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
        <NetworkTablePagination {...{...tableInstance, pageIndex, pageSize}}
        />
        </>
    )
}

function NetworkCardModal(props)
{
    let {isModalOpen, setModelOpen, currentNetwork} = props
      return <Modal animation={false} show={isModalOpen} size="lg" onHide={()=>setModelOpen(false)} className="network-card">
          <Modal.Header closeButton>
            <h1>Network {currentNetwork.Name}</h1>
          </Modal.Header>
          <Modal.Body>
                <NetworkCard {...currentNetwork}/>
          </Modal.Body>
        </Modal>
}

export default NetworksTable