import { connect } from 'react-redux'
import UserFilter from '../components/UserFilter'
import { filterUser } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user,
    selected: state.filter.user === ownProps.user.name,
    inactive: state.filter.user !== 'ALL' && state.filter.user !== ownProps.user.name
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
)(UserFilter)

export default UserFilterContainer
