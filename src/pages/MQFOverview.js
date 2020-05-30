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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import { useParams, NavLink, Redirect } from 'react-router-dom'

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import ScrollToTop from '../components/fabs/ScrollToTop'
import SideMenu from '../components/SideMenu'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
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
    marginBottom: theme.spacing(3),
  },
}))

//----------------------------------------------------------------//
// MQF Overview Component
//----------------------------------------------------------------//
export default ({ handleDrawerToggle, handleLogoutClick, handleMQFDelete, handleScrollToTop, state }) => {
  const classes = useStyles()
  let { mqfId } = useParams()

  //----------------------------------------------------------------//
  // Ensure user is authenticated
  //----------------------------------------------------------------//
  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  //----------------------------------------------------------------//
  // SERVERLESS DEVELOPMENT ONLY, USE API FOR PRODUCTION
  //----------------------------------------------------------------//
  const index = state.tests.findIndex((needle) => needle.id === mqfId)

  // index === -1 when MQF ID was not found
  if (index === -1) {
    return (
      <Redirect to='/' />
    )
  }

  const currentMQF = state.tests.slice()[index]
  const mqfOwner = { ...state.user }

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <div className={classes.root}>
      <ResponsiveNavigation
        handleDrawerToggle={handleDrawerToggle}
        handleLogoutClick={handleLogoutClick}
        state={state}
      />
      <SideMenu
        handleDrawerToggle={handleDrawerToggle}
        state={state}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction='row' justify='center'>
          <Grid item xs={10}>
            <Card
              className={classes.card}
              variant='outlined'
            >
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
            <Card
              className={classes.card}
              variant='outlined'
            >
              <CardActions>
                <Box
                  direction='row'
                  display='flex'
                  flexWrap='wrap'
                >
                  <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/m/${mqfId}/s/sequential`}
                  >
                    <Button
                      className={classes.blueButton}
                      color='primary'
                      startIcon={<SpeakerNotesIcon />}
                      variant='contained'
                    >
                      Study (Sequential)
                    </Button>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/m/${mqfId}/s/random`}
                  >
                    <Button
                      className={classes.blueButton}
                      color='primary'
                      startIcon={<ShuffleIcon />}
                      variant='contained'
                    >
                      Study (Random)
                    </Button>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/m/${mqfId}/t`}
                  >
                    <Button
                      className={classes.blueButton}
                      color='primary'
                      startIcon={<ListAltIcon />}
                      variant='contained'
                    >
                      Take Practice Test
                    </Button>
                  </NavLink>

                  {(state.user.role === 'admin' || state.user.id === currentMQF.owner) ?
                    (
                      <React.Fragment>
                        <NavLink
                          style={{ textDecoration: 'none' }}
                          to={`/m/${mqfId}/e`}
                        >
                          <Button
                            className={classes.blueButton}
                            color='primary'
                            startIcon={<EditIcon />}
                            variant='contained'
                          >
                            Edit Test
                          </Button>
                        </NavLink>
                        <Button
                          className={classes.redButton}
                          onClick={() => handleMQFDelete(mqfId)}
                          startIcon={<DeleteIcon />}
                          variant='contained'
                        >
                          Delete Test
                        </Button>
                      </React.Fragment>
                    ) :
                    (null)
                  }
                </Box>
              </CardActions>
            </Card>
            <Card
              className={classes.card}
              variant='outlined'
            >
              <CardContent>
                {
                  currentMQF.questions.map((question, index) => (
                    <Typography
                      key={index}
                      variant='body1'
                    >
                      {`${index + 1}. Studied ${question.timesStudied} times.`}
                    </Typography>
                  ))
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <ScrollToTop
          handleScrollToTop={handleScrollToTop}
          order={1}
          state={state}
        />
      </main>
    </div >
  )
}