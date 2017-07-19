import { connect } from 'react-redux'
import Wish from '../components/Wish'
import {deleteWish} from '../actions/wish'
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: () => {
      dispatch(deleteWish(ownProps.wish._id))
    }
  }
}

const WishContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Wish)

export default WishContainer
