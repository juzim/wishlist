import { FILTER_USER } from '../actions'

const filter = (state = {user: 'ALL'}, action) => {
  switch (action.type) {
    case FILTER_USER:
      return action.user.name
    default:
      return state
  }
}

export default filter
