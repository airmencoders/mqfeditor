/**
 * Renders a Material-UI Snackbar
 * 
 * Purpose is to abstract away some of the code from the pages
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/Snackbar.js
 * @author  chris-m92
 * @since   0.15.0
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
// Material UI Core Components
//----------------------------------------------------------------//
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import CloseIcon from '@material-ui/icons/Close'

//----------------------------------------------------------------//
// CustomSnackbar Component
//----------------------------------------------------------------//
export default ({ handleSnackbarClose, message, open }) => {

  //----------------------------------------------------------------//
  // Handle Snackbar Close
  //----------------------------------------------------------------//
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleSnackbarClose()
  }

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={5000}
      open={open}
      onClose={snackbarClose}
      message={message}
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          onClick={snackbarClose}
          size='small'
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    />
  )
}