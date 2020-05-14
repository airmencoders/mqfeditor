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
import React from 'react'
import { useParams, Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import ResponsiveNavigation from '../components/ResponsiveNavigation'
import SideMenu from '../components/SideMenu'
import QuestionTest from '../components/QuestionTest'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    // marginLeft: 'auto',
    //marginRight: 'auto',
    minHeight: 300,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  questionFab: {
    marginTop: theme.spacing(2),
  },
}))

//----------------------------------------------------------------//
// COMPONENT CODE
//----------------------------------------------------------------//
const Test = ({ onSeen, state }) => {
  const classes = useStyles()
  const theme = useTheme()
  let { mqfId } = useParams()

  //----------------------------------------------------------------//
  // Define answer references
  const answerRefs = React.useRef([])

  //----------------------------------------------------------------//
  // Internal state for handling the visibility of FABs
  let [hasPrevious, setHasPrevious] = React.useState(false)
  let [hasNext, setHasNext] = React.useState(true)
  let [showSubmit, setShowSubmit] = React.useState(false)

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  //----------------------------------------------------------------//
  // Internal State for handling question changes

  let [currentQuestion, setCurrentQuestion] = React.useState(0)
  const handlePreviousQuestion = () => {
    if (currentQuestion === 1) {
      setHasPrevious(false)
    }
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      if (!hasNext) {
        setShowSubmit(false)

        // Timeout is necessary to make the Next/Submit FAB not interfere with eachother
        setTimeout(() => {
          setHasNext(true)
        }, transitionDuration.exit)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion === currentMQF.questions.length - 2) {
      setHasNext(false)

      // Timeout is necessary to make the Next/Submit FAB not interfere with eachother
      setTimeout(() => {
        setShowSubmit(true)
      }, transitionDuration.exit)
    }

    if (currentQuestion < currentMQF.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      if (!hasPrevious) {
        setHasPrevious(true)
      }
    }
  }

  //----------------------------------------------------------------//
  // Internal state passed to Drawer component

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  //----------------------------------------------------------------//
  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION

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
      onSeen(mqfId, seenMQF)
    }
  }, [])

  //----------------------------------------------------------------//
  // Ensure user is authenticated
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  const checkAnswers = () => {
    answerRefs.current.map((answer, index) => {
      console.log(`answer ${index}:`, answer)
    })
  }
  return (
    <div className={classes.root}>
      <ResponsiveNavigation state={state} onMenuClick={handleDrawerToggle} />
      <SideMenu state={state} mobileOpen={mobileOpen} onMenuClick={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction='row' justify='center'>
          <Grid item xs={10} md={5}>
            <Button variant='contained' onClick={checkAnswers}>Check Answers</Button>
            <QuestionTest
              answerRefs={answerRefs}
              currentMQF={currentMQF}    
              currentQuestion={currentQuestion}
              questionArray={questionArray}
            />
            <Grid container direction='row' justify='space-between'>
              <Grid item>
                <Zoom
                  className={classes.questionFab}
                  in={hasPrevious}
                  timeout={transitionDuration}
                  unmountOnExit
                >
                  <Fab onClick={handlePreviousQuestion}>
                    <KeyboardArrowLeftIcon />
                  </Fab>
                </Zoom>
              </Grid>
              <Grid item>
                <Zoom
                  className={classes.questionFab}
                  in={hasNext}
                  timeout={transitionDuration}
                  unmountOnExit
                >
                  <Fab onClick={handleNextQuestion}>
                    <KeyboardArrowRightIcon />
                  </Fab>
                </Zoom>
                <Zoom
                  className={classes.questionFab}
                  in={showSubmit}
                  timeout={transitionDuration}
                  unmountOnExit
                >
                  <Fab color='primary'>
                    <AssignmentTurnedInIcon />
                  </Fab>
                </Zoom>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default Test