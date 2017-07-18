import {postData} from '../tools/api'
export const CREATE_WISH = 'CREATE_WISH'
export const CREATE_WISH_SUCCESS = 'CREATE_WISH_SUCCESS'

export const createWish = values => {

  return dispatch => postData("wish", values, function(persistedWish) {
      dispatch(persistWishSuccess(persistedWish))
    })
}

export function persistWishSuccess(wish) {
  return {
    type: CREATE_WISH_SUCCESS,
    wish: wish
  }
}
