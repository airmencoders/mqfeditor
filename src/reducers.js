import * as AT from './actionTypes'

const userAuthentication = (state, action) => {
  switch(action.type) {
    case AT.LOG_IN:
      return (
        {
          ...state,
          isAuthenticated: action.auth,
        }
      )
    case AT.LOG_OUT:
      return (
        {
          ...state,
          isAuthenticated: action.auth,
        }
      )
    default:
      return state
  }
}

export { userAuthentication }