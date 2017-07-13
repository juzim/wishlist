import PropTypes from 'prop-types'
import React from 'react'
// var classnames = require('classnames');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactTooltip = require("react-tooltip")
// var Button = require('./Button.js');

const Header = ({user}) => (
      <div className='header'>
        <div className="containerLeft">
          <div className="logo">
            Superspecial Wishlist 2.0
          </div>
          <div className="filterContainer">
            {/* <div className="btn-toolbar" role="toolbar">
              <Button
                key='button_filter_all'
                onClick={that.onSelectFilter.bind(null, 'all')}
                text='Alle'
                type={activeFilter == 'all' ? 'info' : "text"}
              />
              <Button
                key='button_filter_grabbable'
                onClick={that.onSelectFilter.bind(null, 'grabbable')}
                text='Frei'
                type={activeFilter == 'grabbable' ? 'info' : "text"}
              />
              <Button
                key='button_filter_grabbedByMe'
                onClick={that.onSelectFilter.bind(null, 'grabbedByMe')}
                text='Von mir geschnappt'
                type={activeFilter == 'grabbedByMe' ? 'info' : "text"}
              />

              <Button
                key='button_filter_archived'
                onClick={this.onSelectFilter.bind(null, 'archived')}
                text='Archiv'
                type={activeFilter == 'archived' ? 'info' : "text"}
              />
            </div> */}
          </div>
        </div>
        <div className="containerRight">
          {/* <div className="logout">
            <span className="profileButton" onClick={onShowShoppingList}>Einkaufsliste ({grabbedWishesCount})</span>&nbsp;-&nbsp;
            <span className="profileButton" onClick={that.props.onNavClick.bind(null, 'yourWishes')}>Deine Wünsche</span>&nbsp;-&nbsp;
            <a href="logout" className="profileButton">Abmelden</a>

          </div> */}
          <div className="profile">
            <img className="profileImage" alt="" src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'}></img>
            <div className="title">Hallo {user.name}!</div>
          </div>
          {/* <div className="nav">
              {users.map(function(user) {
                var classes = {
                  navListItem: true,
                  active: selectedUser === user.name,
                  inactive: selectedUser && selectedUser != user.name
                }

                return <img key={'h_img_' + user.name} data-tip={user.name} className={classnames(classes)} src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'} onClick={that.props.onFaceClick.bind(null, user.name)}></img>
              })}
              {selectedUser ? <div className={classnames("navListItem allUsersButton", {hidden: selectedUser === null})} onClick={that.props.onFaceClick.bind(null, null)}>Alle</div> : ''}
          </div> */}
        </div>
        <ReactTooltip place="top" type="info" effect="solid"/>
        <div className="clearfix"></div>
      </div>
)


Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
}

export default Header
