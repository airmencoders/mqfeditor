import React from 'react'
import Dashboard from './Dashboard'
import Login from './Login'
import './App.css'
import Navigation from './Navigation'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Test from './Test'
import Box from '@material-ui/core/Box'
import { v4 } from 'uuid'

import MQFOverview from './MQFOverview'

const Account = () => {
  return (
    <h1>[ACCOUNT SETTINGS HERE</h1>
  )
}

const MQFNew = () => {
  return (
    <Box my={14}>
      <h1>[NEW TEST FORM HERE]</h1>
    </Box>
  )
}

const MQFEdit = () => {
  return (
    <Box my={14}>
      <h1>[MQF EDIT HERE]</h1>
    </Box>
  )
}

const MQFStudy = () => {
  return (
    <Box my={14}>
      <h1>[MQF STUDY HERE]</h1>
    </Box>
  )
}

const MQFTest = () => {
  return (
    <Box my={14}>
      <h1>[MQF TEST HERE]</h1>
    </Box>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      user: null,
      tests: null,
    }
  }

  handleLoginClick = () => {
    this.setState({
      isAuthenticated: true,
      user: {
        id: "68b80a87-a122-4f73-8dc5-1b06ddbeeb96",
        display: "MCBRIDE, CHRISTOPHER, E CAPT USAF ACC 74FS/CCV (Porkins)",
        email: "christopher.mcbride.13@us.af.mil",
        first: "Christopher",
        middle: "Eugene",
        last: "McBride",
        rank: "Capt",
        majcom: "ACC",
        squadron: "74FS",
        office: "CCV",
        role: "Admin",
      },
      tests: [
        {
          id: "e554c1b3-6713-4f06-a497-44800148a76b",
          mds: "A-10C",
          name: "Master MQF",
          owner: "68b80a87-a122-4f73-8dc5-1b06ddbeeb96",
          version: 3,
          date: "5 May 2020, 16:58 Zulu",
          questions: [
            {
              number: 1,
              question: 'How many engines does the A-10C have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'T.O. A-10C-1'
            }
          ]
        },
        {
          id: "0f2da7dc-e390-4f20-83a0-68c9844a24ae",
          mds: "A-10C",
          name: "23 FG Local MQF",
          owner: "68b80a87-a122-4f73-8dc5-1b06ddbeeb96",
          version: 1,
          date: "5 May 2020, 16:58 Zulu",
          questions: [
            {
              number: 1,
              question: 'How many runways does Moody AFB have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'The Earth'
            }
          ]
        }
      ],
    })
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/">
              {(this.state.isAuthenticated) ?
                <Dashboard state={this.state} /> :
                <Login state={this.state} onClick={() => { this.handleLoginClick() }} />
              }
            </Route>
            <Route exact path="/m"><MQFNew /></Route>
            <Route path="/m/:mqfId/e"><MQFEdit /></Route>
            <Route path="/m/:mqfId/s"><MQFStudy /></Route>
            <Route path="/m/:mqfId/t"><MQFTest /></Route>
            <Route path="/m/:mqfId"><MQFOverview state={this.state} /></Route>
            <Route path="/u/:userId"><Account /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
