import { combineReducers } from 'redux'
import wishes from './wishes'
import users from './users'

const wishlistApp = combineReducers({
  wishes,
  users
})

export default wishlistApp
