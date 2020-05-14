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
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
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



const QuestionTest = ({ answerRefs, currentQuestion, options, question }) => {

  const classes = useStyles()
  const [selectedValue, setSelectedValue] = React.useState('')

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6'>{question}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container direction='column'>
          {
            options.map((option, index) => (
              <Grid item xs={12} key={index}>
                <Radio
                  onChange={handleChange}
                  value={`${index}`}
                  name={`question-${currentQuestion}-option-${index}`}
                  inputProps={{ 'aria-label': option }}
                  inputRef={() => answerRefs.current[currentQuestion] = selectedValue}
                />
                {option}
              </Grid>
            ))
          }
        </Grid>
      </CardActions>
    </Card>
  )
}

export default QuestionTest