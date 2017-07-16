import PropTypes from 'prop-types'
import React from 'react';
import Announcement from './Announcement'

const UserInfo = (props) => (
  <div className="profile">
    <img className="profileImage" alt='' src={props.user.imageUrl ? "images/user/" + props.user.imageUrl : 'images/default-profile.png'}></img>
    <div className="nameBox">
      <div className="name">{props.user.name}</div>
      <div>
        <Announcement>{props.user.announcement}</Announcement>
      </div>
    </div>
    <div className="anchor" id={'anc_' + props.user.name}></div>
  </div>
)

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    announcement: PropTypes.string
  }).isRequired
}

export default UserInfo
