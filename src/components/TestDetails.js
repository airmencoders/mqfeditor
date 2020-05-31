/**
 * ${Summary}
 * 
 * ${Description}
 * 
 * @link    TBD
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/TestDetails
 * @author  chris-m92
 * @since   0.19.0
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
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(3),
  },
  title: {
    margin: theme.spacing(3),
  },
}))

//----------------------------------------------------------------//
// Test Details Component
//----------------------------------------------------------------//
export default ({ defaultMDS = '', defaultName = '', _mdsRef, _nameRef }) => {
  const classes = useStyles()

  return (
    <Card
      className={classes.card}
      variant='outlined'
    >
      <Typography
        className={classes.title}
        variant='h6'
      >
        {`[${defaultMDS}] ${defaultName}`}
      </Typography>
      <TextField
        className={classes.textField}
        defaultValue={defaultMDS}
        fullWidth
        inputRef={value => _mdsRef = value}
        label='Test MDS'
      />
      <TextField
        className={classes.textField}
        defaultValue={defaultName}
        fullWidth
        inputRef={value => _nameRef = value}
        label='Test Name'
      />
    </Card>
  )
}