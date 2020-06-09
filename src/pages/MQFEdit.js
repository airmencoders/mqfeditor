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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import { useParams, Redirect } from 'react-router-dom'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

//----------------------------------------------------------------//
// Material UI Lab Components
//----------------------------------------------------------------//
// NOT YET IMPLEMENTED
// import Skeleton from '@material-ui/lab/Skeleton'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import Add from '../components/fabs/Add'
import CustomSnackbar from '../components/CustomSnackbar'
import Next from '../components/fabs/Next'
import Previous from '../components/fabs/Previous'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import Save from '../components/fabs/Save'
import ScrollToTop from '../components/fabs/ScrollToTop'
import SideMenu from '../components/SideMenu'
import TestDetails from '../components/TestDetails'
import QuestionEdit from '../components/QuestionEdit'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
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
  card: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(3),
  },
}))

//----------------------------------------------------------------//
// Edit MQF Component
//----------------------------------------------------------------//
export default ({ handleDrawerToggle, handleLogoutClick, handleMQFSave, handleSnackbarClose, handleSnackbarOpen, state }) => {
  const classes = useStyles()
  const { mqfId } = useParams()

  // Ensure that user is logged in
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  const [currentMQF, setCurrentMQF] = React.useState(state.tests.filter(mqf => mqf.id === mqfId)[0])
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [hasPrevious, setHasPrevious] = React.useState(false)
  const [hasNext, setHasNext] = React.useState(false)

  React.useEffect(() => {
    if(currentMQF !== null && currentMQF.questions.length > 1) {
      setHasNext(true)
    }
  }, [])

  React.useEffect(() => {
    return () => {
      handleSnackbarClose()
    }
  }, [handleSnackbarClose])

  const handlePreviousQuestion = () => {
    setHasNext(true)

    if(currentQuestion === 1) {
      setHasPrevious(false)
    }

    if(hasPrevious) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    setHasPrevious(true)

    if(currentQuestion === currentMQF.questions.length - 2) {
      setHasNext(false)
    }

    if(hasNext) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  //----------------------------------------------------------------//
  // Handle Save Button
  //----------------------------------------------------------------//
  const handleSaveClick = () => {

    console.log('save clicked')
    handleSnackbarOpen()
  }

  const handleDeleteQuestion = questionId => {
    const filteredQuestions = currentMQF.questions.filter((value, index) => index !== questionId)
    const updatedMQF = {
      ...currentMQF,
      questions: filteredQuestions,
    }

    setCurrentMQF(updatedMQF)
  }

  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
      answer: '',
      reference: '',
      timesStudied: 0,
      timesGotCorrect: 0,
      timesGotWrong: 0,
    }

    const newQuestions = [...currentMQF.questions, newQuestion]

    const updatedMQF = {
      ...currentMQF,
      questions: newQuestions,
    }

    setCurrentMQF(updatedMQF)
    setHasPrevious(true)
    setCurrentQuestion(currentQuestion + 1)
  }

  const handleValueChange = () => {

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
                defaultMDS={currentMQF.mds}
                defaultName={currentMQF.name}
              />
              <QuestionEdit
                handleChange={setCurrentMQF}
                key={`question-${currentMQF.questions[currentQuestion].question}`}
                question={currentMQF.questions[currentQuestion]}
                questionIndex={currentQuestion}
              />
              {(hasPrevious) ?
                <Previous
                  handleClick={handlePreviousQuestion}
                />
                : null
              }

              {(hasNext) ?
                <Next
                  handleClick={handleNextQuestion}
                /> :
                <Add
                  handleClick={handleAddQuestion}
                />
              }
            </Grid>
          </Grid>
        </form>
        <Save
          handleSaveClick={handleSaveClick}
        />
      </main>
      <CustomSnackbar
        handleSnackbarClose={handleSnackbarClose}
        message='Changes Saved'
        open={state.snackbarOpen}
      />
    </div>
  )
}