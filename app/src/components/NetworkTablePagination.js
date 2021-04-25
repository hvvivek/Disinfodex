import "../assets/stylesheets/network_table_pagination.css"
import Select from "react-select"

const pageSizeOptions = [
    {"label":25, value:25},
    {"label":50, value:50},
    {"label":100, value:100},
    {"label":200, value:200},
]

function NetworkTablePagination(
    {
        pageSize,
        pageCount,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        gotoPage,
        pageOptions,
        pageIndex,
        setPageSize
    }
)
{
    
    const hasMoreThanNPages = pageCount > 4
    const currentPageGreaterThanOne = pageIndex > 0
    const isEllipsisRequired = pageIndex + 3 < pageCount

    let visiblePageOptions = pageOptions
    if(pageOptions.length > 4)
    {
        if(pageIndex > 2)
        {
            if(pageIndex + 3 <= pageOptions.length)
            {
                visiblePageOptions = pageOptions.slice(pageIndex-2, pageIndex + 3)
            }
            else
            {
                visiblePageOptions = pageOptions.slice(pageIndex-2, pageOptions.length)
            }
        }
        else
        {
            visiblePageOptions = pageOptions.slice(0, 5)
        }
    }

    return (
        <div className="flex-container" id="pagination" style={{justifyContent: "space-between"}}>
        <div>
            <div style={{"alignSelf":"flex-start"}}>Showing <span style={{"display":"inline-block", "minWidth":"125px", "paddingLeft":"1rem", "paddingRight":"1rem"}}><Select options={pageSizeOptions} value={{label: pageSize, value:pageSize}} onChange={(e) => setPageSize(e.value)} /></span> results per page</div>
        </div>
        <div className="pagination-wrapper">
          <button className="pagination-button" onClick={previousPage} disabled={!canPreviousPage}>← Previous</button>
          
          {hasMoreThanNPages? 
          <p className="go-to-page-wrapper">
              {currentPageGreaterThanOne && <span className="go-to-page">...</span>}

              {/* {pageIndex > 2 && <>
                {[...Array(4)].map((e, i) => <span className={i == 1? "go-to-page active": "go-to-page"}
                                                    onClick={gotoPage(pageIndex + i -1)}>{pageIndex + i -1}</span>)}
              </>} */}

         
                {visiblePageOptions.map(e => <span key={e} className={e === pageIndex? "go-to-page active": "go-to-page"}
                onClick={() => gotoPage(e)}>{e+1}</span>)}
                


              {/* {[...Array(4)].map((e, i) => <span 
                                                className={i == 0? "go-to-page active": "go-to-page"}
                                                onClick = {pageIndex > 2? () => gotoPage(pageIndex + -2 + i): () => gotoPage(pageIndex + i)}
                                                >{pageIndex > 2? pageIndex + i -2 : pageIndex + i+1}</span>)}  */}
              {isEllipsisRequired && <span className="go-to-page">...</span>}
              </p>
          :
          <p className="go-to-page-wrapper">
              {[...Array(pageCount)].map((e, i) => <span 
                                                        className="go-to-page"
                                                        onClick={() => gotoPage(pageIndex + i)}>{pageIndex + i+1}</span>)}
              </p>
        }

          <button className="pagination-button" onClick={nextPage} disabled={!canNextPage}>Next →</button>
        </div>
          

        </div>
    )
}

export default NetworkTablePagination