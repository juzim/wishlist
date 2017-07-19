import { CREATE_WISH, CREATE_WISH_SUCCESS, DELETE_WISH, DELETE_WISH_SUCCESS} from '../actions/wish'

function addItem(array, item) {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
}

const wishes = (state = {wishes: [], isCreating: false, isLoading: {}}, action) => {
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

    case DELETE_WISH:
      console.log('del')
      let loadings = Object.assign({}, state.isLoading)
      loadings[action.id] = true
      return {
        ...state,
        isLoading: loadings
      }
    case DELETE_WISH_SUCCESS:
    console.log('suc')
      return {
        ...state,
        wishes: state.wishes.filter(w => w._id !== action.id)
    }
    default:
      return state
  }
}

export default wishes
