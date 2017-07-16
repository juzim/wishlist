import { connect } from 'react-redux'
import Header from '../components/Header'
import { filterUser } from '../actions'

const mapStateToProps = state => {
  return {
    user: state.users.user,
    allUsers: state.users.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUserClick: () => {
      dispatch(filterUser())
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
