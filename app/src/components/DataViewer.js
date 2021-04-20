import SOURCES from "../config/SOURCE_TYPES"
import DownloadCSVButton from "./DownloadCSVButton"

const disclosureReducer = (accumulator, row) => {
    let disclosures = row.original["Platform Reports"]
    let network_id = row.original["Name"]
    let OSI_Sources = SOURCES.filter(source => source["type"] === "OSI")
    OSI_Sources = OSI_Sources.map(source => source["network_header"])

    if(disclosures && disclosures.length)
    {
      let source_identifier = network_id.split("-")[0]
      if(!OSI_Sources.includes(source_identifier))
      {
        return accumulator + disclosures.length
      }
    }
    return accumulator
  }
  // console.log(filteredRows)

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
          <p style={{"marginBottom":"0rem"}}><b>{filteredRows.length} Results</b> | Viewing {filteredRows.reduce(networkReducer, 0)} distinct networks across {filteredRows.reduce(disclosureReducer, 0)} disclosures</p>
          <DownloadCSVButton {...tableInstance} />
        </div>
    )
}

export default DataViewer