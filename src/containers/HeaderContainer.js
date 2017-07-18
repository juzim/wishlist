import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = state => {
  return {
    user: state.users.user,
    allUsers: state.users.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
