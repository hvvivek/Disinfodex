import CellDisclosureDate from "../components/CellRenderers/CellDisclosureDate"
import CellSource from "../components/CellRenderers/CellSource"
import CellNamedEntities from "../components/CellRenderers/CellNamedEntities"
import CellOriginCountry from "../components/CellRenderers/CellOriginCountry"
import CellTargetCountry from "../components/CellRenderers/CellTargetCountry"
import { BooleanColumnFilter, DateColumnFilter, SelectColumnFilter } from "../components/NetworkTableFilters"

const COLUMNS = [
        {
            Header          : "Network",
            accessor        : "Name",
            className       : 'network',
            disableFilters  : true,
            // disableSortBy   : true
        },
        {
            Header          : "Disclosure Date",
            accessor        : "Dates",
            Filter          : DateColumnFilter,
            filter          : 'betweenDates',
            Cell            : CellDisclosureDate
        },
        {
            Header          : "Source",
            accessor        : "Company",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellSource,
            disableSortBy   : true

        },
        {
            Header          : "Removal Types",
            accessor        : "Removal Type",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : props => { return <div>{props.value && props.value.toString()}</div> },
            disableSortBy   : true

        },
        {
            Header          : "Named Entities",
            accessor        : "Named Entities",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellNamedEntities,
            disableSortBy   : true

        },
        {
            Header          : "Origin Countries",
            accessor        : "Origin Countries Tagged",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellOriginCountry,
            disableSortBy   : true

        },
        {
            Header          : "Target Countries",
            accessor        : "Target Countries Tagged",
            Filter          : SelectColumnFilter,
            filter          : 'inArray',
            Cell            : CellTargetCountry,
            disableSortBy   : true

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