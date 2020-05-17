/**
 * Renders a Fab that can be used dynamically for various purposes
 * 
 * Expects a property 'order' to dynamically change height if more than one FAB
 * is expected to be rendered.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/ReusableFab.js
 * @author  chris-m92
 * @since   0.14.0
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

import Fab from '@material-ui/core/Fab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PostAddIcon from '@material-ui/icons/PostAdd'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles(theme=> ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const ReusableFab = ({ handleClick=(f=>f), order=1, state={}, variant}) => {
  const theme = useTheme()
  const classes = useStyles()

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  // Determine various variables
  let _icon, _ariaLabel
  switch(variant) {
    case 'check-answers':
      _ariaLabel = 'check answers'
      _icon = <AssignmentTurnedInIcon />
      break
    case 'create-mqf':
      _ariaLabel = 'create new mqf'  
      _icon = <PostAddIcon />
      break
    case 'next-question':
      _ariaLabel = 'next question'
      _icon = <KeyboardArrowRightIcon />
      break
    case 'prev-question':
      _ariaLabel = 'previous question'
      _icon = <KeyboardArrowLeftIcon />
      break
    case 'save':
      _ariaLabel = 'save changes'
      _icon = <SaveIcon />
      break
    case 'scroll-to-top':
      _ariaLabel = 'scroll to top'
      _icon = <KeyboardArrowUpIcon />
      break
  }

  const fab = (variant === 'scroll-to-top') ?
  (
    <Zoom
      in={state.hasScrolled}
      timeout={transitionDuration}
      unmountOnExit
    >
      <Fab
        aria-label={_ariaLabel}
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: theme.spacing(((order - 1) * 9) + 2),
          right: theme.spacing(2),
        }}
      >
        {_icon}
      </Fab>
    </Zoom>
  ) :
  (variant === 'create-mqf') ?
  (
    <NavLink to={`/m`}>
      <Fab
        aria-label={_ariaLabel}
        className={classes.fab}
        color='primary'
      >
        {_icon}
      </Fab>
    </NavLink>
  ) :
  (
    <Fab
      aria-label={_ariaLabel}
      className={classes.fab}
      color='primary'
      onClick={handleClick}
    >
      {_icon}
    </Fab> 
  )

  return fab
}

export default ReusableFab