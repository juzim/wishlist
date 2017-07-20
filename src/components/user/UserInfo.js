import PropTypes from 'prop-types'
import React from 'react';
import UserAnnouncement from './UserAnnouncement'
import UserImage from './UserImage'

const UserInfo = (props) => (
  <div className="profile">
    <UserImage user={props.user} />
    <div className="nameBox">
      <div className="name">{props.user.name}</div>
      <div>
        {props.user.announcement !== undefined ? <UserAnnouncement>{props.user.announcement}</UserAnnouncement> : null}
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
