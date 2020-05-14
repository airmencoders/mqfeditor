/**
 * Renders a testable question card
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    /src/components/QuestionTest.js
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
import React from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  card: {
    //width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(3),
  },
  answeredQuestion: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
    color: 'green',
    fontWeight: 'bold',
  },
  pendingQuestion: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
    color: 'red',
    fontWeight: 'bold',
  },
}))



const QuestionTest = ({ answerRefs, currentMQF, currentQuestion, questionArray }) => {

  const classes = useStyles()
  const [selectedValue, setSelectedValue] = React.useState('')

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  console.log('currentQuestion:', currentQuestion)
  console.log(`answer for question ${currentQuestion}:`, selectedValue)

  return (
    <Card className={classes.card}>
      <CardContent>
        {
          // TESTING
          // Color changing depending if the user has an answer for the given question
          currentMQF.questions.map((value, index) => (
            <Typography className={(answerRefs[index]) ? classes.answeredQuestion : classes.pendingQuestion} key={index}>{`${index + 1} `}</Typography>
          ))
        }
      </CardContent>
      <Divider />
      <CardContent>
        {currentMQF.questions[questionArray[currentQuestion]].question}
      </CardContent>
      <Divider />
      <CardActions>
        <FormControl component='fieldset'>
          <RadioGroup
            name={`question-${currentQuestion}-options`}
            onChange={handleChange}
            value={selectedValue}
          >
            {
              currentMQF.questions[questionArray[currentQuestion]].options.map((value, index) =>
                (
                  <FormControlLabel
                    control={<Radio />}
                    inputRef={() => answerRefs.current[currentQuestion] = selectedValue}
                    key={index}
                    label={value}
                    name={`question-${currentQuestion}-option-${index}`}
                    value={`${index}`}
                  />
                ))
            }
          </RadioGroup>
        </FormControl>
      </CardActions>
    </Card>
  )
}

export default QuestionTest