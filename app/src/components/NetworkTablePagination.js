import "../assets/stylesheets/network_table_pagination.css"




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
        pageIndex
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
        <div className="flex-container" style={{justifyContent: "space-between"}}>
        <div>
            <p style={{"alignSelf":"flex-start"}}>Showing {pageSize} results per page</p>
        </div>
        <div style={{}}>
          <button className="pagination-button" onClick={previousPage} disabled={!canPreviousPage}>← Previous</button>
          
          {hasMoreThanNPages? 
          <p className="go-to-page-wrapper">
              {currentPageGreaterThanOne && <span className="go-to-page">...</span>}

              {/* {pageIndex > 2 && <>
                {[...Array(4)].map((e, i) => <span className={i == 1? "go-to-page active": "go-to-page"}
                                                    onClick={gotoPage(pageIndex + i -1)}>{pageIndex + i -1}</span>)}
              </>} */}

         
                {visiblePageOptions.map(e => <span className={e === pageIndex? "go-to-page active": "go-to-page"}
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