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
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import QuestionTest from '../components/QuestionTest'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 300,
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
  // Define answer references
  //----------------------------------------------------------------//
  const answerRefs = React.useRef([])

  //----------------------------------------------------------------//
  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION
  //----------------------------------------------------------------//
  let index, currentMQF
  let tempArray = []

  if (state.tests !== null) {
    index = state.tests.findIndex((needle) => needle.id === mqfId)
    currentMQF = state.tests.slice()[index]
    for (let i = 0; i < currentMQF.questions.length; i++) {
      let potentialQuestion = Math.floor(Math.random() * currentMQF.questions.length)

      // Do not allow repeat questions
      while (tempArray.find(value => value === potentialQuestion) !== undefined) {
        potentialQuestion = Math.floor(Math.random() * currentMQF.questions.length)
      }

      tempArray[i] = potentialQuestion
    }
  }
  let [questionArray] = React.useState(tempArray)

  //----------------------------------------------------------------//
  // Hook to mimic componentDidMount() in Class Components
  // Here we update the 'seen' flag for the state
  // Because of how this works, we need to do this before any returns

  React.useEffect(() => {
    // Update the 'seen' state (POTENTIAL TO CHANGE TO THE OVERVIEW PAGE)
    if (state.isAuthenticated === true && state.tests !== null) {
      const seenMQF = {
        ...currentMQF,
        seen: true,
      }
      handleMQFSeen(mqfId, seenMQF)
    }
  }, [])

  //----------------------------------------------------------------//
  // DEBUG - LOG ANSWERS TO CONSOLE
  // TODO  - ALERT IF NOT ALL ANSWERED, VALIDATION
  const checkAnswers = () => {
    answerRefs.current.map((answer, index) => {
      console.log(`answer ${index}:`, answer)
    })
  }

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}