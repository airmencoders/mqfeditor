/**
 * Renders a Card with options to edit a MQF Question
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/QuestionEdit.js
 * @author  chris-m92
 * @since   0.11.0
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

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import DeleteIcon from '@material-ui/icons/Delete'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  divider: {
    height: 20,
    margin: 10,
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
}))

//----------------------------------------------------------------//
// Question Edit Component
//----------------------------------------------------------------//
export default ({ answerRefs, handleDeleteQuestion, optionRefs, question = { question: '', options: ['', '', '', ''], answer: '', reference: '', timesStudied: 0, timesGotCorrect: 0, timesGotWrong: 0 }, questionIndex, questionRefs, referenceRefs }) => {
  const classes = useStyles()

  // Initialize the current reference as a 2D array
  optionRefs.current[questionIndex] = []

  //----------------------------------------------------------------//
  // Question state
  //----------------------------------------------------------------//
  const [questionState, setQuestionState] =  React.useState(question.question)

  const handleQuestionChange = value => {
    setQuestionState(value)
  }

  //----------------------------------------------------------------//
  // Option state
  //----------------------------------------------------------------//
  const [optionState, setOptionState] = React.useState([...question.options])

  const handleAddOption = () => {
    const newOptions = [...optionState, '']

    setOptionState(newOptions)
  }

  const handleRemoveOption = optionIndex => {
    // If deleting the current answer, set the answer to null
    if (answerState !== null) {
      if (optionIndex === answerState.charCodeAt(0) - 65) {
        setAnswerState(null)
      } else if (optionIndex < answerState.charCodeAt(0) - 65) {
        setAnswerState(String.fromCharCode(answerState.charCodeAt(0) - 1))
      }
    }

    // Change the state
    setOptionState(optionState.filter((value, index) => index !== optionIndex))
  }

  const handleOptionChange = (optionIndex, value) => {
    let newOptions = [...optionState]
    newOptions[optionIndex] = value

    setOptionState(newOptions)
  }

  //----------------------------------------------------------------//
  // Radio Button State
  //----------------------------------------------------------------//
  const [answerState, setAnswerState] = React.useState(String.fromCharCode(65 + question.answer))

  const handleAnswerChange = value => {
    setAnswerState(value)
  }

  //----------------------------------------------------------------//
  // Reference State
  //----------------------------------------------------------------//
  const [referenceState, setReferenceState] = React.useState(question.reference)

  const handleReferenceChange = value => {
    setReferenceState(value)
  }


  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <Card
      className={classes.card}
      variant='outlined'
    >
      <CardContent name='question'>
        <TextField
          className={classes.textField}
          value={questionState}
          fullWidth
          inputRef={value => questionRefs.current[questionIndex] = value}
          label={`Question ${questionIndex + 1}`}
          multiline
          onChange={event => handleQuestionChange(event.target.value)}
        />
        {
          optionState.map((option, optionIndex) => (
            <TextField
              className={classes.textField}
              value={optionState[optionIndex]}
              fullWidth
              key={`question-${questionIndex}-option-${optionIndex}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Radio
                      checked={answerState === String.fromCharCode(65 + optionIndex)}
                      className={classes.radio}
                      //color='default'
                      onChange={event => handleAnswerChange(event.target.value)}
                      value={String.fromCharCode(65 + optionIndex)}
                      //name={`question-${questionIndex}-option-${optionIndex}`}
                      inputProps={{ 'aria-label': String.fromCharCode(65 + optionIndex) }}
                      inputRef={() => answerRefs.current[questionIndex] = answerState}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='delete option'
                      edge='end'
                      onClick={() => handleRemoveOption(optionIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                )

              }}
              inputRef={value => optionRefs.current[questionIndex][optionIndex] = value}
              label={`Option ${String.fromCharCode(65 + optionIndex)}`}
              multiline
              onChange={event => handleOptionChange(optionIndex, event.target.value)}
            />
          ))
        }
        <TextField
          className={classes.textField}
          value={referenceState}
          fullWidth
          inputRef={value => referenceRefs.current[questionIndex] = value}
          label='Reference'
          multiline
          onChange={event => handleReferenceChange(event.target.value)}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color='primary'
          onClick={() => handleAddOption()}
          variant='contained'
        >
          Add Option
        </Button>
        <Button
          color='secondary'
          onClick={() => handleDeleteQuestion(questionIndex)}
          variant='contained'
        >
          Delete Question
        </Button>
      </CardActions>
    </Card>
  )
}