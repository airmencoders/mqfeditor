/**
 * Renders a Card with options to edit a MQF Question
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/QuestionEdit.js
 * @author  chris-m92
 * @since   0.11.0
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
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material UI Icons
//----------------------------------------------------------------//
import DeleteIcon from '@material-ui/icons/Delete'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  divider: {
    height: 20,
    margin: 10,
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
}))

//----------------------------------------------------------------//
// Question Edit Component
//----------------------------------------------------------------//
export default ({ answer, handleAnswerChange, handleOptionAdd, handleOptionChange, handleOptionDelete, handleQuestionChange, handleReferenceChange, index, options, question, reference }) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <Card
      variant='outlined'
    >
      <CardContent>
        <Typography variant='h6'>{`Question ${index + 1}`}</Typography>
        <TextField
          className={classes.textField}
          value={question}
          fullWidth
          label='Question'
          multiline
          onChange={event => handleQuestionChange(event.target.value)}
        />
        {
          options.map((option, optionIndex) => (
            <TextField
              className={classes.textField}
              value={option}
              fullWidth
              key={optionIndex}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Radio
                      checked={answer === optionIndex}
                      className={classes.radio}
                      onChange={event => handleAnswerChange(parseInt(event.target.value))}
                      value={optionIndex}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => handleOptionDelete(optionIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </InputAdornment>
                )

              }}
              label={`Option ${String.fromCharCode(65 + optionIndex)}`}
              multiline
              onChange={event => handleOptionChange(optionIndex, event.target.value)}
            />
          ))
        }
        <TextField
          className={classes.textField}
          value={reference}
          fullWidth
          label='Reference'
          multiline
          onChange={event => handleReferenceChange(event.target.value)}
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color='primary'
          onClick={() => handleOptionAdd()}
        >
          Add Option
        </Button>
      </CardActions>
    </Card>
  )
}