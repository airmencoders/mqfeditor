import React from 'react'
import { NavLink } from 'react-router-dom'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

import PostAddIcon from '@material-ui/icons/PostAdd'

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
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: drawerWidth + theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

const SideMenu = (props) => {
  const classes = useStyles()

  const { window } = props
  const { state } = props
  const { onMenuClick } = props
  const { mobileOpen } = props

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {state.tests.map((test) => (
          <ListItem button key={test.id} onClick={onMenuClick} >
            <NavLink to={`/m/${test.id}`} style={{ textDecoration: 'none', color: 'initial' }}>
              <ListItemText primary={`[${test.mds}] ${test.name}`} />
            </NavLink>
          </ListItem>
        ))}
      </List>
      {
        (state.user.role === 'admin' || state.user.role === 'staneval') ?
          (
            <NavLink to={`/m`}>
              <Fab color='primary' variant='extended' aria-label='create mqf' className={classes.fab}>
                <PostAddIcon className={classes.extendedIcon} />
                Add MQF
              </Fab>
            </NavLink>
          ) :
          (null)
      }
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
          open={mobileOpen}
          onClose={onMenuClick}
          classes={{ paper: classes.drawerPaper, }}
          modalProps={{ keepMounted: true, }}
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