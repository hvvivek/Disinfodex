# Disinfodex

## Configuration

### a. Table View

The configuration for the table view is available here: [Table View Config](https://github.com/hvvivek/Disinfodex/blob/master/app/src/config/TABLE_VIEW.js)

Each column at most needs the following fields:
| Field           | Data Type       | Description                                                         |
|-----------------|:---------------:|---------------------------------------------------------------------|
| Header          | String          | This is the column header displayed in the table                    | 
| accessor        | String          | This is the name of the column in Airtable to be mapped to,         | 
| Filter          | Function        | Optional - The function that will be used to create the filter feature for this column. Select from defaults SelectColumnFilter, DateColumnFilter, BooleanColumnFilter or create your own at [Link](https://github.com/hvvivek/Disinfodex/blob/master/app/src/components/NetworkTableFilters.js)                  | 
| filter          | Enum            | Optional - The value indicates the logic behind the filter. Select from defaults 'inArray', 'betweenDates', 'exists'| 
| Cell            | React Component | Optional - This is a custom react component used to display the value,         | 
| disableSortBy   | Boolean         | Optional - Can be used to enable/disable sort functionality on a column        | 
| width           | Number          | Optional - Default column width                                                | 
| minWidth        | Number          | Optional - Minimum column width. You cannot resize a column smaller than this  | 
| isVisible       | Boolean         | Optional - Can be used to hide a field from the table. Hidden fields can still be used to filter |

### b. Card View

The configuration for the card view is available here: [Card View Config](https://github.com/hvvivek/Disinfodex/blob/master/app/src/config/CARD_VIEW.js)

Each field in the card at most needs the following fields:
| Field           | Data Type       | Description                                                         |
|-----------------|:---------------:|---------------------------------------------------------------------|
| Header          | String          | This is the header displayed in the card above the value            | 
| accessor        | String          | This is the name of the column in Airtable to be mapped to,         | 
| Filter          | Function        | Optional - The function that will be used to create the filter feature for this column. Select from defaults SelectColumnFilter, DateColumnFilter, BooleanColumnFilter or create your own at [Link](https://github.com/hvvivek/Disinfodex/blob/master/app/src/components/NetworkTableFilters.js)                  | 
| filter          | Enum            | Optional - The value indicates the logic behind the filter. Select from defaults 'inArray', 'betweenDates', 'exists'| 
| Cell            | React Component | Optional - This is a custom react component used to display the value,         |
| isVisible       | Boolean         | Optional - Can be used to hide a field from the card. Hidden fields can still be used to filter |

### c. Source

When a new source is added, they do not need to be individually configured unless:
- The source is a OSI
- The source needs a custom logo and/or color

To update the logos, upload a new image into the logos folder under assets - [Link](https://github.com/hvvivek/Disinfodex/tree/master/app/src/assets/images/source_logos). And then update the logos config [here](https://github.com/hvvivek/Disinfodex/blob/master/app/src/config/COMPANY_LOGOS.js)

To update the OSIs, head over [here](https://github.com/hvvivek/Disinfodex/blob/master/app/src/config/SOURCE_TYPES.js) to add a new source as a OSI 
