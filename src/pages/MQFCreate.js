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

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'

import ResponsiveNavigation from '../components/ResponsiveNavigation'
import ScrollToTop from '../components/ScrollToTop'
import SideMenu from '../components/SideMenu'

const useStyles = makeStyles((theme) => ({
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
  toolbar: theme.mixins.toolbar,
}))

//----------------------------------------------------------------//
// COMPONENT CODE
//----------------------------------------------------------------//
const MQFCreate = ({ onLogoutClick, onScrollToTop, state }) => {
  const classes = useStyles()

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
        <Grid container direction='row' justify='center'>
          <Grid item xs={10}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h6'>
                  Create a MQF
                </Typography>
                <Typography variant='h6'>
                  TODO: TEXT FIELD FOR NAME
                </Typography>
                <Typography variant='h6'>
                  TODO: TEXT FIELD FOR MDS
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h6'>
                  TODO: PLACEHOLDER FOR IMPORT FIELD.
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h6'>
                  TODO: BOTTOM CARD - ADD QUESTION
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
    </div>
  )
}

export default MQFCreate