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
import ListIcon from '@material-ui/icons/List'

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
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  childCard: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(3),
  },
}))

const MQFOverview = ({ state, scroll }) => {
  const classes = useStyles()
  let { mqfId } = useParams()

  const [mobileOpen, setMobileOpen] = React.useState(false)

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
      <ResponsiveNavigation state={state} onMenuClick={handleDrawerToggle} />
      <SideMenu state={state} mobileOpen={mobileOpen} onMenuClick={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction='row' justify='center'>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5'>{currentMQF.name}</Typography>
                <Typography variant='h6'>{`MDS: ${currentMQF.mds}`}</Typography>
                <Typography variant='subtitle1'>{`Created by: ${mqfOwner.display}`}</Typography>
                <Typography variant='body1'>{`Version: ${currentMQF.version}`}</Typography>
                <Typography variant='body1'>{`Date Created: ${currentMQF.date}`}</Typography>
                <Typography variant='body1'>{`Number of questions: ${currentMQF.questions.length}`}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Show actions only if test owner / admin */}
          <Grid item xs={12}>
            <Card className={classes.childCard}>
              <CardActions>
                <Box display='flex' direction='row' flexWrap='wrap'>
                  <NavLink to={`/m/${mqfId}/t`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary' className={classes.blueButton} startIcon={<ListIcon />}>Take Practice Test</Button>
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
            currentMQF.questions.map((object, index) => (
              <Card className={classes.childCard} key={index}>
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
            ))
          }
        </Grid>
        <ScrollToTop state={state} scroll={scroll} />
      </main>
    </div>
  )
}

export default MQFOverview