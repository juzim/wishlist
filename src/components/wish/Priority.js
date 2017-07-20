import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames';

const Priority = ({priority}) => {
  if (!priority || priority === 2) {
    return null
  }

  const prioMapping = {
    1: {'icon': "🡅", 'text': "Wichtig!"},
    2: {'icon': "", 'text': ""},
    3: {'icon': "🡇", 'text': "Nicht so wichtig…"},
  }
  const prioClasses = {
    "priority": true,
    "fl": true,
    "high": priority === 1,
    "low": priority === 3
  }

  return (
    <span
      className={classnames(prioClasses)}
      data-tip={prioMapping[priority]['text']} >
        {prioMapping[priority]['icon']}
    </span>
    )
}

Priority.propTypes = {
  priority: PropTypes.number
}

export default Priority
