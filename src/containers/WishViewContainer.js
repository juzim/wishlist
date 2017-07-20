import { connect } from 'react-redux'
import WishView from '../components/wish/WishView'
import {deleteWish, editWish} from '../actions/wish'
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: () => {
      dispatch(deleteWish(ownProps.wish._id))
    },
    handleEdit: () => {
      dispatch(editWish(ownProps.wish._id))
    }
  }
}

const WishViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WishView)

export default WishViewContainer
