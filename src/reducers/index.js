import { combineReducers } from 'redux'
import wishes from './wishes'
import users from './users'
import filter from './filter'
import { reducer as formReducer } from 'redux-form'

const wishlistApp = combineReducers({
  wishes,
  users,
  filter,
  form: formReducer
})

export default wishlistApp
