import { connect } from 'react-redux'
import WishEdit from '../components/wish/WishEdit'
import { updateWish, editWishCancel } from '../actions/wish'
// import { reset } from 'redux-form';

const mapStateToProps = (state) => {
  return {
    userNames: state.users.allUsers.map((u) => {return u.name}),
    currentUser: state.users.user.name,
    isUpdating: state.wishes.isCreating
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      dispatch(updateWish(values, ownProps.id))
    },
    onCancel: () => {
      dispatch(editWishCancel(ownProps.id))
    }
  }
}

const WishEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WishEdit)

export default WishEditContainer
