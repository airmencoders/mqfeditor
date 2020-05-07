/**
 * Renders a form to Edit an MQF
 * 
 * Allows an administrator or owner 
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    MQFOverview.js
 * @author  chris-m92
 * @since   0.1.0
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
import { useParams, NavLink, Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ListIcon from '@material-ui/icons/List'
import SaveIcon from '@material-ui/icons/Save'

import ResponsiveNavigation from './ResponsiveNavigation'
import ScrollToTop from './ScrollToTop'
import SideMenu from './SideMenu'

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
  blueButton: {
    margin: theme.spacing(1),
  },
  redButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  card: {
    //width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(3),
  },
  wideTextField: {
    margin: theme.spacing(3),
    maxWidth: '700px',
    flexGrow: 1,
  },
  fullWidthTextField: {
    marginBottom: theme.spacing(3),
  },
  redButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const MQFEdit = ({ state, onScrollToTop, onLogoutClick }) => {
  const classes = useStyles()
  let { mqfId } = useParams()

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const handleSnackbarClick = () => {
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION
  const filterMQF = (needle, haystack) => haystack.filter(mqf => mqf.id === needle)
  const currentMQF = filterMQF(mqfId, state.tests)[0]
  const mqfOwner = { ...state.user }

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
                    label='MDS'
                  />
                  <TextField
                    className={classes.textField}
                    defaultValue={currentMQF.name}
                    id='mqf-name'
                    label='MQF Name'
                  />
                  <TextField
                    className={classes.wideTextField}
                    defaultValue={mqfOwner.display}
                    disabled
                    id='mqf-owner'
                    label='Owner'
                    multiline
                  />
                  <TextField
                    className={classes.textField}
                    defaultValue={currentMQF.version + 1}
                    disabled
                    id='mqf-version'
                    label='Version'
                  />
                </Box>
              </Card>
              {
                currentMQF.questions.map((object, index) => (
                  <Card className={classes.card} key={index}>
                    <CardContent>
                      <TextField
                        id={`question-${index + 1}`}
                        className={classes.fullWidthTextField}
                        defaultValue={object.question}
                        fullWidth
                        label={`Question ${index + 1}`}
                        multiline
                      />
                      {
                        object.options.map((option, index) => (
                          <TextField
                            className={classes.fullWidthTextField}
                            defaultValue={option}
                            fullWidth
                            key={index}
                            label={`Option ${String.fromCharCode(65 + index)}`}
                            multiline
                          />
                        ))
                      }

                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        color='primary'
                        variant='contained'
                      >
                        Add Option
                      </Button>
                      <Button
                        className={classes.redButton}
                        variant='contained'
                      >
                        Delete question
                      </Button>
                    </CardActions>
                  </Card>
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
          onClick={handleSnackbarClick}
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