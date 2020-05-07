/**
 * Routes React SPA through website
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    App.js
 * @author  chris-m92
 * @since   0.1.0
 * @version 0.6.0
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Airmen Coders
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline'

import './App.css'
import Dashboard from './Dashboard'
import Login from './Login'
import MQFEdit from './MQFEdit'
import MQFNew from './MQFNew'
import MQFStudy from './MQFStudy'
import MQFTest from './MQFTest'
import MQFOverview from './MQFOverview'
import UserAccount from './UserAccount'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasScrolled: false,
      isAuthenticated: false,
      user: null,
      tests: null,
    }
  }

  toggleScrollButtonVisibility() {
    if (window.pageYOffset > 200) {
      this.setState({
        hasScrolled: true
      })
    } else {
      this.setState({
        hasScrolled: false
      })
    }
  }

  componentDidMount() {
    const scrollComponent = this
    document.addEventListener('scroll', (e) => {
      scrollComponent.toggleScrollButtonVisibility()
    })
  }

  componentWillUnmount() {
    const scrollComponent = null
    document.removeEventListener('scroll', (e) => {
      scrollComponent.toggleScrollButtonVisibility()
    })
  }

  handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  handleLogoutClick = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      tests: null,
    })
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
        role: "admin",
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
              question: 'How many engines does the A-10C have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'T.O. A-10C-1'
            },
            {
              question: 'How many engines does the A-10C have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'T.O. A-10C-1'
            },
            {
              question: 'How many engines does the A-10C have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'T.O. A-10C-1'
            },
            {
              question: 'How many engines does the A-10C have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'T.O. A-10C-1'
            },
            {
              question: 'How many engines does the A-10C have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'T.O. A-10C-1'
            },
            {
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
              question: 'How many runways does Moody AFB have?',
              options: ['One', 'Two', 'Three', 'Four'],
              answer: 1,
              reference: 'The Earth'
            }
          ]
        },
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
                <Dashboard
                  onLogoutClick={this.handleLogoutClick}
                  state={this.state}
                /> :
                <Login
                  onLoginClick={this.handleLoginClick}
                  state={this.state}
                />
              }
            </Route>
            <Route exact path="/m">
              <MQFNew 
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
            <Route path="/m/:mqfId/e">
              <MQFEdit
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
            <Route path="/m/:mqfId/s">
              <MQFStudy
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
            <Route path="/m/:mqfId/t">
              <MQFTest 
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
            <Route path="/m/:mqfId">
              <MQFOverview 
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop} 
                state={this.state}
              />
            </Route>
            <Route path="/u/:userId">
              <UserAccount 
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
