let dateSorter = (rowA, rowB, columnId, desc) => {
    const datesA = rowA["original"] && rowA["original"]["Dates"]? rowA["original"]["Dates"]: []
    const datesB = rowB["original"] && rowB["original"]["Dates"]? rowB["original"]["Dates"]: []

    let dateA = null
    let dateB = null

    for(let i=0; i<datesA.length; i++)
    {
        if(!dateA || new Date(datesA[i]).getTime() > dateA.getTime())
        {
            dateA = new Date(datesA[i])
        }
    }

    for(let i=0; i<datesB.length; i++)
    {
        if(!dateB || new Date(datesB[i]).getTime() > dateB.getTime())
        {
            dateB = new Date(datesB[i])
        }
    }

    if(!dateA) dateA = new Date("2016-01-01")
    if(!dateB) dateB = new Date("2016-01-01")

    return dateA.getTime() > dateB.getTime()? 1:-1
}

export {
    dateSorter
}