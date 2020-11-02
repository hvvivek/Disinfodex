# Disinfodex

To make changes: `cd frontend` and `npm start`.


# Vivek to do (10/31)
### Page structure
- [x] About page bug: doesn’t seem to load
- [x] Contains Screenshots breaks after clicking missing “About” page (on the Database page)

### Cards
- [x] Deconflict duplicate content under Platform records (the Record based view is better) — keep the screenshots fixed but scroll the text record part
	- [x] Images: max-height: 300px; internal screenshots are 100% (bg can be like #c0c0c0)
	- [x] Keep left side of Network info the same
	- [x] Replace right side Description with pill link to Disclosure (opens to the individual disclosure pop-up)
	- [x] Put Description under Network etc.

### Dropdown selectors
- [x] Open only one dropdown at a time
- [x] Multiselect dropdown: change from toggle to right side check mark
- [x] Have x on selected items to remove dropdown

### Card view
- [x] Database needs a loading state for content
- [x] Clean up pagination CSS: make “Cards” view look more like Table view
- [x] Make cards sortable
- [x] Start with reverse chronological view for cards and the table (newest on top)

### Table view
- [x] Table: default to 25 rows
- [x] Change all links to pills (Network)



# Jenny to do (10/31)
- [x] Change the sans font to Frutiger 
- [x] Link the footer images out to each foundation
- [x] Dropshadow effect on all pill links (on hover, add drop shadow/slight color change on hover)
- [x] Card hover effect (drop shadow)
- [x] Change the link under the search bar to How it Works
- [x] Remove small divot next to Search box
- [x] Reduce padding/fix the “View as”
- [x] Add more padding-bottom to header
- [x] Date of Disclosure icon is clipped on the right side
- [x] Switch order of right hand menu - Database, About this Project (whitepaper), How It Works
- [x] General pass on font sizes
- [x] Redo style of platforms with no screenshots (center align logo, add text about dates, etc)
- [x] Mobile friendly responsive
- [x] Link to Assembly project page
- [x] Redo content of How It Works to be more user friendly (add screenshots of the respective sections, more graphics, visual styling to break up the page, etc)

## Final polish (11/1)

- [ ] [BUG] Network is missing in the disclosure pop-up
- [ ] [BUG] Add “close” button on individual disclosure pop-ups
- [ ] [BUG] Sorting in Table and Cards doesn’t seem to work
- [ ] [BUG] Only one pop-up should be open at a time (clicking through to a disclosure pop-up from network pop-up)
- [ ] [FR] Dismiss dropdown by clicking outside of the drop-down
- [ ] [FR] In mobile (xs-12) sizes on the cards, hide screenshots so it’s text only and clickable
- [ ] [FR] Add Target Country and Origin Country to the Card view (per network) — now added to Airtable’s Networks table


## V2
- [ ] Back-end content updating: use Mavo.io
- [ ] Make columns resizable

