import PropTypes from 'prop-types'
import React from 'react'

const UserImage = ({user, onClick}) => (
  <img
    alt={user.name}
    data-tip={user.name}
    src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'}
    onClick={e => {
      e.preventDefault()
      onClick()
    }}>
    </img>
)

UserImage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    announcement: PropTypes.string
  }).isRequired
}

export default UserImage
