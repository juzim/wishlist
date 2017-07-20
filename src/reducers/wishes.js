import {
  CREATE_WISH,
  CREATE_WISH_SUCCESS,
  DELETE_WISH,
  DELETE_WISH_SUCCESS,
  UPDATE_WISH,
  UPDATE_WISH_SUCCESS,
  EDIT_WISH,
  EDIT_WISH_STOP
} from '../actions/wish'

function replaceItem(array, item) {
    return array.map((i) => {
      if (i._id === item._id) {
        return item
      }
      return i
    })
}

function addItem(array, item) {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
}

const wishes = (state = {wishes: [], isCreating: false, isLoading: {}, isEditing: {}}, action) => {
  let editing, loadings
  switch (action.type) {
    case CREATE_WISH:
      return {
        ...state,
        isCreating: true
      }
    case CREATE_WISH_SUCCESS:
      return {
        ...state,
        isCreating: false,
        wishes: addItem(state.wishes, action.wish)
    }
    case EDIT_WISH:
      editing = Object.assign({}, state.isEditing)
      editing[action.id] = true
      return {
        ...state,
        isEditing: editing
    }
    case EDIT_WISH_STOP:
      editing = Object.assign({}, state.isEditing)
      editing[action.id] = false
      return {
        ...state,
        isEditing: editing
    }
    case UPDATE_WISH:
    case DELETE_WISH:
      loadings = Object.assign({}, state.isLoading)
      loadings[action.id] = true
      return {
        ...state,
        isLoading: loadings
      }
    case DELETE_WISH_SUCCESS:
      return {
        ...state,
        wishes: state.wishes.filter(w => w._id !== action.id)
    }

    case UPDATE_WISH_SUCCESS:
      editing = Object.assign({}, state.isEditing)
      editing[action.wish._id] = false
      loadings = Object.assign({}, state.isLoading)
      loadings[action.wish._id] = false
      return {
        ...state,
        wishes: replaceItem(state.wishes, action.wish),
        isEditing: editing,
        isLoading: loadings
    }
    default:
      return state
  }

}

export default wishes
