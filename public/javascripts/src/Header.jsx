var React = require('react');
var classnames = require('classnames');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ReactTooltip = require("react-tooltip")

module.exports = React.createClass({
  displayName: "Header",
  getInitialState: function() {
    return {
      filter: 'all',
    }
  },
  onSelectFilter: function(filter) {
    this.setState({
      filter: filter
    });

    this.props.onSelectFilter(filter);
  },
  render: function() {
    var that = this, selectedUser = this.props.selectedUser;

    return (
      <div className='header'>
        <div className="containerLeft">
          <div className="logo">
            Superspecial Wishlist 2.0
          </div>
          <div className="filterContainer">
            Filter:
            <ul className="filterList">
              <li className={classnames({selected: this.state.filter === 'all'})} onClick={this.onSelectFilter.bind(null, 'all')}>Alle</li>
              <span className="spacer">&middot;</span>
              <li className={classnames({selected: this.state.filter === 'grabbable'})} onClick={this.onSelectFilter.bind(null, 'grabbable')}>Frei</li>
              <span className="spacer">&middot;</span>
              <li className={classnames({selected: this.state.filter === 'grabbedByMe'})} onClick={this.onSelectFilter.bind(null, 'grabbedByMe')}>Von mir geschnappt</li>
            </ul>
          </div>
        </div>
        <div className="containerRight">
          <div className="logout">
            <span className="profileButton" onClick={this.props.onShowShoppingList}>Einkaufsliste ({this.props.grabbedWishesCount})</span>&nbsp;-&nbsp;
            <span className="profileButton" onClick={that.props.onNavClick.bind(null, 'yourWishes')}>Deine Wünsche</span>&nbsp;-&nbsp;
            <a href="logout" className="profileButton">Abmelden</a>

          </div>
          <div className="profile">
            <img className="profileImage" src={this.props.user.imageUrl ? "images/user/" + this.props.user.imageUrl : 'images/default-profile.png'}></img>
            <div className="title">Hallo {this.props.user.name}!</div>
          </div>
          <div className="nav">
            <div className="addButton navListItem" onClick={that.props.onNavClick.bind(null, 'addWish')}>Neuer Wunsch</div>
              {this.props.users.map(function(user) {
                var classes = {
                  navListItem: true,
                  active: selectedUser === user.name,
                  inactive: selectedUser && selectedUser != user.name
                }

                return <img key={'h_img_' + user.name} data-tip={user.name} className={classnames(classes)} src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'} onClick={that.props.onFaceClick.bind(null, user.name)}></img>
              })}
              {selectedUser ? <div className={classnames("navListItem allUsersButton", {hidden: selectedUser === null})} onClick={that.props.onFaceClick.bind(null, null)}>Alle</div> : ''}
          </div>
        </div>
        <ReactTooltip place="top" type="info" effect="solid"/>
        <div className="clearfix"></div>
      </div>
    )
  }
});
