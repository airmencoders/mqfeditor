import React from 'react'
import Navigation from './Navigation'
import Button from '@material-ui/core/Button'

const Dashboard = ({store}) => { 
  return (
    <React.Fragment>
      <Navigation store={store} />
      <h1>MQF Dashboard</h1> 
      <Button variant="contained" color="primary">Log Out</Button>
    </React.Fragment>
  )
}

export default Dashboard