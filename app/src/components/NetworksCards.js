import React, { useContext, useState, useEffect } from 'react'
import { useTable, usePagination, useFilters, useFlexLayout, useSortBy, useGlobalFilter } from 'react-table'

import "../assets/stylesheets/networks_cards.css"

import {NetworkTableFilters, GlobalFilter, exists, betweenDates, inArray} from './NetworkTableFilters'
import NetworkTablePagination from './NetworkTablePagination'
import { Modal } from 'react-bootstrap'
import NetworkCard from './NetworkCard'
import DataContext from '../contexts/DataContext'
import ScreenshotCarousel from './ScreenshotCarousel'
import COLUMNS from '../config/CARD_VIEW'
import DataViewer from "./DataViewer"

function Table(props)
{

    const [isModalOpen, setModelOpen] = useState(false)
    const [currentNetwork, setCurrentNetwork] = useState(null)
  console.log(props.filters)

    const openNetworkCard = (row_data) => {
      // console.log(row_data)
      setCurrentNetwork(row_data)
      setModelOpen(true)
    }

    const data = React.useMemo(
        () => props.networks, [props.networks]
    )
      
    const filterTypes = React.useMemo(() => ({exists, betweenDates,inArray}),[])

    const columns = React.useMemo(
        () => COLUMNS, []
    )

    const defaultFilters = React.useMemo(
      () => props.filters, [props.filters]
  )
  
  console.log("Default Filters", defaultFilters)
    const tableInstance = useTable(
      { 
        columns, 
        data , 
        filterTypes, 
        // defaultColumn, 
        initialState: { 
              pageIndex: 0, 
              pageSize:25, 
              hiddenColumns: ["Source Type", "Policy Violations", "Screenshots"], 
              filters: defaultFilters
            }
      }, 
      useGlobalFilter, 
      useFilters,
      useSortBy, 
      useFlexLayout, 
      usePagination)

    
    // console.log(tableInstance)
    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headers,
        page,
        state: { pageIndex, pageSize },
      } = tableInstance
    
      console.log("Instance Filters", tableInstance.state.filters)
      useEffect(() => {
        if(tableInstance.state.filters.length > 0 )
        {
          console.log(tableInstance.state.filters)
          props.setFilters(tableInstance.state.filters)
        }
      })
    const {screenshots} = useContext(DataContext)

    

    return (
        <>
        <div className="" style={{"display":"flex", "alignItems":"center", "marginTop":"2rem", "marginBottom":"4rem", "flexDirection":"column"}}>
          <GlobalFilter {...tableInstance}/>
          <a href="/how-to" style={{"marginTop":"1.5rem"}}>Learn more about how the data is reported</a>
        </div>
        <NetworkTableFilters {...{headers, tableInstance}}/>
        <DataViewer {...{tableInstance}} />
        {/* <NetworkSorter {...{id: "Dates", ...tableInstance}}/> */}
        <div {...getTableProps()} className="table">
            <div {...getTableBodyProps()} className="card-body">
                {// Loop over the table rows
                page.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <div  key={Math.random()} className="card-body-row" >
                    <div>
                      <div className="screenshots">
                          {/* <p>Screenshots</p> */}
                          <ScreenshotCarousel {...{row: row["original"], card: row, openNetworkCard}}/>
                      </div>

                      <div className="content" onClick={() => openNetworkCard(row)}>
                      {row.cells.map(cell => {
                          // Apply the cell props
                          return (
                          <div key={Math.random()} className={"card-body-cell " + cell.column.Header}>
                            {/* {console.log(cell)} */}
                              <p className="sub-title">{cell.render('Header').toUpperCase()}</p>
                              {// Render the cell contents
                              cell.render('Cell')}
                          </div>
                          )
                      })}
                      </div>
                    </div>
                    </div>
                )
                })}
            </div>
        </div>
        {isModalOpen && <NetworkCardModal {...{isModalOpen, setModelOpen, currentNetwork, screenshots}}/>}
        {/* <Modal show={isModalOpen} onHide={()=>setModelOpen(false)}>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
                <NetworkCard {...currentNetwork}/>
          </Modal.Body>
        </Modal> */}
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
            <h1>Network {currentNetwork.original.Name}</h1>
          </Modal.Header>
          <Modal.Body>
                <NetworkCard {...{...currentNetwork.original}}/>
          </Modal.Body>
        </Modal>
}

export default Table