## 0.29.1
* Changed `MenuIcon` breakpoint in `ResponsiveNavigation` component from `md` to `sm`

## 0.29.0
* Added `Add Figure` Button to `QuestionEdit` component
* TODO: logic to upload image and attach to question
* TODO: logic to overwrite / delete image from question

## 0.28.2
* Add class for `Typography` components in `MQFStudy` and `MQFTest` to properly show new lines
* Added new Tests

## 0.28.1
* UI Fix for cards in `MQFTest`

## 0.28.0
* Changed the React state to have a ternary operation for the `hasNext` State in `MQFEdit` making the visual glitch not occur (loads and immediately hides buttons)
* Changed UX in `MQFTest` to have the same type of 'flash card' view rather than a long test (similar to PEX testing - 1 question at a time)
* Added ternary operation in `MQFStudy` and `MQFTest` to only show the cards once the random order has been selected. This avoids a visual glitch where the default order (`0` through `questions.length`) is first shown and then changes once the randomization occurs after render (due to `React.useEffect`, like `ComponentDidMount` being called after rendering)
* Changed `Previous` and `Next` Buttons to be normal buttons inside the card in `MQFTest` rather than Floating Action Buttons.
* Potential to change `Previous` and `Next` Buttons in `MQFStudy` and `MQFEdit` to be similar to `MQFTest`
* Created `QuestionResult` component to handle the review and scoring of test results
* TODO: Code cleanup
* TODO: Button Changes
* TODO: Creation of backend, database, API Endpoints
* TODO: Integrate API calls to frontend

## 0.27.0
* Began work on User Account page
* Expectations:
* -- User information is pulled from the Air Force Portal
* -- User can request roles
* -- Role requests will go to administrators to approve

## 0.26.0
* Implemented page templates in `App` to help decrease amount of code in each component
* Moved authentication check from individual pages to `App` before rendering
* TODO: Code cleanup (graveyard functions / classes)
* TODO: Code cleanup (Pulling out components for various pages)

## 0.25.0
* Finished state changes in `MQFEdit`, `QuestionEdit`, and `TestDetails`
* Deprecated `MQFCreate`
* Added `variant` prop to `MQFEdit` component which either uses the pulled MQF ID `variant=edit` or a blank test `variant=create` * This saves a LOT of code/redundancy
* Added `handleMQFCreate` function to `App`

## 0.24.0
* Working to remove `React.Ref` from input values in `QuestionEdit` since they are then becoming controlled components
* Changed UX of `MQFEdit` to only have one question displayed at a time (looks cleaner)
* TODO: Make the `MQFEdit` `FAB` components use `Zoom` to transition nicer

## 0.23.3
* BUGFIX: Clicking delete question deletes the correct question (Bug was in the `key` area, they were not unique enough)
* BUGFIX: Using `React.useEffect` to always close the Snackbar when navigating away from `MQFEdit` even if the 5 second timer has not yet expired.

## 0.23.2
* Added ability to add an option in `QuestionEdit` component
* Added ability to add a question in `MQFEdit` component
* Added ability to delete a question in `MQFEdit` component
* ~~BUG: Deleting a question only deletes the last question in the array, strangely enough.~~

## 0.23.1
* Removed `VERSION.md` since in `package.json` as well as the `/src/version.js`
* Added handling of `onChange` for `TextFields` in `QuestionEdit` for options. Now just need to add to question and reference.

## 0.23.0
* Fixed option deleting in `QuestionEdit`
* Changed card variant in `MQFStudy` back to default instead of `outlined`
* ~~TODO: using `value` instead of `defaultValue` makes the `TextField` a controlled component, implement using a state and `onChange` to handle changes to the values.~~

## 0.22.1
* Added filtering to delete options to `QuestionEdit`
* ~~BUG: When deleting option, the correct index is passed, but only the last option in the array is actually removed~~

## 0.22.0
* Added `IconButton` adornments to options when editing
* ~~TODO: figure out how to delete the option~~

## 0.21.0
* `QuestionEdit` uses a default value for the question parameter, able to be reused for `MQFEdit` and `MQFCreate`
* ~~TODO: Implement saving the new MQF~~
* ~~TODO: Implement the add question, add option, and delete question, and delete options for the `QuestionEdit` component~~

## 0.20.0
* Used `React.useRef` for MDS and Name in `MQFEdit` and `MQFCreate`
* Implemented the `TestDetails` component in `MQFEdit` and `MQFCreate`
* Began work on reusing the `QuestionEdit` component in the `MQFCreate` page
* ~~TODO: Modify `QuestionEdit` so that it can be blank or take a question~~

## 0.19.0
* Moved Test Details from `/src/pages/MQFEdit` to own component for reusability
* ~~TODO: Fix references passed to children in `MQFEdit`~~

