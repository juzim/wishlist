import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const UserImage = (props) => {
  const classes = {
    profileImage: true
  },
  basePath = "http://localhost:3001/images/",
  user = props.user;

  return (
    <img
      className={classnames(classes)}
      alt={user.name}
      data-tip={user.name}
      src={basePath + (user.imageUrl ? "user/" + user.imageUrl : 'images/default-profile.png')}
    />
  )
}

UserImage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    announcement: PropTypes.string
  }).isRequired
}

export default UserImage
