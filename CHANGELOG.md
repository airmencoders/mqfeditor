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