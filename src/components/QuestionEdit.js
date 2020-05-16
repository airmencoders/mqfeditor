/**
 * Renders an overview of MQF Test.
 * 
 * Includes an overview of the test meta-data, actions to study, take a test, view trend data,
 * and Admin / Owner actions.
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    MQFOverview.js
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

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  card: {
    //width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
  },
  divider: {
    height: 20,
    margin: 10,
  },
  fullWidthTextField: {
    marginBottom: theme.spacing(3),
  },
  /*radio: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
    checked: {},
  },*/
}))

const Question = ({ answerRefs, optionRefs, question, questionIndex, questionRefs, referenceRefs }) => {
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = React.useState(String.fromCharCode(65 + question.answer))

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  // Initialize the current reference as a 2D array
  optionRefs.current[questionIndex] = []

  return (
    <Card
      className={classes.card}
      key={questionIndex}
      variant='outlined'
    >
      <CardContent name='question'>
        <TextField
          id={`question-${questionIndex + 1}`}
          className={classes.fullWidthTextField}
          defaultValue={question.question}
          fullWidth
          inputRef={value => questionRefs.current[questionIndex] = value }
          label={`Question ${questionIndex + 1}`}
          multiline
        />
        {
          question.options.map((option, optionIndex) => (
            <TextField
              className={classes.fullWidthTextField}
              defaultValue={option}
              fullWidth
              key={`question-${questionIndex}-option-${optionIndex}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Radio
                      checked={selectedValue === String.fromCharCode(65 + optionIndex)}
                      className={classes.radio}
                      //color='default'
                      onChange={handleChange}
                      value={String.fromCharCode(65 + optionIndex)}
                      name={`question-${questionIndex}-option-${optionIndex}`}
                      inputProps={{ 'aria-label': String.fromCharCode(65 + optionIndex) }}
                      inputRef={() => answerRefs.current[questionIndex] = selectedValue}
                    />
                  </InputAdornment>
                )
              }}              
              inputRef={ value => optionRefs.current[questionIndex][optionIndex] = value }
              label={`Option ${String.fromCharCode(65 + optionIndex)}`}
              multiline
            />
          ))
        }
        <TextField
          id={`question-${questionIndex + 1}-reference`}
          className={classes.fullWidthTextField}
          defaultValue={question.reference}
          fullWidth
          inputRef={value => referenceRefs.current[questionIndex] = value}
          label='Reference'
          multiline
        />
      </CardContent>
      <Divider />
      <CardActions>
        <Button variant='contained' color='primary'>Add Option</Button>
        <Button variant='contained' color='secondary'>Delete Question</Button>
      </CardActions>
    </Card>
  )
}

export default Question