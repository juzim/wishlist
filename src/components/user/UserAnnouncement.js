import PropTypes from 'prop-types'
import React from 'react';
var Linkify = require('react-linkify').default

const Announcement = (props) => (
  <div className="announcement">
    <Linkify properties={{target: '_blank'}}>
      {props.children}
    </Linkify>
  </div>
)

Announcement.propTypes = {
  announcement: PropTypes.string
}

export default Announcement
