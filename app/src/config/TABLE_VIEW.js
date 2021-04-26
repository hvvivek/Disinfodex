import CellDisclosureDate from "../components/CellRenderers/CellDisclosureDate"
import CellSource from "../components/CellRenderers/CellSource"
import CellNamedEntities from "../components/CellRenderers/CellNamedEntities"
import CellOriginCountry from "../components/CellRenderers/CellOriginCountry"
import CellTargetCountry from "../components/CellRenderers/CellTargetCountry"
import { BooleanColumnFilter, DateColumnFilter, SelectColumnFilter } from "../components/NetworkTableFilters"


const widths = {
    "Name"                      :0.10 * 0.9 * window.innerWidth,
    "Dates"                     :0.10 * 0.9 * window.innerWidth,
    "Company Unique"            :0.13 * 0.9 * window.innerWidth,
    "Removal Type"              :0.15 * 0.9 * window.innerWidth,
    "Named Entities"            :0.22 * 0.9 * window.innerWidth,
    "Origin Countries Tagged"   :0.15 * 0.9 * window.innerWidth,
    "Target Countries Tagged"   :0.15 * 0.9 * window.innerWidth
}

const minWidths = {
    "Name"                      :150,
    "Dates"                     :150,
    "Company Unique"            :200,
    "Removal Type"              :225,
    "Named Entities"            :300,
    "Origin Countries Tagged"   :225,
    "Target Countries Tagged"   :225
}


const COLUMNS = [
        {
            Header          : "Network",
            accessor        : "Name",
            className       : 'network',
            disableFilters  : true,
            disableSortBy   : true,
            width           : widths["Name"],
            minWidth        : minWidths["Name"],
            
        },
        {
            Header          : "Disclosure Date",
            accessor        : "Dates",
            Filter          : DateColumnFilter,
            filter          : 'betweenDates',
            Cell            : CellDisclosureDate,
            width           : widths["Dates"],
            minWidth        : minWidths["Dates"]
        },
        {
            Header          : "Source",
            accessor        : "Company Unique",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellSource,
            disableSortBy   : true,
            width           : widths["Company Unique"],
            minWidth        : minWidths["Company Unique"]

        },
        {
            Header          : "Removal Types",
            accessor        : "Removal Type",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : props => { return <div>{props.value && props.value.toString()}</div> },
            disableSortBy   : true,
            width           : widths["Removal Type"],
            minWidth        : minWidths["Removal Type"]

        },
        {
            Header          : "Named Entities",
            accessor        : "Named Entities",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellNamedEntities,
            disableSortBy   : true,
            width           : widths["Named Entities"],
            minWidth        : minWidths["Named Entities"]

        },
        {
            Header          : "Origin Countries",
            accessor        : "Origin Countries Tagged",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellOriginCountry,
            disableSortBy   : true,
            width           : widths["Origin Countries Tagged"],
            minWidth        : minWidths["Origin Countries Tagged"]

        },
        {
            Header          : "Target Countries",
            accessor        : "Target Countries Tagged",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellTargetCountry,
            disableSortBy   : true,
            width           : widths["Target Countries Tagged"],
            minWidth        : minWidths["Target Countries Tagged"]

        },
        {
            Header          : "Source Type",
            accessor        : "Source Type",
            Filter          : SelectColumnFilter,
            isVisible       : false,
            filter          : 'inArray',
            defaultCanFilter: true
        },
        {
            Header          : "Policy Violations",
            accessor        : "Policy Violations",
            Filter          : SelectColumnFilter,
            isVisible       : false,
            filter          : 'inArray',
            // Cell: props => { return <div>{props.value.toString()}</div>}
        },
        {
            Header          : "Screenshots",
            accessor        : "Screenshots",
            Filter          : BooleanColumnFilter,
            isVisible       : false,
            filter          : 'exists',
            // Cell: props => { return <div>{props.value.toString()}</div>}
        }
    ]

export default COLUMNS