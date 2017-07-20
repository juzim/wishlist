import PropTypes from 'prop-types'
import React from 'react'

const AddedBy = ({wish, user}) => {
  if (!wish.addedAt || user.name === wish.for || wish.addedBy === wish.for) {
    return null
  }
  const addedAt = new Date(wish.addedAt)
  const date = addedAt.getDate() + '.' + (addedAt.getMonth() + 1) + '.' + addedAt.getFullYear()

  return (
    <div className="field addedBy">
      Hinzugefügt von {wish.addedBy} am {date}
    </div>
  )
}

AddedBy.propTypes = {
  user: PropTypes.shape(),
  wish: PropTypes.shape().isRequired
}

export default AddedBy
