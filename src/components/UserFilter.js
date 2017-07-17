import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import UserImage from '../components/UserImage'

const UserFilter = ({user, selected, inactive, onClick}) => {
  const classes = {
    selected: selected,
    inactive: inactive
  }

  return (
    <div
      className={classnames(classes)}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}>
        <UserImage user={user} />
    </div>
  )
}

UserImage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    announcement: PropTypes.string
  }).isRequired,
  selected: PropTypes.bool,
  inactive: PropTypes.bool
}

export default UserFilter
