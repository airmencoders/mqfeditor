## 0.9.0
- Remove questions from MQF Overview - make room for trend data
- Installed `react-flip-card` from `npm`, allows for CSS transformations to look like flip card
- Implemented `MQFStudy`, currently only studies 'flashcard' style in order.
- TODO: Vertically center answer on flashcard
- TODO: Implement an option for random order studying (using `react-router` url query?) - require extra 'state'
- TODO: Implement `MQFTest` (will always be in random order)
- TODO: Implement User Account page
- TODO: Implement `MQFCreate` page (PDF Import, parse, JSON Generation add to state / database through API Endpoints) as well as manual
- FEATURE: Potential for 'private' vs. 'public' tests?

## 0.8.0
- Finished MQF Save functionality
- Need to add modification of questions (add / remove options)
- Need to add / remove questions
- Changed `array.filter` to finding index for current array for readability
- Fixed bug where saving a test would change order in `SideMenu`

## 0.7.0
- Added function to update state of tests when clicking `save` FAB in `MQFEdit`

## 0.6.0
- Added border to `Login` CAC Image
- Began adding file headers to files
- Updated `ScrollToTop` bottom style to be calculated depending on the order
- Moved the `Add MQF` FAB from the `SideMenu` to the `Dashboard` - This means that you can only add an MQF from the dashboard, but better aligns with Material Style Guidelines
- Updated property names
- Added template pages for `MQFNew`, `MQFStudy`, `MQFTest`, & `UserAccount`
- Began work on `MQFEdit` page

## 0.5.0
- Added `ScrollToTop` component to render a FAB to scroll to top of window
- Added `hasScrolled` to App state
- Added `scroll` event listeners to `document` in `componentDidMount` and removed listener in `componentWillUnmount`
- Added `toggleVisibility` function in `App` class, passing to components using the `ScrollToTop` component
- Began work on page template for `MQFTest` - Expect work in future for testing, grading, and saving trend data

## 0.4.0
- Added `README.md`

## 0.3.0
- Continued work on `/src/MQFOverview`
- Moved sidebar navigation to own Component
- @todo: Add Meta viewport to `/public/index.html` to avoid inital scale on mobile
- Commit `/public/`
- Update `package.json` and `package-lock.json`

## 0.2.0
- Updated mock state for handling authentication
- Created dummy pages for handling the creation, editing, managing, studying, and testing of MQFs
- @todo: Styling and futher development

## 0.1.0
- Initial Commit