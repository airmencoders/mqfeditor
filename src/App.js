import React from 'react'
import Dashboard from './Dashboard'
import Login from './Login'
import './App.css'

const handleLogInButtonClick = ({store}) => {
  console.log('Previous state:', store.getState())
  store.dispatch({type: "LOG_IN", auth: true})
  console.log('New state:', store.getState())
}

function App({store}) {
    console.log("rendering")
    console.log("App State:", store.getState())
    return (
      <div className="App">
        {
          (store.getState().isAuthenticated) ?
            <Dashboard store={store} />:
            <Login store={store} onClick={() => {handleLogInButtonClick({store})}} />
        }
      </div>
    )
  
}

export default App
