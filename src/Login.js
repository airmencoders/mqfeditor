import React from 'react'
import Navigation from './Navigation'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import * as AT from './actionTypes'

import cac from './images/cac.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  }
}))

const Login = ({store, onClick}) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Navigation store={store}/>
        <Grid container direction="row" justify="center">
          <Box my={5}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography align="center" variant="h5">
                  Log In to MQF Dashboard
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container direction="row" alignItems="flex-end" justify="space-between">
                  <Grid item xs={3}>
                    <CardMedia component="img" alt="CAC" src={cac} title="CAC" />
                  </Grid>
                  <Grid item>
                    <Button 
                      variant="contained" 
                      onClick={onClick}
                      color="primary"
                    >Log In with CAC</Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Box>
        </Grid>
    </React.Fragment>
  )
}

export default Login