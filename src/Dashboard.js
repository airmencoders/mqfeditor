import React from 'react'
import { Redirect } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import ResponsiveNavigation from './ResponsiveNavigation'
import SideMenu from './SideMenu'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  card: {
    minWidth: 275,
  },
}))

const Dashboard = (props) => {
  const classes = useStyles()

  const { state } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  if(state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className={classes.root}>
      <ResponsiveNavigation state={state} onMenuClick={handleDrawerToggle} />
      <SideMenu state={state} mobileOpen={mobileOpen} onMenuClick={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction='row' justify='center'>
          <Grid item xs={12}>
            <Card variant='outlined' style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
              <CardContent>
                <Typography variant='h4' align='center'>
                  Select a test to begin.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div >
  )
}

export default Dashboard