import PropTypes from 'prop-types'
import React from 'react'
import UserFilterContainer from '../containers/UserFilterContainer'

const UserList = (props) => (
  <div className="nav">
      {props.allUsers.map(function(user) {
        return <span className="navListItem" key={'h_img_' + user.name}>
          <UserFilterContainer user={user}/>
        </span>
      })}
  </div>
)

UserList.propTypes = {
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      announcement: PropTypes.string
    }).isRequired
  )
}

export default UserList
