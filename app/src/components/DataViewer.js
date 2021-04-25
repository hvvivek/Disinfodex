import SOURCES from "../config/SOURCE_TYPES"
import DownloadCSVButton from "./DownloadCSVButton"
import NetworkSorter from "./NetworkSorter"
import "../assets/stylesheets/data_viewer.css"

const disclosureReducer = (accumulator, row) => {
    let disclosures = row.original["Platform Reports"]
    let dates = row.original["Dates"]

    let network_id = row.original["Name"]
    let OSI_Sources = SOURCES.filter(source => source["type"] === "OSI")
    OSI_Sources = OSI_Sources.map(source => source["network_header"])

    if(disclosures && disclosures.length)
    {
      let source_identifier = network_id.split("-")[0]
      if(!OSI_Sources.includes(source_identifier))
      {
        return accumulator + [...new Set(dates)].length
      }
    }
    return accumulator
  }

  const networkReducer = (accumulator, row) => {
    let network_id = row.original["Name"]
    let OSI_Sources = SOURCES.filter(source => source["type"] === "OSI")
    OSI_Sources = OSI_Sources.map(source => source["network_header"])
    if(network_id)
    {
      let source_identifier = network_id.split("-")[0]
      if(!OSI_Sources.includes(source_identifier))
      {
        accumulator = accumulator + 1
      }
      
    }

    return accumulator
  }


function removeSelectOption(columnId, columnValues, label, tableInstance)
{
  try {
    let newValues = columnValues.filter(option => option.label !== label)
    tableInstance.setFilter(columnId, newValues)

  } catch (error) {
    console.log(error)
    return null
  }
}

function getHeader(columnId, tableInstance)
{
  try {
    const columns = tableInstance.columns
    let filteredColumns = columns.filter(column => column.id === columnId)
    return filteredColumns[0].Header
  } catch (error) {
    console.log(error)
    return null
  }
}

function getFilterType(columnId, tableInstance)
{
  try {
    const columns = tableInstance.columns
    let filteredColumns = columns.filter(column => column.id === columnId)
    return filteredColumns[0]["filter"]
  } catch (error) {
    console.log(error)
    return null
  }
}

function getFilters(tableInstance)
{
  if(tableInstance && tableInstance.state.filters && tableInstance.state.filters.length > 0)
  {
    let spans = []
    let null_filters = []
    for(let i=0; i<tableInstance.state.filters.length; i++)
    {
      let filter = tableInstance.state.filters[i]
      let filter_type = getFilterType(filter.id, tableInstance)
      let filter_header = getHeader(filter.id, tableInstance)
      
      switch(filter_type)
      {
        case 'inArray': 
          null_filters.push({id: filter.id, value: []})

          for(let i=0; i<filter.value.length; i++)
          {
            spans.push(<span
              
               className={"filter-pill " + filter_header.toLowerCase().split(" ").join("-") + " " + filter.value[i].label.toLowerCase()}><p>{filter_header}: {filter.value[i].label}
               <i 
               onClick={(e) => {removeSelectOption(filter.id, filter.value, filter.value[i].label, tableInstance)}}
               className={"fas fa-times"} style={{"padding":"0.3rem", "borderRadius":"2rem", "fontSize":"0.7rem", "marginLeft":"1rem", "cursor":"pointer"}}></i>
               </p>

               </span>)
          }
          break
        case 'betweenDates': 
          null_filters.push({id: filter.id, value: []})
          filter.value.length>1 && spans.push(<span className="filter-pill dates"><p>{filter_header}: Between {filter.value[0]} - {filter.value[1]}</p></span>)
          break
        case 'exists': 
          null_filters.push({id: filter.id, value: undefined})

          if(filter.value)
          {
            spans.push(<span className="filter-pill screenshots"><p>{filter_header}: {filter.value.toString()}</p></span>)
          }
          break
        default: 
          break
        
      }
      // spans.push(<p>{getHeader(filter.id, tableInstance)}</p>)
    }

    
    return <div>{spans.length>0 && "Filtered to:"}{spans}{spans.length>0 && <p style={{color:"blue", "cursor":"pointer"}} onClick={() => tableInstance.setAllFilters(null_filters)}>Clear Filters</p>}</div>
  }
}

function DataViewer(props)
{
    let {
        tableInstance
    } = props

    let {
        filteredRows,
    } = tableInstance


    return(
        <div className="" style={{"display":"flex",  "justifyContent":"space-between", "marginBottom":"3rem", "alignItems":"center", "fontSize":"0.85rem"}}>
          <div>
            <p style={{"marginBottom":"0rem"}}><b>{filteredRows.length} Results</b> | Viewing {filteredRows.reduce(networkReducer, 0)} distinct networks across {filteredRows.reduce(disclosureReducer, 0)} disclosures</p>
            {<p>{getFilters(tableInstance)}</p>}
            <NetworkSorter {...{id: "Dates", ...tableInstance}}/>
          </div>
          <DownloadCSVButton {...tableInstance} />
        </div>
    )
}

export default DataViewer