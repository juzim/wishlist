var React = require('react');
var Wish = require('./Wish.jsx');
var CreateWish = require('./CreateWish.jsx');
var Header = require('./Header.jsx');
var ShoppingList = require('./ShoppingList.jsx');
var classnames = require('classnames');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  displayName: "Overview",
  getInitialState: function() {
    return {
      user: null,
      allWishes: [],
      allUsers: [],
      loading: true,
      filter: 'all',
      showShoppingList: false,
      selectedUser: null
    };
  },
  componentDidMount: function() {
    var url = window.location.href;

    window.history.pushState({}, document.title, url.split("?")[0]);

    that = this;

    this.doAjaxCall(
      'api/lists/',
      'GET',
      {},
      function(data) {
        that.setState({
          user: data.user,
          allUsers: data.allUsers,
          allWishes: data.wishes,
          filteredWishes: data.wishes,
          ownWishes: data.ownWishes
        });
      }
    );
  },
  componentDidUpdate: function() {
    if (this.state.selectedUser) {
      this.handleScrollToId(this.state.selectedUser);
    }
  },
  doAjaxCall: function(url, method, data, callback) {
    var that = this;

    this.setState({
      loading: true
    });

    $.ajax({
      url: url,
      data: data,
      method: method,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data.success) {
          callback(data);
        } else {
          alert('Fehler: ' + data.error);
        }

        that.setState({
          loading: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getOwnWishes: function() {
    var currentUser = this.state.user.name;
    return this.state.allWishes.filter(function(wish) {
      return wish.for === currentUser && wish.addedBy === currentUser;
    });
  },
  handleSelectFilter: function(filter) {
    this.setState({
      filter: filter
    })
  },
  getFilteredWishes: function() {
    var that = this, wishes = [];

    if (this.state.selectedUser) {
      wishes = this.state.allWishes.filter(function(wish) {
        return wish.for === that.state.selectedUser;
      })
    } else {
      wishes = this.state.allWishes;
    }

    if (this.state.filter === 'all') {
      filteredWishes = wishes;
    } else if (this.state.filter === 'grabbable') {
      filteredWishes = wishes.filter(function(wish) {
        return !wish.grabbedBy;
      })
    } else if (this.state.filter === 'grabbedByMe') {
      filteredWishes = wishes.filter(function(wish) {
        return wish.grabbedBy === that.state.user.name;
      })
    }

    return filteredWishes;

    // filteredWishes.filter(function(wish) {
    //   return that.state.selectedFaces[wish.for] != undefined;
    // });
  },
  getWishesForUser: function(name) {
    var wishes = this.getFilteredWishes();
    return wishes.filter(function(wish) {
      return wish.for === name;
    });
  },
  removeWishFromState: function(id) {
    var wishes = this.state.allWishes.filter(function(wish) {
      return id !== wish._id;
    });

    this.setState({allWishes: wishes});

    console.log('Wish removed');
  },
  addWishToState: function(wish) {
    var wishes = this.state.allWishes;
    wishes.unshift(wish);
    this.setState({allWishes: wishes});

    console.log('Wish added');
  },
  updateWishInState: function(updatedWish) {
    var wishes = this.state.allWishes.map(function(wish) {
      if (updatedWish._id === wish._id) {
        return updatedWish;
      }

      return wish;
    });

    this.setState({allWishes: wishes});


    // this.render();

    console.log('Wishes updated');
  },
  handleShowShoppingList: function() {
    this.setState({showShoppingList: true});
  },
  handleHideShoppingList: function() {
    this.setState({showShoppingList: false});
  },
  handleGrabWish: function(id) {
    var that = this;

    this.doAjaxCall(
      'api/grap/',
      'GET',
      {
        id: id,
        user: this.state.user.name
      },
      function(data) {
        that.updateWishInState(data.wish);
      }
    );
  },
  handleCreateWish: function(formData) {
    var that = this;
    formData['addedBy'] = this.state.user.name;

    this.doAjaxCall(
      'api/wish/',
      'POST',
      formData,
      function(data) {
        that.addWishToState(data.wish);
      }
    );
  },
  handleUpdateWish: function(formData) {
    var that = this;

    this.doAjaxCall(
      'api/wish/',
      'PUT',
      formData,
      function(data) {
        that.updateWishInState(data.wish);
      }
    );
  },
  handleArchiveWish: function(id) {
    var that = this;

    this.doAjaxCall(
      'api/wish/archive',
      'POST',
      {
        id: id
      },
      function(data) {
        that.removeWishFromState(data.wish._id);
      }
    );
  },
  handleChipIn: function(id, status) {
    var that = this, method;

    if (status === "in" ){
      method = "POST";
    } else {
      method = "DELETE";
    }

    this.doAjaxCall(
      'api/wish/chipIn',
      method,
      {
        id: id,
        user: that.state.user.name
      },
      function(data) {
        that.updateWishInState(data.wish);
      }
    );
  },
  handleDeleteWish: function(id) {
    if (!window.confirm('Wirklich löschen?')) {
      return;
    };

    var that = this;

    this.doAjaxCall(
      'api/wish/',
      'DELETE',
      {
        id: id
      },
      function(data) {
        that.removeWishFromState(id);
      }
    );
  },
  handleScrollToId: function(name) {
    var target = $('#anc_' + name);

    if (target.offset() == undefined) {
      return;
    }

    $('html,body').animate({
      scrollTop: target.offset().top
    }, 1000);
  },
  handleFaceClick: function(name) {
    this.setState({
      selectedUser: name
    })
  },
  getOwnWishesSection: function() {
    // if (this.state.selectedUser || this.state.filter != 'all') {
    //   return false;
    // } disbled because nav button doesn't do shit when this is not visible

    var ownWishes = this.getOwnWishes(),
    that = this,
    user = this.state.user;

    return (
      <div className="ownWishes">
        <div className="heading2">Deine Wünsche</div>
        <div className="anchor" id="anc_yourWishes"></div>
        <ReactCSSTransitionGroup transitionName="wish" transitionEnterTimeout={500} transitionLeaveTimeout={1000} >
        {ownWishes.map(function(wish) {
          return (
            <Wish
                {...wish}
                key={wish._id}
                user={user}
                onDeleteWish={that.handleDeleteWish.bind(null, wish._id)}
                onCreateWish={that.handleUpdateWish}
            />
          )
        })}
      </ReactCSSTransitionGroup>
    </div>
    )
  },
  getListSection: function() {
    var that=this,
    user = this.state.user,
    otherUsers = this.state.allUsers.filter(function(oneUser) {return oneUser.name != user.name});

    return (
      <div className="lists">
        {otherUsers.map(function(otherUser) {
          if (that.state.selectedUser && that.state.selectedUser != otherUser.name) {
            return false;
          }

          var wishes = that.getWishesForUser(otherUser.name);

          if (wishes.length === 0 && that.state.filter !== 'all') {
            return false;
          }

          if (wishes.length === 0) {
            profileText = otherUser.name + " ist wunschlos glücklich"
          } else {
            profileText = otherUser.name + " freut sich sicherlich über:"
          }

          return (
            <div key={'list_' + otherUser.name} className='wishlist'>
              <div className="profile">
                <img className="profileImage" src={otherUser.imageUrl ? "images/user/" + otherUser.imageUrl : 'images/default-profile.png'}></img>
                <div className="name">{profileText}</div>
                <div className="anchor" id={'anc_' + otherUser.name}></div>
              </div>
              <div className="wishes">
                <ReactCSSTransitionGroup transitionName="wish" transitionEnterTimeout={500} transitionLeaveTimeout={1000} >
                  {wishes.map(function(wish) {
                    return (
                      <Wish
                          {...wish}
                          key={wish._id}
                          user={user}
                          onDeleteWish={that.handleDeleteWish.bind(null, wish._id)}
                          onArchiveWish={that.handleArchiveWish.bind(null, wish._id)}
                          onGrabWish={that.handleGrabWish.bind(null, wish._id)}
                          onCreateWish={that.handleUpdateWish}
                          onChipIn={that.handleChipIn.bind(null, wish._id, 'in')}
                          onChipOut={that.handleChipIn.bind(null, wish._id, 'out')}
                      />
                    )
                  })}
                </ReactCSSTransitionGroup>
              </div>
            </div>
          )
        })}
      </div>
    );
  },
  getHeader: function() {
    var user = this.state.user,
    otherUsers = this.state.allUsers.filter(function(oneUser) {
      return oneUser.name != user.name
    }),
    grabbedWishes = this.state.allWishes.filter(function(wish) {
      return user.name === wish.grabbedBy;
    });

    return (
      <Header
        key='header'
        user={user}
        users={otherUsers}
        grabbedWishesCount={grabbedWishes.length}
        onSelectFilter={this.handleSelectFilter}
        onFaceClick={this.handleFaceClick}
        onNavClick={this.handleScrollToId}
        onShowShoppingList={this.handleShowShoppingList}
        selectedUser = {this.state.selectedUser}
        />
    );
  },
  render: function() {
    if (!this.state.user) {
      return <div>Loading…</div>;
    }

    var user = this.state.user,
    grabbedWishes = this.state.allWishes.filter(function(wish) {
      return user.name === wish.grabbedBy;
    }),
    otherUsers = this.state.allUsers.filter(function(oneUser) {return oneUser.name != user.name}),
    contentClasses = {
      content: true,
      loading: this.state.loading
    },
    containerClasses = {
      container: true,
      locked: this.state.showShoppingList
    },
    overlayClasses = {
      overlay: true,
      hidden: !this.state.showShoppingList
    };

    return (
      <div>
        <div className={classnames(overlayClasses)} onClick={this.handleHideShoppingList}></div>
        <ShoppingList
          grabbedWishes={grabbedWishes}
          hidden={!this.state.showShoppingList}
          onHideShoppingList={this.handleHideShoppingList}
          user={this.state.user}
          />
        <div className={classnames(containerClasses)}>
          {this.getHeader()}
          <div className={classnames(contentClasses)}>
            <div>
              <div className="heading2">Neuer Wunsch</div>
                <div className="anchor" id='anc_addWish'></div>
                <CreateWish
                  key={'CreateWish'}
                  users={otherUsers}
                  user={this.state.user}
                  onCreateWish={this.handleCreateWish}
                />
            </div>
            {this.getListSection()}
            {this.getOwnWishesSection()}
          </div>
        </div>
      </div>
    )
  }
});
