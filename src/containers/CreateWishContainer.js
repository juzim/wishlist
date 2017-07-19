import { connect } from 'react-redux'
import CreateWish from '../components/CreateWish'
import { createWish } from '../actions/wish'
import { reset } from 'redux-form';

const mapStateToProps = (state) => {
  return {
    wish: {},
    userNames: state.users.allUsers.map((u) => {return u.name}),
    currentUser: state.users.user.name,
    isCreating: state.wishes.isCreating
  }
}

const mapDispatchToProps = (dispatch, values) => {
  return {
    onSubmit: (values) => {
      dispatch(createWish(values))
      // @todo handle validation and errors first
      dispatch(reset('createWish'));
    },
    handleReset: () => {
      dispatch(reset('createWish'))
    }
  }
}

const CreateWishContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWish)

export default CreateWishContainer
