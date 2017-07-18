import { CREATE_WISH, CREATE_WISH_SUCCESS} from '../actions/wish'

function addItem(array, item) {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
}

const wishes = (state = {wishes: [], isCreating: false}, action) => {
  switch (action.type) {
    // case INITIALIZE:
    //   return action.data.wishes
    case CREATE_WISH:
      return state.merge({
        isCreating: true
      })
    case CREATE_WISH_SUCCESS:
    console.log(action)
      return {
        ...state,
        isCreating: true,
        wishes: addItem(state.wishes, action.wish)
    }
    default:
      return state
  }
}

export default wishes
