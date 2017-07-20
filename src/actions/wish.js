import {postData, sendDelete, updateData} from '../tools/api'
export const CREATE_WISH = 'CREATE_WISH'
export const CREATE_WISH_SUCCESS = 'CREATE_WISH_SUCCESS'
export const DELETE_WISH = 'DELETE_WISH'
export const DELETE_WISH_SUCCESS = 'DELETE_WISH_SUCCESS'
export const UPDATE_WISH = 'UPDATE_WISH'
export const UPDATE_WISH_SUCCESS = 'UPDATE_WISH_SUCCESS'

export const EDIT_WISH = 'EDIT_WISH'
export const EDIT_WISH_STOP = 'EDIT_WISH_STOP'

export const editWish = (id) => {
  return {
    type: EDIT_WISH,
    id
  }
}


export const editWishCancel = (id) => {
  return {
    type: EDIT_WISH_STOP,
    id
  }
}

export const createWish = values => {
  return dispatch =>{
      dispatch(createWishInit())
      postData("wish", values, function(persistedWish) {
        dispatch(persistWishSuccess(persistedWish))
      })
  }
}

export function createWishInit() {
  return {
    type: CREATE_WISH
  }
}

export const updateWish = (values, id) => {
  return dispatch => {
      dispatch(updateWishInit(id))
      updateData("wish", values, function(persistedWish) {
        dispatch(updateWishSuccess(persistedWish))
      })
  }
}

export function updateWishInit(id) {
  return {
    type: UPDATE_WISH,
    id: id
  }
}

export function updateWishSuccess(wish) {
  return {
    type: UPDATE_WISH_SUCCESS,
    wish: wish
  }
}

export function persistWishSuccess(wish) {
  return {
    type: CREATE_WISH_SUCCESS,
    wish: wish
  }
}

export const deleteWish = id => {
  return dispatch =>
    {
      dispatch(deleteWishInit(id))
      sendDelete("wish", id, function() {
        dispatch(deleteWishSuccess(id))
      })
  }
}

export function deleteWishInit(id) {
  return {
    type: DELETE_WISH,
    id: id
  }
}

export function deleteWishSuccess(id) {
  return {
    type: DELETE_WISH_SUCCESS,
    id: id
  }
}
