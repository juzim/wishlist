import { INITIALIZE } from '../actions'

const users = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE:
    return Object.assign({}, state, {
        user: action.data.user,
        allUsers: action.data.allUsers
      })
    default:
      return state
  }
}

export default users
