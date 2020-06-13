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
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Grid from '@material-ui/core/Grid'

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
import Delete from '../components/fabs/Delete'
import Next from '../components/fabs/Next'
import Previous from '../components/fabs/Previous'
import Save from '../components/fabs/Save'
import TestDetails from '../components/TestDetails'
import QuestionEdit from '../components/QuestionEdit'

//----------------------------------------------------------------//
// Edit MQF Component
//----------------------------------------------------------------//
export default ({ handleMQFSave, handleSnackbarClose, handleSnackbarOpen, state, variant }) => {
  const { mqfId } = useParams()

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

  const [currentMQF, setCurrentMQF] = React.useState(
    (variant === 'edit') ?
      state.tests.filter(mqf => mqf.id === mqfId)[0] :
      blankTest
  )
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [hasPrevious, setHasPrevious] = React.useState(false)
  const [hasNext, setHasNext] = React.useState(false)

  //----------------------------------------------------------------//
  // Set has next if currentMQF has more than one question
  //----------------------------------------------------------------//
  React.useEffect(() => {
    if (currentMQF !== null && currentMQF.questions.length > 1) {
      setHasNext(true)
    }
  }, [])

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

    if (variant === 'edit') {
      const newMQF = {
        ...currentMQF,
        seen: false,
        version: currentMQF.version + 1,
        date: new Date(),
      }

      handleMQFSave(mqfId, newMQF)
    } else if (variant === 'create') {
      handleMQFSave(currentMQF)
    }

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
  // Handle MDS Changes
  //----------------------------------------------------------------//
  const handleMDSChange = value => {
    const newMQF = {
      ...currentMQF,
      mds: value,
    }

    setCurrentMQF(newMQF)
  }

  //----------------------------------------------------------------//
  // Handle Name Changes
  //----------------------------------------------------------------//
  const handleNameChange = value => {
    const newMQF = {
      ...currentMQF,
      name: value,
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
    <React.Fragment>
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
              handleMDSChange={value => handleMDSChange(value)}
              handleNameChange={value => handleNameChange(value)}
              mds={currentMQF.mds}
              name={currentMQF.name}
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
            {(hasNext || hasPrevious) ?
              <Delete
                handleClick={handleDeleteQuestion}
              /> : null
            }
            {(hasPrevious) ?
              <Previous
                handleClick={handlePreviousQuestion}
              /> : null
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
      <CustomSnackbar
        handleSnackbarClose={handleSnackbarClose}
        message='Changes Saved'
        open={state.snackbarOpen}
      />
    </React.Fragment>
  )
}