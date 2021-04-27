import React, { useEffect, useState } from 'react'
import { useTable, usePagination, useFilters, useSortBy, useGlobalFilter, useResizeColumns, useBlockLayout } from 'react-table'
import {NetworkTableFilters, GlobalFilter, exists, betweenDates, inArray} from './NetworkTableFilters'
import NetworkTablePagination from './NetworkTablePagination'
import COLUMNS from "../config/TABLE_VIEW"
import DataViewer from "./DataViewer"
import NetworkCardModal from "./NetworkCardModal"
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

    const defaultFilters = React.useMemo(
      () => props.filters, [props.filters]
  )
  // console.log("Default Filters", defaultFilters)

    const tableInstance = useTable(
      {
        columns, 
        data, 
        filterTypes, 
        initialState: 
          { 
            pageIndex : 0, 
            pageSize : 25, 
            hiddenColumns: ["Source Type", "Policy Violations", "Screenshots"],
            filters: defaultFilters
          }
      }, 
      useGlobalFilter,
      useFilters, 
      useSortBy,
      useBlockLayout, 
      usePagination,
      useResizeColumns
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
      
      // console.log("Instance Filters", tableInstance.state.filters)

    
    useEffect(() => {
      if(tableInstance.state.filters.length > 0 )
        {
          console.log(tableInstance.state.filters)
          props.setFilters(tableInstance.state.filters)
        }
      // props.setFilters(tableInstance.state.filters)
    })

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
                        <div {...{...headerGroup.getHeaderGroupProps(), style: {"width":"max-content", "display":"flex"}}} className="table-header-row">
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => {
                          // let width = column.getHeaderProps(column.getSortByToggleProps()).style.width
                          
                          // console.log(column.getHeaderProps(column.getSortByToggleProps()))
                          let headerProps = column.getHeaderProps(column.getSortByToggleProps())
                          let propWidth = headerProps.style.width
                          let width = propWidth

                          // let width = widths[headerProps.key.split("_").pop()] * 0.9 * window.innerWidth
                          // console.log(width)
                          // console.log(widths)
                          // console.log(0.9* window.innerWidth)
                          // console.log(headerProps)

                          return (
                            // Apply the header cell props
                            <div {...{...headerProps, style: {"width":width, "display":"inline-block", "boxSizing":"border-box", "position":"relative"}}} className={"table-header-cell " + column.Header}>
                            {// Render the header
                            column.render('Header')}
                            <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
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
                // console.log(row.getRowProps())
                return (
                    // Apply the row props
                    <div {...{...row.getRowProps(), style: {"width":"max-content", "display":"flex"}}} className="table-body-row" onClick={() => openNetworkCard(row)}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                        // Apply the cell props
                        // console.log({...cell.getCellProps(), style: {"width":"xx"}})
                        // let width = cell.getCellProps().style.width
                        let cellProps = cell.getCellProps()
                        let propWidth = cellProps.style.width
                        let width = propWidth

                        return (
                        <div {...{...cell.getCellProps(), style: {"width":width, "display":"inline-block", "boxSizing":"border-box", "position":"relative"}}} className={"table-body-cell " + cell.column.Header}>
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

export default NetworksTable