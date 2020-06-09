/**
 * ${Summary}
 * 
 * ${Description}
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/fabs/Add.js
 * @author  chris-m92
 * @since   0.24.0
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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'

//----------------------------------------------------------------//
// Material UI Components
//----------------------------------------------------------------//
import Fab from '@material-ui/core/Fab'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  fab: {
    marginTop: theme.spacing(2),
  }
}))

//----------------------------------------------------------------//
// Scroll To Top FAB Component
//----------------------------------------------------------------//
export default ({ handleClick }) => {
  const classes = useStyles()
  const theme = useTheme()

  //----------------------------------------------------------------//
  // Define Transition Duration
  //----------------------------------------------------------------//
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <Fab
      className={classes.fab}
      color='primary'
      onClick={handleClick}
    >
      <AddIcon />
    </Fab>
  )
}