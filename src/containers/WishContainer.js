import { connect } from 'react-redux'
import Wish from '../components/Wish'

const mapStateToProps = (state, ownProps) => {
  const isLoading = state.wishes.isLoading,
  isEditing = state.wishes.isEditing


  return {
    isLoading: isLoading[ownProps.wish._id] === true,
    isEditing: isEditing[ownProps.wish._id] === true
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    // onEditCancel: () => {
    //   dispatch(editWishCancel(ownProps.id))
    // }
  }
}

const WishContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wish)

export default WishContainer
