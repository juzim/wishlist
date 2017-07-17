import { FILTER_USER } from '../actions'

const filter = (state = {user: 'ALL'}, action) => {
  switch (action.type) {
    case FILTER_USER:
      if (state.user === action.user.name) {
        return Object.assign({}, state, {
          user: "ALL"
        })
      }
      return {user: action.user.name}
    default:
      return state
  }
}

export default filter
