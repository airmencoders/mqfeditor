# MQF Editor
A Web application for Airmen to study, review, prepare, and take practice tests for annual testing. Works in conjunction with the MQF App for EFBs. Stan/Eval shops are able to create, modify, and delete MQFs.

## Server Side (Developmental)
- Run on Node.js on PORT 3001

## Running development server
```bash
cd /project_location
npm start
```

Navigate to `http://${SERVER_IP}:3001`

## Libraries and Frameworks
- Built using React and Material-UI
```bash
npm install create-react-app
npx create-react-app
```

## Dependencies
All dependencies should be included in `package-lock.json`
```bash
npm install @material-ui/core --save
npm install @material-ui/icons --save
npm install react-router-dom --save
npm install typeface-roboto --save
npm install prop-types --save
npm install pdfjs-dist --save
npm install react-card-flip --save
```

## Potential Unstable Dependencies
Material-UI includes Lab components that may have shortcomings but are not in the core due to various reasons.
[About The Lab | Material UI](https://material-ui.com/components/about-the-lab/)
```bash
npm install @material-ui/lab --save
```

## Authentication
**DEVELOPMENT ONLY** 
Currently only meant for mock-up using sample data.
Expected to gain authentication from other means

## State
**DEVELOPMENT ONLY**
Currently using mock-api to generate sample `state`. Because of this, any direct navigation through the URL bar will reset the state bringing you back to the login screen.

## Roles
1. Administrator - Allowed all rights in website
1. Stan/Eval - Allowed to create new MQF tests and manage any tests that they own
1. Basic User - Allowed to study any MQF test and take practice tests