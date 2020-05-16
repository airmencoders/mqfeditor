/**
 * [SUMMARY]
 * 
 * [DESCRIPTION]
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/pages/MQFCreate.js
 * @author  chris-m92
 * @since   x.y.z
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
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'

import ResponsiveNavigation from '../components/ResponsiveNavigation'
import ScrollToTop from '../components/ScrollToTop'
import SideMenu from '../components/SideMenu'

const useStyles = makeStyles((theme) => ({
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  card: {
    marginBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}))

//----------------------------------------------------------------//
// Set up steps

const getSteps = () => {
  return ['Input MQF Information', 'Import PDF', 'Edit Questions']
}

const getStepContent = step => {
  switch (step) {
    case 0:
      return `Input MDS and name for the MQF.`
    case 1:
      return `Import a PDF version of a current MQF.`
    case 2:
      return `Edit questions or add more questions.`
  }
}

//----------------------------------------------------------------//
// COMPONENT CODE
//----------------------------------------------------------------//
const MQFCreate = ({ onLogoutClick, onScrollToTop, state }) => {
  const classes = useStyles()

  let _mds, _name

  //----------------------------------------------------------------//
  // Internal state for handling steps
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

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
  // Handle save button
  const handleSaveClick = () => {
    /*console.log('MDS:', _mds.value)
    console.log('Name:', _name.value)*/
  }

  //----------------------------------------------------------------//
  // Ensure user is authenticated
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className={classes.root}>
      <ResponsiveNavigation
        onMenuClick={handleDrawerToggle}
        onLogoutClick={onLogoutClick}
        state={state}
      />
      <SideMenu
        mobileOpen={mobileOpen}
        onMenuClick={handleDrawerToggle}
        state={state}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card
          className={classes.card}
          variant='outlined'
        >
          <form noValidate autoComplete='off'>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      {
                        activeStep === 0 ? (
                          <React.Fragment>
                            <TextField
                              className={classes.textField}
                              inputRef={value => _mds = value}
                              label='MDS'
                            />
                            <TextField
                              className={classes.textField}
                              inputRef={value => _name = value}
                              label='Test Name'
                            />
                          </React.Fragment>
                        ) : (null)
                      }
                      <div>
                        <Button
                          className={classes.button}
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        <Button
                          className={classes.button}
                          color='primary'
                          onClick={handleNext}
                          variant='contained'
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper
                className={classes.resetContainer}
                elevation={0}
                square
              >
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button className={classes.button} onClick={handleReset}>Reset</Button>
              </Paper>
            )}
          </form>
        </Card>

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

export default MQFCreate