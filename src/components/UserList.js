import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import UserFilterContainer from '../containers/UserFilterContainer'

const UserList = (props) => (
  <div className="nav">
      {props.allUsers.map(function(user) {
        var classes = {
          navListItem: true,
          // active: selectedUser === user.name,
          // inactive: selectedUser && selectedUser != user.name
        }

        return <span key={'h_img_' + user.name}>
          <UserFilterContainer user={user} />
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
