/**
 * Renders a drawer containing MQF Test links.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/SideMenu.js
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
import { NavLink } from 'react-router-dom'

import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}))

const SideMenu = ({ window, state, handleDrawerToggle }) => {
  const classes = useStyles()

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {state.tests.map((test) => (
          <ListItem 
            button
            key={test.id}
            onClick={handleDrawerToggle}
          >
            <NavLink
              style={{ textDecoration: 'none', color: 'initial' }}
              to={`/m/${test.id}`}
            >
              <Badge
                color='secondary'
                invisible={test.seen}
                variant='dot'
              >
                <ListItemText primary={`[${test.mds}] ${test.name}`} />
              </Badge>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <nav className={classes.drawer} aria-label='mqf tests'>
      <Hidden smUp implementation='js'>
        <Drawer
          container={container}
          variant='temporary'
          anchor='left'
          open={state.mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: classes.drawerPaper, }}
          ModalProps={{ keepMounted: true, }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='js'>
        <Drawer
          classes={{ paper: classes.drawerPaper, }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SideMenu