import CellDisclosureDate from "../components/CellRenderers/CellDisclosureDate"
import CellSource from "../components/CellRenderers/CellSource"
import CellOriginCountry from "../components/CellRenderers/CellOriginCountry"
import CellTargetCountry from "../components/CellRenderers/CellTargetCountry"
import CellNamedEntities from "../components/CellRenderers/CellNamedEntities"
import { BooleanColumnFilter, DateColumnFilter, SelectColumnFilter } from "../components/NetworkTableFilters"


const COLUMNS = [
    {
        Header          : "Source",
        accessor        : "Company Unique",
        Filter          : SelectColumnFilter,
        filter          : 'inArray',
        Cell            : CellSource
    },
    {
        Header          : "Disclosure Date",
        accessor        : "Dates",
        Filter          : DateColumnFilter,
        filter          : 'betweenDates',
        Cell            : CellDisclosureDate
    },
    {
        Header          : "Removal Types",
        accessor        : "Removal Type",
        Filter          : SelectColumnFilter,
        filter          : 'inArray',
        Cell            : props => { return <div>{props.value && props.value.toString()}</div> }
    },
    {
        Header          : "Origin Countries",
        accessor        : "Origin Countries Tagged",
        Filter          : SelectColumnFilter,
        filter          : 'inArray',
        Cell            : CellOriginCountry
    },
    {
        Header          : "Target Countries",
        accessor        : "Target Countries Tagged",
        Filter          : SelectColumnFilter,
        filter          : 'inArray',
        Cell            : CellTargetCountry,
    },
    {
        Header          : "Named Entities",
        accessor        : "Named Entities",
        Filter          : SelectColumnFilter,
        filter          : 'inArray',
        isVisible       : false,
        Cell            : CellNamedEntities
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
    }
]

export default COLUMNS