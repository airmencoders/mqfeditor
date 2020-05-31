/**
 * Renders form to create a new MQF test
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/pages/MQFCreate.js
 * @author  chris-m92
 * @since   0.14.0
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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import { Redirect } from 'react-router-dom'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import NoteAddIcon from '@material-ui/icons/NoteAdd'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import CustomSnackbar from '../components/CustomSnackbar'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import ScrollToTop from '../components/fabs/ScrollToTop'
import Save from '../components/fabs/Save'
import SideMenu from '../components/SideMenu'
import TestDetails from '../components/TestDetails'
import QuestionEdit from '../components/QuestionEdit'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  card: {
    marginBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  fileInput: {
    display: 'none',
  },
  fileUploadButton: {
    marginBottom: theme.spacing(3),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  textField: {
    margin: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

//----------------------------------------------------------------//
// Create MQF Component
//----------------------------------------------------------------//
export default ({ handleDrawerToggle, handleLogoutClick, handleScrollToTop, handleSnackbarClose, handleSnackbarOpen, state }) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Internal state and references for input
  //----------------------------------------------------------------//
  const mdsRef = React.useRef()
  const nameRef = React.useRef()
  const answerRefs = React.useRef([])
  const optionRefs = React.useRef([])
  const referenceRefs = React.useRef([])
  const questionRefs = React.useRef([])

  let questionIndex = 0

  //----------------------------------------------------------------//
  // Ensure user is authenticated
  //----------------------------------------------------------------//
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  const handleSaveClick = () => {
    console.log('saved!')
    console.log('MDS:', mdsRef.current.value)
    console.log('Name:', nameRef.current.value)
  }

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <div className={classes.root}>
      <ResponsiveNavigation
        handleDrawerToggle={handleDrawerToggle}
        handleLogoutClick={handleLogoutClick}
        state={state}
      />
      <SideMenu
        handleDrawerToggle={handleDrawerToggle}
        state={state}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <form noValidate autoComplete='off'>
          <Grid
            container
            direction='row'
            justify='center'
          >
            <Grid
              item
              xs={10}
            >
              <TestDetails
                mdsRef={mdsRef}
                nameRef={nameRef}
              />
              <QuestionEdit
                answerRefs={answerRefs}
                optionRefs={optionRefs}
                referenceRefs={referenceRefs}
                questionIndex={questionIndex}
                questionRefs={questionRefs}
              />
            </Grid>
          </Grid>
        </form>
        <ScrollToTop
          handleScrollToTop={handleScrollToTop}
          order={2}
          state={state}
        />
        <Save
          handleSaveClick={handleSaveClick}
        />
      </main>
      <CustomSnackbar
        handleSnackbarClose={handleSnackbarClose}
        message='Changes Saved'
        open={state.snackbarOpen}
      />
    </div >
  )
}