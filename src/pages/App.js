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
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import { authData } from '../mockApi/authData'
import Dashboard from './Dashboard'
import Login from './Login'
import MQFEdit from './MQFEdit'
import MQFOverview from './MQFOverview'
import MQFPrint from './MQFPrint'
import MQFStudy from './MQFStudy'
import MQFTest from './MQFTest'
import UserAccount from './UserAccount'

import ResponsiveNavigation from '../components/ResponsiveNavigation'
import SideMenu from '../components/SideMenu'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

//----------------------------------------------------------------//
// App Component
//----------------------------------------------------------------//
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasScrolled: false,
      isAuthenticated: false,
      mobileOpen: false,
      snackbarOpen: false,
      tests: null,
      user: null,
    }
  }

  //----------------------------------------------------------------//
  // Class Lifecycle
  //----------------------------------------------------------------//
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

  //----------------------------------------------------------------//
  // Drawer Methods
  //----------------------------------------------------------------//
  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    })
  }

  //----------------------------------------------------------------//
  // Authentication Methods 
  //----------------------------------------------------------------//
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

  //----------------------------------------------------------------//
  // MQF Lifecycle Methods 
  //----------------------------------------------------------------//

  handleMQFCreate = newMQF => {
    const testArray = [...this.state.tests, newMQF]

    this.setState({
      tests: testArray,
    })
  }


  handleMQFDelete = mqfId => {
    const index = this.state.tests.findIndex(needle => needle.id === mqfId)

    const testArray = [...this.state.tests]
    testArray.splice(index, 1)

    this.setState({
      tests: testArray,
    })
  }

  handleMQFSave = (mqfId, newVersion) => {
    const index = this.state.tests.findIndex(needle => needle.id === mqfId)

    const testArray = this.state.tests.slice()
    testArray[index] = newVersion

    this.setState({
      tests: testArray,
    })
  }

  handleMQFSeen = (mqfId, seenVersion) => {
    const index = this.state.tests.findIndex(needle => needle.id === mqfId)

    const testArray = this.state.tests.slice()
    testArray[index] = seenVersion

    // Set delay so that renders still show nice animation
    setTimeout(() => {
      this.setState({
        tests: testArray,
      })
    }, 100)
  }

  handleQuestionStudied = (mqfId, questionIndex) => {
    const index = this.state.tests.findIndex(needle => needle.id === mqfId)

    const testArray = this.state.tests.slice()
    testArray[index].questions[questionIndex].timesStudied = this.state.tests[index].questions[questionIndex].timesStudied + 1

    this.setState({
      tests: testArray,
    })
  }

  //----------------------------------------------------------------//
  // UI Methods 
  //----------------------------------------------------------------//
  handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true
    })
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
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

  pageTemplate = props => {
    const classes = useStyles()

    return (
      <div className={classes.root}>
        <ResponsiveNavigation
          handleDrawerToggle={this.handleDrawerToggle}
          handleLogoutClick={this.handleLogoutClick}
          state={this.state}
        />
        <SideMenu
          handleDrawerToggle={this.handleDrawerToggle}
          state={this.state}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    )
  }

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  render() {
    return (
      <div className='App'>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path='/'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <Dashboard
                    state={this.state}
                  />
                </this.pageTemplate>
                :
                <Login
                  handleLoginClick={this.handleLoginClick}
                  state={this.state}
                />
              }
            </Route>
            <Route exact path='/m'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <MQFEdit
                    handleMQFSave={newMQF => { this.handleMQFCreate(newMQF) }}
                    handleSnackbarClose={this.handleSnackbarClose}
                    handleSnackbarOpen={this.handleSnackbarOpen}
                    state={this.state}
                    variant='create'
                  />
                </this.pageTemplate>
                :
                <Redirect to='/' />
              }
            </Route>
            <Route path='/m/:mqfId/e'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <MQFEdit
                    handleMQFSave={(mqfId, newValue) => { this.handleMQFSave(mqfId, newValue) }}
                    handleSnackbarClose={this.handleSnackbarClose}
                    handleSnackbarOpen={this.handleSnackbarOpen}
                    state={this.state}
                    variant='edit'
                  />
                </this.pageTemplate>
                :
                <Redirect to='/' />
              }
            </Route>
            <Route path='/m/:mqfId/p'>
              {(this.state.isAuthenticated) ?
              <this.pageTemplate>
                <MQFPrint
                  state={this.state}
                />
              </this.pageTemplate>  
              :
              <Redirect to='/' />
            }
            </Route>
            <Route path='/m/:mqfId/s/:order'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <MQFStudy
                    handleMQFSeen={this.handleMQFSeen}
                    handleQuestionStudied={(mqfId, questionIndex) => { this.handleQuestionStudied(mqfId, questionIndex) }}
                    state={this.state}
                  />
                </this.pageTemplate>
                :
                <Redirect to='/' />
              }
            </Route>
            <Route path='/m/:mqfId/t'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <MQFTest
                    handleMQFSeen={this.handleMQFSeen}
                    state={this.state}
                  />
                </this.pageTemplate>
                :
                <Redirect to='/' />
              }
            </Route>
            <Route path='/m/:mqfId'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <MQFOverview
                    handleMQFDelete={this.handleMQFDelete}
                    state={this.state}
                  />
                </this.pageTemplate>
                :
                <Redirect to='/' />
              }
            </Route>
            <Route path='/u/:userId'>
              {(this.state.isAuthenticated) ?
                <this.pageTemplate>
                  <UserAccount
                    state={this.state}
                  />
                </this.pageTemplate>
                :
                <Redirect to='/' />
              }
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App