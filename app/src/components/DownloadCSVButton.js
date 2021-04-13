
import {CSVLink} from "react-csv";
import "../assets/stylesheets/download_csv.css"
function DownloadCSVButton(table)
{
    console.log(table)
    let {filteredRows} = table
    let data = filteredRows.map(row => row.original)
    return (
        <CSVLink className="download-csv-btn" data={data}>Download CSV</CSVLink>
    )
}

export default DownloadCSVButton