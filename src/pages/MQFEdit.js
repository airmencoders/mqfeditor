/**
 * Renders a form to Edit an MQF
 * 
 * Allows an administrator or owner 
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    MQFOverview.js
 * @author  chris-m92
 * @since   0.5.0
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
import { useParams, Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'

import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'

import ResponsiveNavigation from '../components/ResponsiveNavigation'
import ScrollToTop from '../components/ScrollToTop'
import SideMenu from '../components/SideMenu'
import QuestionEdit from '../components/QuestionEdit'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  card: {
    //width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(3),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const MQFEdit = ({ onLogoutClick, onSave, onScrollToTop, state }) => {
  const classes = useStyles()
  const { mqfId } = useParams()

  //----------------------------------------------------------------//
  // Internal state passed to Drawer component

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  } 

  //----------------------------------------------------------------//
  // Internal state passed to Snackbar component

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  //----------------------------------------------------------------//


  // Declare references
  let _mds, _name
  // array of questions in order
  const questionRefs = React.useRef([])

  // 2D array of options in order
  // [['one', 'two', 'three', 'four']]
  const optionRefs = React.useRef([])

  // array of answers in order
  const answerRefs = React.useRef([])

  // Array of publication references in order
  const referenceRefs = React.useRef([])

  // Ensure that user is logged in
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  } 

  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION
  const filterMQF = (needle, haystack) => haystack.filter(mqf => mqf.id === needle)
  const currentMQF = filterMQF(mqfId, state.tests)[0]

  const testSaveQuestions = () => {
    questionRefs.current.forEach((qRef, qIndex) => {
      console.log(`Question ${qIndex}:`, qRef.value)

      optionRefs.current[qIndex].forEach((oRef, oIndex) => (
        console.log(`Option ${oIndex}:`, oRef.value)
      ))

      console.log(`Answer ${qIndex}:`, answerRefs.current[qIndex].charCodeAt(0) - 65)
      console.log(`Reference:`, referenceRefs.current[qIndex].value)
      console.log('-------------------------')
    })

    // Make
  }

  const handleSaveClick = () => {

    let questions = []
    questionRefs.current.forEach((qRef, qIndex) => {
      let options = []

      optionRefs.current[qIndex].forEach((oRef, oIndex) => options[oIndex] = oRef.value)

      const question = {
        question: qRef.value,
        options,
        answer: (answerRefs.current[qIndex].charCodeAt(0) - 65),
        reference: referenceRefs.current[qIndex].value
      }

      questions[qIndex] = question
    })


    let newMQF = {
      ...currentMQF,
      mds: _mds.value,
      name: _name.value,
      version: currentMQF.version + 1,
      date: new Date().toString(),
      seen: false,
      questions
    }
    onSave(mqfId, newMQF)
    setSnackbarOpen(true)
  }

  

  

  return (
    <div className={classes.root}>
      <ResponsiveNavigation
        onLogoutClick={onLogoutClick}
        onMenuClick={handleDrawerToggle}
        state={state}
      />
      <SideMenu
        mobileOpen={mobileOpen}
        onMenuClick={handleDrawerToggle}
        state={state}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <form noValidate autoComplete='off'>
          <Grid container direction='row' justify='center'>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <Box
                  direction='row'
                  display='flex'
                  flexWrap='wrap'
                >
                  <TextField
                    className={classes.textField}
                    defaultValue={currentMQF.mds}
                    id='mqf-mds'
                    inputRef={value => _mds = value}
                    label='MDS'
                  />
                  <TextField
                    className={classes.textField}
                    defaultValue={currentMQF.name}
                    id='mqf-name'
                    inputRef={value => _name = value}
                    label='MQF Name'
                  />
                </Box>
              </Card>
              {
                currentMQF.questions.map((question, questionIndex) => (
                  <QuestionEdit
                    answerRefs={answerRefs}
                    key={`question-${questionIndex}`}
                    optionRefs={optionRefs}
                    referenceRefs={referenceRefs}
                    question={question}
                    questionIndex={questionIndex}
                    questionRefs={questionRefs}
                  />
                ))
              }
              <Button
                color='primary'
                variant='contained'
              >
                Add Question
              </Button>
            </Grid>
          </Grid>
        </form>
        <Fab
          aria-label='save changes'
          className={classes.fab}
          color='primary'
          onClick={handleSaveClick}
        >
          <SaveIcon />
        </Fab>
        <ScrollToTop
          onScrollToTop={onScrollToTop}
          order={2}
          state={state}
        />
      </main>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={5000}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message='Changes Saved'
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            onClick={handleSnackbarClose}
            size='small'
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      />
    </div >
  )
}

export default MQFEdit