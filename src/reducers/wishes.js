import { INITIALIZE } from '../actions'

const wishes = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE:
      return action.data.wishes
    default:
      return state
  }
}

export default wishes
