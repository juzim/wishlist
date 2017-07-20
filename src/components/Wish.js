import PropTypes from 'prop-types'
import WishViewContainer from '../containers/WishViewContainer'
import WishEditContainer from '../containers/WishEditContainer'
// import Button from './Button'
import classnames from 'classnames';
import React from 'react'

class Wish extends React.Component {
  render() {
    var classes = {
      wish: true,
      disabled: this.props.isLoading
    }
    const user = this.props.user, wish = this.props.wish

    const content = this.props.isEditing ?
      <WishEditContainer
        initialValues={wish}
        form={'editwish_' + wish._id}
        id={wish._id}
      /> :
        <WishViewContainer
          wish={wish}
          user={user}
          canEdit={wish.addedBy === user.name || user.isAdmin}
      />

    return (
      <div className={classnames(classes)}>
        <div className="anchor" id={"anc_wish_" + this.props.wish._id}></div>
          {content}
        <div className="clearfix"></div>
      </div>
    )
  }
}

Wish.propTypes = {
  wish: PropTypes.shape()
}

export default Wish
