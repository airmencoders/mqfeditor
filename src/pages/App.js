/**
 * Routes React SPA through website
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/pages/App.js
 * @author  chris-m92
 * @since   0.1.0
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

import CssBaseline from '@material-ui/core/CssBaseline'

import { authData } from '../mockApi/authData'
import Dashboard from './Dashboard'
import Login from './Login'
import MQFEdit from './MQFEdit'
import MQFCreate from './MQFCreate'
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

  handleLoginClick = () => {
    this.setState(authData)
  }

  handleLogoutClick = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      tests: null,
    })
  }

  handleMQFSeen = (id, seenVersion) => {
    /*const filterTests = (needle, haystack) => haystack.filter(mqf => mqf.id !== needle)
    const newTests = [
      seenVersion,
      ...filterTests(id, this.state.tests)
    ]*/

    const index = this.state.tests.findIndex((needle) => needle.id === id)

    const testArray = this.state.tests.slice()
    testArray[index] = seenVersion

    // Set delay so that renders still show nice animation
    setTimeout(() => {
      this.setState({
        tests: testArray,
      })
    }, 100)


    /*this.setState({
      tests: update(this.state.tests, {index: {seen: {$set: true}}})
    })*/
  }

  handleSaveMQFChanges = (id, newVersion) => {

    const index = this.state.tests.findIndex((needle) => needle.id === id)

    const testArray = this.state.tests.slice()
    testArray[index] = newVersion

    this.setState({
      tests: testArray,
    })
  }

  handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  toggleScrollButtonVisibility() {
    if (window.pageYOffset > 100) {
      this.setState({
        hasScrolled: true
      })
    } else {
      this.setState({
        hasScrolled: false
      })
    }
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
              <MQFCreate
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
            <Route path="/m/:mqfId/e">
              <MQFEdit
                onLogoutClick={this.handleLogoutClick}
                onSave={(mqfId, newValue) => { this.handleSaveMQFChanges(mqfId, newValue) }}
                onScrollToTop={this.handleScrollToTop}
                state={this.state}
              />
            </Route>
            <Redirect exact from='/m/:mqfId/s' to='/m/:mqfId/s/sequential' />
            <Route path="/m/:mqfId/s/:order">
              <MQFStudy
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                onSeen={this.handleMQFSeen}
                state={this.state}
              />
            </Route>
            <Route path="/m/:mqfId/t">
              <MQFTest
                onLogoutClick={this.handleLogoutClick}
                onScrollToTop={this.handleScrollToTop}
                onSeen={this.handleMQFSeen}
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