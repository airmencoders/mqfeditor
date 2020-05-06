import React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import cac from './images/cac.png'

import Navigation from './Navigation'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    width: 400,
    padding: theme.spacing(1),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flex: '0 0 100%',
    padding: theme.spacing(3),
  },
}))

const Login = ({ state, onClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Navigation state={state} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction="row" justify="center">
          <Card className={classes.card} variant="outlined">
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
        </Grid>
      </main>
    </div>
  )
}

export default Login