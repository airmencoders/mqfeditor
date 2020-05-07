import React from 'react'
import { useParams, Redirect } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

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
}))

const Test = ({ state, scroll }) => {
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

  return (
    <div classname={classes.root}>
      <ResponsiveNavigation state={state} onMenuClick={handleDrawerToggle} />
      <SideMenu state={state} mobileOpen={mobileOpen} onMenuClick={handleDrawerToggle} />
      <main className={classes.content}>
        <div classname={classes.toolbar} />
        <ScrollToTop state={state} scroll={scroll} />
      </main>
    </div>
	)
}

export default Test