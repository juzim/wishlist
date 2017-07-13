import { connect } from 'react-redux'
import Overview from '../components/Overview';

const mapStateToProps = state => {
  return {
    wishes: state.wishes,
    user: state.users.user,
    allUsers: state.users.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onMount: () => {
    //   dispatch(initialize())
    // }
  }
}

const OverviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)

export default OverviewContainer
