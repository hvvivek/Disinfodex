import "../assets/stylesheets/sorter.css"

function NetworkSorter({id, toggleSortBy, columns})
{
    const datesColumn = columns.filter(column => column.id === id)[0]
    // console.log(datesColumn)
    return (
        <div className="table-sorter" style={{"display":"flex", "justifyContent":"flex-end"}}>
            {datesColumn.isSortedDesc? 
                <p onClick={() => {datesColumn.toggleSortBy(false)}}><i className={"fas fa-sort-numeric-down"}>&nbsp;</i>Sort Networks: Oldest to Newest</p>
                :
                <p onClick={() => {datesColumn.toggleSortBy(true)}}><i className={"fas fa-sort-numeric-up"}>&nbsp;</i>Sort Networks: Newest to Oldest</p>
            }
        </div>
    )
}

export default NetworkSorter