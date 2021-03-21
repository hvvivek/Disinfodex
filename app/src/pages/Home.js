import React from 'react'
import { useTable, usePagination } from 'react-table'

function Table(props)
{
    // console.log(props)

    const data = React.useMemo(
        () => props.disclosures
    )

    const columns = React.useMemo(
        () => [
            {
                Header: "Disclosure Date",
                accessor: "DISCLOSURE_DATE"
            },
            {
                Header: "Company",
                accessor: "COMPANY" 
            }
            ,
            {
                Header: "Network",
                accessor: "NETWORK_ID"
            }
        ], []
    )

    const tableInstance = useTable({ columns, data,initialState: { pageIndex: 1 },
    },
        usePagination)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
      } = tableInstance

    return (
        <>
        <table {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => (
                            // Apply the header cell props
                            <th {...column.getHeaderProps()}>
                            {// Render the header
                            column.render('Header')}
                            </th>
                        ))}
                        </tr>
                    ))}
            </thead>
                {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                page.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                        // Apply the cell props
                        return (
                        <td {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
        </table>
        {canNextPage && <button onClick={nextPage}>Next Page</button>}
        {canPreviousPage && <button onClick={previousPage}>Previous Page</button>}
        </>
    )
}

class Home extends React.Component
{
    render()
    {
        return <Table {...this.props.data}></Table>
    }
}

export default Home