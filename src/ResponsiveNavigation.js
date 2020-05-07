import React from 'react'
import { NavLink } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}))

const Navigation = ({ state, onMenuClick, onLogoutClick }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open-drawer"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <Typography variant='h6' style={{ color: 'white' }}>
                MQF Dashboard
              </Typography>
            </NavLink>
          </div>
          <div className={classes.grow} />
          {state.isAuthenticated && (
            <div>
              <Button
                aria-label='user account'
                aria-controls='account-menu'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'  
              >
                <Avatar>{`${state.user.first.substring(0,1)}${state.user.last.substring(0,1)}`}</Avatar>
              </Button>
              <Menu
                id='account-menu'
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <NavLink to={`/u/${state.user.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    Account Settings
                  </NavLink>
                </MenuItem>
                <MenuItem onClick={onLogoutClick} >
                    Log Out
                </MenuItem>
                <Divider />
                v0.6.0
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation