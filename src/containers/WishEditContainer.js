import { connect } from 'react-redux'
import WishEdit from '../components/wish/WishEdit'
import { updateWish, editWishCancel } from '../actions/wish'
import { reset } from 'redux-form';

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
      if (values !== ownProps.initialValues) {
        dispatch(updateWish(values, ownProps.id))
      } else {
        dispatch(editWishCancel(ownProps.id))
      }
    },
    onCancel: () => {
      reset('editwish_' + ownProps.id)
      dispatch(editWishCancel(ownProps.id))
    }
  }
}

const WishEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WishEdit)

export default WishEditContainer
