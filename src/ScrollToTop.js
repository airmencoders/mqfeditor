/**
 * 
 */
import React from 'react'

import Fab from '@material-ui/core/Fab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'

import UpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(11),
    right: theme.spacing(2),
  },
}))

const ScrollToTop = ({ state, onScrollToTop, order }) => {
  const classes = useStyles()
  const theme = useTheme()

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  return (
    <Zoom
      in={state.hasScrolled}
      timeout={transitionDuration}
      unmountOnExit
    >
      <Fab
        aria-label='scroll to top'
        onClick={onScrollToTop}
        style={{
          position: 'fixed',
          bottom: theme.spacing(((order - 1) * 9) + 2),
          right: theme.spacing(2)
        }}
      >
        <UpIcon />
      </Fab>
    </Zoom>
  )
}

export default ScrollToTop