/**
 * Render flashcards to study MQF.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/pages/MQFStudy.js
 * @author  chris-m92
 * @since   0.9.0
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
import ReactCardFlip from 'react-card-flip'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import Next from '../components/fabs/Next'
import Previous from '../components/fabs/Previous'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 300,
  },
}))

//----------------------------------------------------------------//
// Study MQF Component
//----------------------------------------------------------------//
export default ({ handleMQFSeen, handleQuestionStudied, state }) => {
  const classes = useStyles()
  let { mqfId, order } = useParams()

  //----------------------------------------------------------------//
  // Internal state used to handle the flipping of flashcards
  //----------------------------------------------------------------//
  let [isFlipped, setIsFlipped] = React.useState(false)
  const toggleCardFlip = () => {
    setIsFlipped(!isFlipped)
  }

  //----------------------------------------------------------------//
  // Internal state used to handle the changes in questions
  //----------------------------------------------------------------//
  let [currentQuestion, setCurrentQuestion] = React.useState(0)
  const handlePreviousQuestion = () => {
    let timeout = (isFlipped) ? 200 : 0
    setIsFlipped(false)
    setTimeout(() => {
      if (currentQuestion === 0) {
        setCurrentQuestion(currentMQF.questions.length - 1)
      } else {
        setCurrentQuestion(currentQuestion - 1)
      }
    }, timeout)
  }

  const handleNextQuestion = () => {
    let timeout = (isFlipped) ? 200 : 0
    setIsFlipped(false)
    setTimeout(() => {
      if (currentQuestion === currentMQF.questions.length - 1) {
        setCurrentQuestion(0)
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, timeout)
  }

  //----------------------------------------------------------------//
  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION
  //----------------------------------------------------------------//
  let index, currentMQF
  let tempArray = []

  if (state.tests !== null) {
    index = state.tests.findIndex((needle) => needle.id === mqfId)
    currentMQF = state.tests.slice()[index]
    for (let i = 0; i < currentMQF.questions.length; i++) {
      tempArray[i] = i
    }
  }

  const [questionArray, setQuestionArray] = React.useState(tempArray)
  const [questionsPicked, setQuestionsPicked] = React.useState(false)

  //----------------------------------------------------------------//
  // Hook to mimic componentDidMount() in Class Components
  // Here we update the 'seen' flag for the state
  // Because of how useEffect works, we need to accomplish this prior to any returns

  React.useEffect(() => {
    handleMQFSeen(mqfId)
  }, [])

  //----------------------------------------------------------------//
  // Here we test to see if a 'state' for the question order is preserved across renders
  React.useEffect(() => {
    //if (state.tests !== null) {
    let tempArray = []
    for (var tempIndex = 0; tempIndex < currentMQF.questions.length; tempIndex++) {
      if (order === 'random') {
        let potentialQuestion = Math.floor(Math.random() * currentMQF.questions.length)

        // Do not allow repeat questions
        while (tempArray.find(value => value === potentialQuestion) !== undefined) {
          potentialQuestion = Math.floor(Math.random() * currentMQF.questions.length)
        }

        tempArray[tempIndex] = potentialQuestion
      } else {
        tempArray[tempIndex] = tempIndex
      }
      //}
      setQuestionArray(tempArray)
      setQuestionsPicked(true)
    }
  }, [])

  //----------------------------------------------------------------//
  // On each render, depending on if `questionsPicked` or `currentQuestion` change, then we 
  // Run this code, in this case, as long as the questions are picked (questionArray is set)
  // Any time the current question changes, we say that we've studied the question
  React.useEffect(() => {
    if (questionsPicked) {
      handleQuestionStudied(mqfId, questionArray[currentQuestion])
    }
  }, [questionsPicked, currentQuestion])

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <Grid container direction='row' justify='center'>
      {(questionsPicked) ?
        <Grid item xs={10} md={5}>
          <ReactCardFlip
            flipDirection='vertical'
            infinite={true}
            isFlipped={isFlipped}
          >
            <Card
              className={classes.card}
              key='front'
              onClick={toggleCardFlip}
            >
              <CardContent>
                <Typography variant='h6'>{`Question ${currentQuestion + 1} of ${currentMQF.questions.length}`}</Typography>
                <Typography variant='body1' style={{ whiteSpace: 'pre-line' }}>
                  {`${questionArray[currentQuestion] + 1}. ${currentMQF.questions[questionArray[currentQuestion]].question}`}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Grid container direction='column'>
                  {
                    currentMQF.questions[questionArray[currentQuestion]].options.map((option, index) => (
                      <Grid
                        item
                        key={index}
                        xs={10}>
                        <Typography variant='body1' >
                          {`${String.fromCharCode(index + 65)}. ${option}`}
                        </Typography>
                      </Grid>
                    ))
                  }
                </Grid>
              </CardActions>
            </Card>
            <Card
              className={classes.card}
              key='back'
              onClick={toggleCardFlip}
            >
              <CardContent>
                <Typography variant='body1' align='center'>
                  <strong>
                    {
                      `${String.fromCharCode(65 + currentMQF.questions[questionArray[currentQuestion]].answer)}. ${currentMQF.questions[questionArray[currentQuestion]].options[currentMQF.questions[questionArray[currentQuestion]].answer]}`
                    }
                  </strong>
                </Typography>
              </CardContent>
            </Card>
          </ReactCardFlip>
          <Previous
            handleClick={handlePreviousQuestion}
          />
          <Next
            handleClick={handleNextQuestion}
          />
        </Grid>
        :
        <React.Fragment />
      }
    </Grid >
  )
}