/**
 * Render MQF Questions as a randomized test
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/pages/MQFTest.js
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
import { useParams } from 'react-router-dom'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import QuestionResult from '../components/QuestionResult'
import QuestionTest from '../components/QuestionTest'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  questionFab: {
    marginTop: theme.spacing(2),
  },
  submit: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

//----------------------------------------------------------------//
// MQF Test Component
//----------------------------------------------------------------//
export default ({ handleMQFSeen, state }) => {
  const classes = useStyles()
  let { mqfId } = useParams()

  //----------------------------------------------------------------//
  // Get MQF information
  //----------------------------------------------------------------//
  const currentMQF = state.tests.filter(test => test.id === mqfId)[0]
  const numberOfQuestions = Math.min(50, currentMQF.questions.length)

  //----------------------------------------------------------------//
  // Initialize states
  //----------------------------------------------------------------//
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [hasPrevious, setHasPrevious] = React.useState(false)
  const [hasNext, setHasNext] = React.useState((numberOfQuestions > 1) ? true : false)
  const [questionsPicked, setQuestionsPicked] = React.useState(false)
  const [testSubmitted, setTestSubmitted] = React.useState(false)
  const [score, setScore] = React.useState(0)

  let tempArray = []
  let initialAnswerArray = []
  for (let i = 0; i < numberOfQuestions; i++) {
    tempArray[i] = i
    initialAnswerArray[i] = null
  }

  const [questionArray, setQuestionArray] = React.useState(tempArray)
  const [answers, setAnswers] = React.useState(initialAnswerArray)

  React.useEffect(() => {
    handleMQFSeen(mqfId)

    let shuffledArray = []

    for (let i = 0; i < numberOfQuestions; i++) {
      let potentialQuestion = Math.floor(Math.random() * numberOfQuestions)

      while (shuffledArray.find(value => value === potentialQuestion) !== undefined) {
        potentialQuestion = Math.floor(Math.random() * numberOfQuestions)
      }

      shuffledArray[i] = potentialQuestion
    }

    setQuestionArray(shuffledArray)
    setQuestionsPicked(true)
  }, [])

  const handleAnswerChange = value => {
    let newAnswers = [...answers]
    newAnswers[currentQuestion] = value

    setAnswers(newAnswers)
  }

  //----------------------------------------------------------------//
  // Handle Question Navigation
  //----------------------------------------------------------------//
  const handleNextQuestion = () => {
    setHasPrevious(true)

    if (currentQuestion === numberOfQuestions - 2) {
      setHasNext(false)
    }

    if (hasNext) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      let numberCorrect = 0
      for (let i = 0; i < numberOfQuestions; i++) {
        if(currentMQF.questions[questionArray[i]].answer === answers[i]) {
          numberCorrect++
        }
      }

      setScore(numberCorrect / numberOfQuestions)
      setTestSubmitted(true)
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
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <Grid
      container
      direction='row'
      justify='center'
    >
      {(testSubmitted) ?
        <Grid
          item
          xs={8}
        >
          <Card
            className={classes.card}
            variant='outlined'
          >
            <CardContent>
              <Typography variant='h6'>{`Score: ${Math.round(score * 100)}%`}</Typography>
            </CardContent>
          </Card>
          {questionArray.map((value, index) => (
            <QuestionResult
              answer={answers[index]}
              correctAnswer={currentMQF.questions[questionArray[index]].answer}
              key={index}
              options={currentMQF.questions[questionArray[index]].options}
              question={currentMQF.questions[questionArray[index]].question}
              reference={currentMQF.questions[questionArray[index]].reference}
            />
          ))
          }          
        </Grid>
        :
        (questionsPicked) ?
          <Grid
            item
            xs={8}
          >
            <Card
              className={classes.card}
              variant='outlined'
            >
              <CardContent>
                <Typography variant='subtitle1'>{`Question ${currentQuestion + 1} of ${numberOfQuestions}`}</Typography>
              </CardContent>
            </Card>
            <QuestionTest
              answer={answers[currentQuestion]}
              handleAnswerChange={value => handleAnswerChange(value)}
              handleNextQuestion={handleNextQuestion}
              handlePreviousQuestion={handlePreviousQuestion}
              hasNext={(hasNext)}
              hasPrevious={(hasPrevious)}
              options={currentMQF.questions[questionArray[currentQuestion]].options}
              question={currentMQF.questions[questionArray[currentQuestion]].question}
              reference={currentMQF.questions[questionArray[currentQuestion]].reference}
            />
          </Grid>
          :
          <React.Fragment />
      }
    </Grid>
  )
}

/*
<Grid container direction='row' justify='center'>
        <Grid item xs={10} md={5}>
          {
            currentMQF.questions.map((question, index) => (
              <QuestionTest
                answerRefs={answerRefs}
                currentQuestion={index}
                key={index}
                options={currentMQF.questions[questionArray[index]].options}
                question={currentMQF.questions[questionArray[index]].question}
              />
            ))
          }
        </Grid>
      </Grid>
      <Fab
        aria-label='submit test'
        className={classes.submit}
        color='primary'
        onClick={checkAnswers}
      >
        <AssignmentTurnedInIcon />
      </Fab>

*/