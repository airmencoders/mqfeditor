/**
 * Renders User Dashboard
 * 
 * Dashboard includes a side menu of site MQFs along. Future updates may include
 * information about testing trend data, news posts, etc.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/pages/Dashboard.js
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
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import DashboardStats from '../components/DashboardStats'
import ResponsiveNavigation from '../components/ResponsiveNavigation'
import SideMenu from '../components/SideMenu'
import CreateMqf from '../components/fabs/CreateMqf'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}))

const Dashboard = ({ handleDrawerToggle, handleLogoutClick, state }) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Ensure user is authenticated

  if (state.isAuthenticated === false) {
    return (
      <Redirect to='/' />
    )
  }

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
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Grid item xs={8}>
            <DashboardStats />
          </Grid>
        </Grid>
      </main>
      {(state.user.role === 'admin') ? <CreateMqf /> : null}
    </div >
  )
}

export default Dashboard