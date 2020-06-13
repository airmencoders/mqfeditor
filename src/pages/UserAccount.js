/**
 * [SUMMARY]
 * 
 * [DESCRIPTION]
 * 
 * @link    https://airmencoders.cce.us.af.mil/mqf
 * @link    https://github.com/airmencoders/mqfeditor
 * @file    MQFOverview.js
 * @author  chris-m92
 * @since   x.y.z
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
import { useParams } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
}))


export default ({ state }) => {
  const classes = useStyles()
  let { userId } = useParams()

  const [user, setUser] = React.useState({ ...state.user })

  return (
    <Grid
      container
      direction='row'
      justify='center'>
      <Grid
        item
        xs={10}
      >
        <Card
          className={classes.card}
          variant='outlined'
        >
          <CardContent>
            <Typography variant='h6'>Name and details are pulled from the Air Force Portal and must be changed there.</Typography>
            <Typography variant='body1'>{`Name: ${user.first} ${user.middle}. ${user.last}`}</Typography>
            <Typography variant='body1'>{`Rank: ${user.rank}`}</Typography>
            <Typography variant='body1'>{`MAJCOM: ${user.majcom}`}</Typography>
            <Typography variant='body1'>{`Squadron/Office: ${user.squadron}/${user.office}`}</Typography>
          </CardContent>
        </Card>
        <Card
          className={classes.card}
          variant='outlined'
        >
          <CardContent>
            <Typography variant='h6'>Roles</Typography>
            <Typography variant='body1'>{`Current Role: ${user.role}`}</Typography>
            <Typography variant='body2'>TODO: Radio Buttons to request</Typography>
          </CardContent>
        </Card>
        <Card
          className={classes.card}
          variant='outlined'
        >
          <CardContent>
            <Typography variant='body2'>TODO: List of owned MQFs</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}