## 0.18.0
* Added ability to delete MQF

## 0.17.0
* Removed `pdfjs-dist` package and prune `npm` dependencies
* Removed `create-react-app` default test files
* Bump version in `package.json`
* Use `Save` FAB in `MQFEdit`
* Remove stepper from `MQFCreate` and just use cards similar to `MQFEdit`

## 0.16.0
* Added MQF statistics and Question statistics to `/src/pages/Dashboard` and `/src/pages/MQFStudy`.
* Statistics are held within the local state (eventually to get pushed to database on a `componentWillUnmount` lifecycle)

## 0.15.0
* Install `@material-ui/lab` from NPM
* Code Cleanup
* TODO: Implement `@material-ui/lab/Skeleton` once backend and API are functioning
* ~~TODO: Implement a way to not allow skipping of `MDS` and `Name` in `/src/pages/MQFCreate`~~
* ~~TODO: Implement a way to parse PDF * might require server side~~

## 0.14.0
* Continued work on `/src/pages/MQFCreate`
* ~~TODO: Find a Javascript PDF Parser~~
* Began work on abstracting out state / components

## 0.13.0
* Standardized all cards to be `variant='outlined'`
* Code cleanup
* Implemented Stepper for `/src/pages/MQFCreate` 
* ~~TODO: Stepper unmounts TextFields which clears the reference * need permanent reference, maybe using state.~~

## 0.12.0
* Began scaffolding `/src/pages/MQFCreate`

## 0.11.1
* Changed `/src/MQFTest` to display all questions on the same page, this remedies the issue where the radio buttons were being reused by React

## 0.11.0
* Fixed bug where question number indexes reference '0' array index instead of standard counting
* Added delay to `/App/handleMQFSeen()` so that badge animation still shows on rendering a new page
* Created `/src/MQFTest`
* ~~TODO: `/src/MQFTest` does not properly render options. rather, it keeps the previous question selected when rendering the new question~~

## 0.10.1
* Fixed bug affecting render latency when flipping study card
* Seems to occur when card height is different between cards (Potential issue with package)

## 0.10.0
* Implemented random question studying (Need peer review to see if there's a better way to do it)

## 0.9.0
* Remove questions from MQF Overview * make room for trend data
* Installed `react-flip-card` from `npm`, allows for CSS transformations to look like flip card
* Implemented `MQFStudy`, currently only studies 'flashcard' style in order.
* TODO: Vertically center answer on flashcard
* ~~TODO: Implement an option for random order studying (using `react-router` url query?) * require extra 'state'~~
* ~~TODO: Implement `MQFTest` (will always be in random order)~~
* TODO: Implement User Account page
* ~~TODO: Implement `MQFCreate` page (PDF Import, parse, JSON Generation add to state / database through API Endpoints) as well as manual~~
* FEATURE: Potential for 'private' vs. 'public' tests?

## 0.8.0
* Finished MQF Save functionality
* Need to add modification of questions (add / remove options)
* Need to add / remove questions
* Changed `array.filter` to finding index for current array for readability
* Fixed bug where saving a test would change order in `SideMenu`

## 0.7.0
* Added function to update state of tests when clicking `save` FAB in `MQFEdit`

## 0.6.0
* Added border to `Login` CAC Image
* Began adding file headers to files
* Updated `ScrollToTop` bottom style to be calculated depending on the order
* Moved the `Add MQF` FAB from the `SideMenu` to the `Dashboard` * This means that you can only add an MQF from the dashboard, but better aligns with Material Style Guidelines
* Updated property names
* Added template pages for `MQFNew`, `MQFStudy`, `MQFTest`, & `UserAccount`
* Began work on `MQFEdit` page

## 0.5.0
* Added `ScrollToTop` component to render a FAB to scroll to top of window
* Added `hasScrolled` to App state
* Added `scroll` event listeners to `document` in `componentDidMount` and removed listener in `componentWillUnmount`
* Added `toggleVisibility` function in `App` class, passing to components using the `ScrollToTop` component
* Began work on page template for `MQFTest` * Expect work in future for testing, grading, and saving trend data

## 0.4.0
* Added `README.md`

## 0.3.0
* Continued work on `/src/MQFOverview`
* Moved sidebar navigation to own Component
* ~~@todo: Add Meta viewport to `/public/index.html` to avoid inital scale on mobile~~
* Commit `/public/`
* Update `package.json` and `package-lock.json`

## 0.2.0
* Updated mock state for handling authentication
* Created dummy pages for handling the creation, editing, managing, studying, and testing of MQFs
* ~~@todo: Styling and futher development~~

## 0.1.0
* Initial Commit