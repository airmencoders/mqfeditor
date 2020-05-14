/**
 * Renders a FAB to scroll to top of page when clicked.
 * 
 * Expects a property 'order' to dynamically change height if more than one FAB
 * is expected to be rendered.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/ScrollToTop.js
 * @author  chris-m92
 * @since   0.5.0
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

import Fab from '@material-ui/core/Fab'
import { useTheme } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const ScrollToTop = ({ state, onScrollToTop, order }) => {
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
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}

export default ScrollToTop