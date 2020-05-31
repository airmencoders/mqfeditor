## 0.21.0
- `QuestionEdit` uses a default value for the question parameter, able to be reused for `MQFEdit` and `MQFCreate`
- TODO: Implement saving the new MQF
- TODO: Implement the add question, add option, and delete question, and delete options for the `QuestionEdit` component

## 0.20.0
- Used `React.useRef` for MDS and Name in `MQFEdit` and `MQFCreate`
- Implemented the `TestDetails` component in `MQFEdit` and `MQFCreate`
- Began work on reusing the `QuestionEdit` component in the `MQFCreate` page
- ~~TODO: Modify `QuestionEdit` so that it can be blank or take a question~~

## 0.19.0
- Moved Test Details from `/src/pages/MQFEdit` to own component for reusability
- ~~TODO: Fix references passed to children in `MQFEdit`~~

## 0.18.0
- Added ability to delete MQF

## 0.17.0
- Removed `pdfjs-dist` package and prune `npm` dependencies
- Removed `create-react-app` default test files
- Bump version in `package.json`
- Use `Save` FAB in `MQFEdit`
- Remove stepper from `MQFCreate` and just use cards similar to `MQFEdit`

## 0.16.0
- Added MQF statistics and Question statistics to `/src/pages/Dashboard` and `/src/pages/MQFStudy`.
- Statistics are held within the local state (eventually to get pushed to database on a `componentWillUnmount` lifecycle)

## 0.15.0
- Install `@material-ui/lab` from NPM
- Code Cleanup
- TODO: Implement `@material-ui/lab/Skeleton` once backend and API are functioning
- ~~TODO: Implement a way to not allow skipping of `MDS` and `Name` in `/src/pages/MQFCreate`~~
- ~~TODO: Implement a way to parse PDF - might require server side~~

## 0.14.0
- Continued work on `/src/pages/MQFCreate`
- TODO: Find a Javascript PDF Parser
- Began work on abstracting out state / components

## 0.13.0
- Standardized all cards to be `variant='outlined'`
- Code cleanup
- Implemented Stepper for `/src/pages/MQFCreate` 
- ~~TODO: Stepper unmounts TextFields which clears the reference - need permanent reference, maybe using state.~~

## 0.12.0
- Began scaffolding `/src/pages/MQFCreate`

## 0.11.1
- Changed `/src/MQFTest` to display all questions on the same page, this remedies the issue where the radio buttons were being reused by React

## 0.11.0
- Fixed bug where question number indexes reference '0' array index instead of standard counting
- Added delay to `/App/handleMQFSeen()` so that badge animation still shows on rendering a new page
- Created `/src/MQFTest`
- ~~TODO: `/src/MQFTest` does not properly render options. rather, it keeps the previous question selected when rendering the new question~~

## 0.10.1
- Fixed bug affecting render latency when flipping study card
- Seems to occur when card height is different between cards (Potential issue with package)

## 0.10.0
- Implemented random question studying (Need peer review to see if there's a better way to do it)

## 0.9.0
- Remove questions from MQF Overview - make room for trend data
- Installed `react-flip-card` from `npm`, allows for CSS transformations to look like flip card
- Implemented `MQFStudy`, currently only studies 'flashcard' style in order.
- TODO: Vertically center answer on flashcard
- ~~TODO: Implement an option for random order studying (using `react-router` url query?) - require extra 'state'~~
- ~~TODO: Implement `MQFTest` (will always be in random order)~~
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
- ~~@todo: Add Meta viewport to `/public/index.html` to avoid inital scale on mobile~~
- Commit `/public/`
- Update `package.json` and `package-lock.json`

## 0.2.0
- Updated mock state for handling authentication
- Created dummy pages for handling the creation, editing, managing, studying, and testing of MQFs
- ~~@todo: Styling and futher development~~

## 0.1.0
- Initial Commit