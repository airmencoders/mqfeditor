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
import { v4 } from 'uuid'

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
export default ({ handleDrawerToggle, handleLogoutClick, handleMQFCreate, handleSnackbarClose, handleSnackbarOpen, state }) => {
  const classes = useStyles()


  //----------------------------------------------------------------//
  // Ensure user is authenticated
  //----------------------------------------------------------------//
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }


  /**
   * SERVERLESS DEVELOPMENT - WILL USE AJAX TO GET API ENDPOINT FOR THE QUESTION INFORMATION
   * SOMETHING LIKE
   * PROMISE('https://airmencoders.cce.us.af.mil/mqfeditor/api/mqf?request=.......data)
   * 
   * data: {
   *  authentication: {user: _userid_, token: _authToken_}
   *  version: 1,
   *  mqfId: _mqfId
   * }
   */
  const blankTest = {
    id: v4(),
    mds: '',
    name: '',
    owner: state.user.id,
    version: 1,
    date: new Date(),
    seen: false,
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        answer: null,
        reference: '',
        timesStudied: 0,
        timesGotCorrect: 0,
        timesGotWrong: 0,
      },
    ],
  }
  const [currentMQF, setCurrentMQF] = React.useState(blankTest)
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [hasPrevious, setHasPrevious] = React.useState(false)
  const [hasNext, setHasNext] = React.useState(false)

  //----------------------------------------------------------------//
  // When unmounting the component, close the snackbar
  //----------------------------------------------------------------//
  React.useEffect(() => {
    return () => {
      handleSnackbarClose()
    }
  }, [handleSnackbarClose])

  //----------------------------------------------------------------//
  // Handle question navigation
  //----------------------------------------------------------------//
  const handleNextQuestion = () => {
    setHasPrevious(true)

    if (currentQuestion === currentMQF.questions.length - 2) {
      setHasNext(false)
    }

    if (hasNext) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    setHasNext(true)

    if (currentQuestion === 1) {
      setHasPrevious(false)
    }

    if (hasPrevious) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  //----------------------------------------------------------------//
  // Handle Save Button
  //----------------------------------------------------------------//
  const handleSaveClick = () => {

    handleMQFCreate(currentMQF)
    handleSnackbarOpen()
  }

  //----------------------------------------------------------------//
  // Handle Adding and Deleting a question
  //----------------------------------------------------------------//
  const handleAddQuestion = () => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
      answer: null,
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

  const handleDeleteQuestion = () => {
    const filteredQuestions = currentMQF.questions.filter((value, index) => index !== currentQuestion)
    const updatedMQF = {
      ...currentMQF,
      questions: filteredQuestions,
    }

    if (filteredQuestions.length === 1) {
      setCurrentQuestion(0)
      setHasNext(false)
      setHasPrevious(false)
    }

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }

    setCurrentMQF(updatedMQF)
  }

  //----------------------------------------------------------------//
  // Handle Answer Changes
  //----------------------------------------------------------------//
  const handleAnswerChange = value => {
    const newQuestion = {
      ...currentMQF.questions[currentQuestion],
      answer: value,
    }

    const newQuestionArray = [...currentMQF.questions]

    newQuestionArray.splice(currentQuestion, 1, newQuestion)

    const newMQF = {
      ...currentMQF,
      questions: newQuestionArray,
    }

    setCurrentMQF(newMQF)
  }

  //----------------------------------------------------------------//
  // Handle Option Changes
  //----------------------------------------------------------------//
  const handleOptionAdd = () => {
    const newOptionArray = [...currentMQF.questions[currentQuestion].options, '']

    const newQuestion = {
      ...currentMQF.questions[currentQuestion],
      options: newOptionArray,
    }

    const newQuestionArray = [...currentMQF.questions]

    newQuestionArray.splice(currentQuestion, 1, newQuestion)

    const newMQF = {
      ...currentMQF,
      questions: newQuestionArray,
    }

    setCurrentMQF(newMQF)
  }

  const handleOptionChange = (optionIndex, value) => {
    const newOptionArray = [...currentMQF.questions[currentQuestion].options]

    newOptionArray.splice(optionIndex, 1, value)

    const newQuestion = {
      ...currentMQF.questions[currentQuestion],
      options: newOptionArray,
    }

    const newQuestionArray = [...currentMQF.questions]

    newQuestionArray.splice(currentQuestion, 1, newQuestion)

    const newMQF = {
      ...currentMQF,
      questions: newQuestionArray,
    }

    setCurrentMQF(newMQF)
  }

  const handleOptionDelete = optionIndex => {
    const newOptionArray = currentMQF.questions[currentQuestion].options.filter((fValue, fIndex) => optionIndex !== fIndex)

    let newAnswer = currentMQF.questions[currentQuestion].answer
    if (optionIndex === newAnswer) {
      newAnswer = null
    } else if (optionIndex < newAnswer) {
      newAnswer--
    }
    const newQuestion = {
      ...currentMQF.questions[currentQuestion],
      options: newOptionArray,
      answer: newAnswer,
    }

    const newQuestionArray = [...currentMQF.questions]
    newQuestionArray.splice(currentQuestion, 1, newQuestion)

    const newMQF = {
      ...currentMQF,
      questions: newQuestionArray
    }

    setCurrentMQF(newMQF)
  }

  //----------------------------------------------------------------//
  // Handle Question Changes
  //----------------------------------------------------------------//
  const handleQuestionChange = value => {
    const newQuestion = {
      ...currentMQF.questions[currentQuestion],
      question: value,
    }

    const newQuestionArray = [...currentMQF.questions]

    newQuestionArray.splice(currentQuestion, 1, newQuestion)

    const newMQF = {
      ...currentMQF,
      questions: newQuestionArray,
    }

    setCurrentMQF(newMQF)
  }

  //----------------------------------------------------------------//
  // Handle Reference Changes
  //----------------------------------------------------------------//
  const handleReferenceChange = value => {
    const newQuestion = {
      ...currentMQF.questions[currentQuestion],
      reference: value,
    }

    const newQuestionArray = [...currentMQF.questions]
    newQuestionArray.splice(currentQuestion, 1, newQuestion)

    const newMQF = {
      ...currentMQF,
      questions: newQuestionArray,
    }

    setCurrentMQF(newMQF)
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
                answer={currentMQF.questions[currentQuestion].answer}
                handleAnswerChange={value => handleAnswerChange(value)}
                handleOptionAdd={() => handleOptionAdd()}
                handleOptionChange={(optionIndex, value) => handleOptionChange(optionIndex, value)}
                handleOptionDelete={optionIndex => handleOptionDelete(optionIndex)}
                handleQuestionChange={value => handleQuestionChange(value)}
                handleReferenceChange={value => handleReferenceChange(value)}
                index={currentQuestion}
                options={currentMQF.questions[currentQuestion].options}
                question={currentMQF.questions[currentQuestion].question}
                reference={currentMQF.questions[currentQuestion].reference}
              />
              {(hasPrevious || hasNext) ?
                <Delete
                  handleClick={handleDeleteQuestion}
                />
                : null
              }
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