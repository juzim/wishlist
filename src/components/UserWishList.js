import PropTypes from 'prop-types'
import React from 'react';
import UserInfo from './UserInfo'

const UserWishList = (props) => (
  <div className='wishlist'>
    <UserInfo user={props.user}/>
    {props.info}
    <div className="wishes">
        {props.children}
    </div>
  </div>
)

UserWishList.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  info: PropTypes.node
}

export default UserWishList
