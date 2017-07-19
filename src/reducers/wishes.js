import { CREATE_WISH, CREATE_WISH_SUCCESS, DELETE_WISH, DELETE_WISH_SUCCESS} from '../actions/wish'

function addItem(array, item) {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
}

const wishes = (state = {wishes: [], isCreating: false}, action) => {
  switch (action.type) {
    case CREATE_WISH:
      return state.merge({
        isCreating: true
      })
    case CREATE_WISH_SUCCESS:
      return {
        ...state,
        isCreating: true,
        wishes: addItem(state.wishes, action.wish)
    }

    case DELETE_WISH:
      return state.merge({
        isCreating: true
      })
    case DELETE_WISH_SUCCESS:
      return {
        ...state,
        isCreating: true,
        wishes: state.wishes.filter(w => w._id !== action.id)
    }
    default:
      return state
  }
}

export default wishes
