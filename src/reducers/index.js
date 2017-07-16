import { combineReducers } from 'redux'
import wishes from './wishes'
import users from './users'
import filter from './filter'

const wishlistApp = combineReducers({
  wishes,
  users,
  filter
})

export default wishlistApp
