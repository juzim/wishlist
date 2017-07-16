import { connect } from 'react-redux'
import UserImage from '../components/UserImage'
import { filterUser } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(filterUser(ownProps.user))
    }
  }
}

const UserFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserImage)

export default UserFilterContainer
