import PropTypes from 'prop-types'
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import UserInfo from './UserInfo'

const UserWishList = (props) => (
  <div className='wishlist'>
    <UserInfo user={props.user}/>
    {props.info}
    <div className="wishes">
      <ReactCSSTransitionGroup transitionName="wish" transitionEnterTimeout={500} transitionLeaveTimeout={1000} >
        {props.children}
      </ReactCSSTransitionGroup>
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
