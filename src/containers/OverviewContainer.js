import { connect } from 'react-redux'
import Overview from '../components/Overview';

const getVisibleWishLists = (users, filter) => {
  if (filter.user !== 'ALL') {
    users = users.filter(u => {
      return u.name === filter.user
    })
  }
  return users
}

const mapStateToProps = state => {
  return {
    wishes: state.wishes.wishes,
    user: state.users.user,
    allUsers: getVisibleWishLists(state.users.allUsers, state.filter),
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
