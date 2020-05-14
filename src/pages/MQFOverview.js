/**
 * Renders an overview of MQF Test
 * 
 * Includes an overview of the test meta-data, actions to study, take a test, view trend data,
 * and Admin / Owner actions
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
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'

import ResponsiveNavigation from '../components/ResponsiveNavigation'
import ScrollToTop from '../components/ScrollToTop'
import SideMenu from '../components/SideMenu'

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
    color: theme.palette.getContrastText(theme.palette.error.main)
  },
  card: {
    // width: '100%',
    //marginLeft: 'auto',
    //marginRight: 'auto',
    marginBottom: theme.spacing(3),
  },
}))

const MQFOverview = ({ state, onScrollToTop, onLogoutClick }) => {
  const classes = useStyles()
  let { mqfId } = useParams()

  //----------------------------------------------------------------//
  // Internal state passed to Drawer component

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  //----------------------------------------------------------------//
  // Ensure user is authenticated

  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  //----------------------------------------------------------------//
  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION

  const index = state.tests.findIndex((needle) => needle.id === mqfId)

  // index === -1 when MQF ID was not found
  if (index === -1) {
    return (
      <Redirect to='/dashboard' />
    )
  }

  const currentMQF = state.tests.slice()[index]
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
        <Grid container direction='row' justify='center'>
          <Grid item xs={10}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>{currentMQF.name}</Typography>
                <Typography variant='h6'>{`MDS: ${currentMQF.mds}`}</Typography>
                <Typography variant='subtitle1'>{`Created by: ${mqfOwner.rank} ${mqfOwner.first} ${mqfOwner.last}, ${mqfOwner.squadron}/${mqfOwner.office}`}</Typography>
                <Typography variant='body1'>{`Version: ${currentMQF.version}`}</Typography>
                <Typography variant='body1'>{`Date Created: ${currentMQF.date}`}</Typography>
                <Typography variant='body1'>{`Number of questions: ${currentMQF.questions.length}`}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Show actions only if test owner / admin */}
          <Grid item xs={10}>
            <Card className={classes.card}>
              <CardActions>
                <Box display='flex' direction='row' flexWrap='wrap'>
                  <NavLink to={`/m/${mqfId}/s/sequential`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary' className={classes.blueButton} startIcon={<SpeakerNotesIcon />}>Study (Sequential)</Button>
                  </NavLink>
                  <NavLink to={`/m/${mqfId}/s/random`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary' className={classes.blueButton} startIcon={<ShuffleIcon />}>Study (Random)</Button>
                  </NavLink>
                  <NavLink to={`/m/${mqfId}/t`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary' className={classes.blueButton} startIcon={<ListAltIcon />}>Take Practice Test</Button>
                  </NavLink>

                  {(state.user.role === 'admin' || state.user.id === currentMQF.owner) ?
                    (
                      <React.Fragment >
                        <NavLink to={`/m/${mqfId}/e`} style={{ textDecoration: 'none' }}>
                          <Button variant='contained' color='primary' className={classes.blueButton} startIcon={<EditIcon />}>Edit Test</Button>
                        </NavLink>
                        <Button variant='contained' className={classes.redButton} startIcon={<DeleteIcon />}>Delete Test</Button>

                      </React.Fragment>
                    ) :
                    (null)
                  }
                </Box>
              </CardActions>
            </Card>
          </Grid>
          {
            // THIS IS BEING MOVED TO THE 'STUDY' PAGE
            // INSTEAD, THIS WILL SHOW TREND ITEMS, MISSED QUESTIONS, COMPARE TO ALL USERS WHEN IT COMES TO SCORES, ETC...
            /*currentMQF.questions.map((object, index) => (
              <Grid item xs={10} key={index}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant='body1'>{`${index + 1}. ${object.question}`}</Typography>
                    {
                      object.options.map((option, index) => (
                        (index === object.answer) ?
                          <Typography variant='subtitle1' key={index}><strong>{`${String.fromCharCode(65 + index)}. ${option}`}</strong></Typography> :
                          <Typography variant='subtitle1' key={index}>{`${String.fromCharCode(65 + index)}. ${option}`}</Typography>
                      ))
                    }
                    <Typography variant='subtitle1'><i>{`Reference: ${object.reference}`}</i></Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))*/
          }
        </Grid>
        <ScrollToTop
          onScrollToTop={onScrollToTop}
          order={1}
          state={state}
        />
      </main>
    </div>
  )
}

export default MQFOverview