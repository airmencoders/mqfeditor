/**
 * Renders User Dashboard
 * 
 * Dashboard includes a side menu of site MQFs along. Future updates may include
 * information about testing trend data, news posts, etc.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    Dashboard.js
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
import { NavLink, Redirect } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import PostAddIcon from '@material-ui/icons/PostAdd'

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
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    // left: drawerWidth + theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

const Dashboard = ({ state, onLogoutClick }) => {
  const classes = useStyles()
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
          <Grid item xs={12}>
            <Card variant='outlined' className={classes.card}>
              <CardContent>
                <Typography variant='h6'>
                  {`Tests in Progress: 0`}
                </Typography>
                <Typography variant='h6'>
                  {`Tests studied: 0`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
      {
        (state.user.role === 'admin' || state.user.role === 'staneval') ?
          (
            <NavLink to={`/m`}>
              <Fab color='primary' /*variant='extended'*/ aria-label='create mqf' className={classes.fab}>
                <PostAddIcon />
                {/*Add MQF*/}
              </Fab>
            </NavLink>
          ) :
          (null)
      }
    </div >
  )
}

export default Dashboard