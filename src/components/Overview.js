// import { initialize } from '../actions'
import PropTypes from 'prop-types'
import UserWishList from './UserWishList'
import WishContainer from '../containers/WishContainer'
import CreateWishContainer from '../containers/CreateWishContainer'
import React from 'react'
// var Wish = require('./Wish.js');
// var CreateWish = require('./CreateWish.js');
// var ShoppingList = require('./ShoppingList.js');
// var classnames = require('classnames');
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
// var ReactToastr = require("react-toastr");
// var {ToastContainer} = ReactToastr;
// var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
// var Button = require('./Button.js');
// var UserAnnouncement = require('./UserAnnouncement.js');
// var Announcement = require('./Announcement.js');

class Overview extends React.Component {
  // handleScrollToId (name) {
  //   // var target = $('#anc_' + name);
  //   //
  //   // if (target.offset() === undefined) {
  //   //   return;
  //   // }
  //   //
  //   // $('html,body').animate({
  //   //   scrollTop: target.offset().top
  //   // }, 1000);
  // }
  // getOwnWishes () {
  //   var currentUser = this.state.user.name, archiveActive = this.state.filter === 'archived';
  //   return this.state.allWishes.filter(function(wish) {
  //     if (wish.for !== currentUser || wish.addedBy !== currentUser) {
  //       return false;
  //     };
  //
  //     return (archiveActive && wish.archivedAt) || (!archiveActive && !wish.archivedAt);
  //     // if (this.state.filter === 'archived') {
  //     //   return wish.archivedAt !== undefined;
  //     // } else {
  //     //   return !wish.archivedAt;
  //     // }
  //   });
  // }
  // getFilteredWishes () {
  //   var that = this, wishes = [], activeFilter = this.state.filter, filteredWishes;
  //
  //   if (this.state.selectedUser) {
  //     wishes = this.state.allWishes.filter(function(wish) {
  //       return wish.for === that.state.selectedUser;
  //     })
  //   } else {
  //     wishes = this.state.allWishes;
  //   }
  //
  //   if (activeFilter === 'all') {
  //     filteredWishes = wishes;
  //   } else if (activeFilter === 'grabbable') {
  //     filteredWishes = wishes.filter(function(wish) {
  //       return !wish.grabbedBy;
  //     })
  //   } else if (activeFilter === 'grabbedByMe') {
  //     filteredWishes = wishes.filter(function(wish) {
  //       return wish.grabbedBy === that.state.user.name;
  //     })
  //   } else if (activeFilter === 'archived') {
  //     filteredWishes = wishes.filter(function(wish) {
  //       return wish.archivedAt !== undefined;
  //     })
  //   }
  //
  //   if (activeFilter !== 'archived') {
  //     filteredWishes = filteredWishes.filter(function(wish) {
  //       return !wish.archivedAt;
  //     })
  //   }
  //
  //   return filteredWishes;
  //
  //   // filteredWishes.filter(function(wish) {
  //   //   return that.state.selectedFaces[wish.for] !== undefined;
  //   // });
  // }
  getWishesForUser (name) {
    return this.props.wishes.filter(function(wish) {
      return wish.for === name;
    });
  }
  // removeWishFromState (id) {
  //   var wishes = this.state.allWishes.filter(function(wish) {
  //     return id !== wish._id;
  //   });
  //
  //   this.setState({allWishes: wishes});
  //
  //   console.log('Wish removed');
  // }
  // addWishToState (wish) {
  //   var wishes = this.state.allWishes;
  //   wishes.unshift(wish);
  //   this.setState({allWishes: wishes});
  //
  //   console.log('Wish added');
  // }
  // updateWishInState (updatedWish) {
  //   var wishes = this.state.allWishes.map(function(wish) {
  //     if (updatedWish._id === wish._id) {
  //       return updatedWish;
  //     }
  //
  //     return wish;
  //   });
  //
  //   this.setState({allWishes: wishes});
  //
  //
  //   // this.render();
  //
  //   console.log('Wishes updated');
  // }
  // handleShowShoppingList () {
  //   this.setState({showShoppingList: true});
  // }
  // handleHideShoppingList () {
  //   this.setState({showShoppingList: false});
  // }
  // handleGrabWish (id) {
  //   // var that = this;
  //   //
  //   // this.doAjaxCall(
  //   //   'api/grap/',
  //   //   'GET',
  //   //   {
  //   //     id: id,
  //   //     user: this.state.user.name
  //   //   },
  //   //   function(data) {
  //   //     that.updateWishInState(data.wish);
  //   //     let alert = data.wish.grabbedBy ? 'Wunsch geschnappt' : 'Der Wunsch ist wieder frei';
  //   //     that.showSuccessNotification(alert);
  //   //   }
  //   // );
  // }
  // handleCreateWish (formData) {
  //   var that = this;
  //   formData['addedBy'] = this.state.user.name;
  //
  //   this.doAjaxCall(
  //     'api/wish/',
  //     'POST',
  //     formData,
  //     function(data) {
  //       that.addWishToState(data.wish);
  //       that.showSuccessNotification(<span onClick={that.handleScrollToId.bind(null, 'wish_' + data.wish._id)}>klicke hier um ihn zu sehen</span>, 'Wunsch hinzugefügt');
  //     }
  //   );
  // }
  // handleUpdateWish (formData) {
  //   var that = this;
  //
  //   this.doAjaxCall(
  //     'api/wish/',
  //     'PUT',
  //     formData,
  //     function(data) {
  //       that.updateWishInState(data.wish);
  //       that.showSuccessNotification('Wunsch aktualisiert');
  //     }
  //   );
  // }
  // handleArchiveWish (id) {
  //   var that = this;
  //
  //   this.doAjaxCall(
  //     'api/wish/archive',
  //     'POST',
  //     {
  //       id: id,
  //       userName: that.state.user.name
  //     },
  //     function(data) {
  //       that.updateWishInState(data.wish);
  //       that.showSuccessNotification('Wähle "Archiv" als Filter um archivierte Wüsche zu sehen', 'Wunsch archiviert');
  //     }
  //   );
  // }
  // handleChipIn (id, status) {
  //   var that = this, method, text;
  //
  //   if (status === "in" ){
  //     method = "POST";
  //   } else {
  //     method = "DELETE";
  //   }
  //
  //   this.doAjaxCall(
  //     'api/wish/chipIn',
  //     method,
  //     {
  //       id: id,
  //       user: that.state.user.name
  //     },
  //     function(data) {
  //       if (status === "in" ){
  //         text = "Du willst mitzahlen";
  //       } else {
  //         text = "Du willst nicht mehr mitzahlen";
  //       }
  //       that.showSuccessNotification(text, 'Gemeinsames Geschenk');
  //       that.updateWishInState(data.wish);
  //     }
  //   );
  // }
  // handleDeleteWish (id) {
  //   if (!window.confirm('Wirklich löschen?')) {
  //     return;
  //   };
  //
  //   var that = this;
  //
  //   this.doAjaxCall(
  //     'api/wish/',
  //     'DELETE',
  //     {
  //       id: id
  //     },
  //     function(data) {
  //       that.removeWishFromState(id);
  //       that.showSuccessNotification('Der Wunsch wurde gelöscht');
  //     }
  //   );
  // }
  // handleFaceClick (name) {
  //   this.setState({
  //     selectedUser: name
  //   })
  // }
  // updateUser  (fields) {
  //   var that = this, ajaxData = {
  //     id: this.state.user._id,
  //     fields: JSON.stringify(fields)
  //   };
  //
  //   this.doAjaxCall(
  //     'api/user/',
  //     'PUT',
  //     ajaxData,
  //     function(data) {
  //       that.setState({user: data.user});
  //       that.showSuccessNotification('Benutzer updated');
  //     }
  //   );
  // }
  // handleAnnouncementSubmit  (text) {
  //   if (text === this.state.user.announcement) {
  //     return;
  //   }
  //   this.updateUser({
  //     announcement: text
  //   });
  // }
  // getOwnWishesSection () {
  //   // if (this.state.selectedUser || this.state.filter !== 'all') {
  //   //   return false;
  //   // } disbled because nav button doesn't do shit when this is not visible
  //
  //   var ownWishes = this.getOwnWishes(),
  //   that = this,
  //   user = this.state.user;
  //   return (
  //     <div className="ownWishes">
  //       <h4>Allgemeine Wünsche und Ideen</h4>
  //       {<UserAnnouncement
  //         announcement={this.state.user.announcement}
  //         onSubmit={this.handleAnnouncementSubmit}
  //         />}
  //       <div className="heading2">Deine Wünsche</div>
  //       <div className="anchor" id="anc_yourWishes"></div>
  //       <ReactCSSTransitionGroup transitionName="wish" transitionEnterTimeout={500} transitionLeaveTimeout={1000} >
  //       {ownWishes.map(function(wish) {
  //         return (
  //           <Wish
  //               {...wish}
  //               key={wish._id}
  //               user={user}
  //               onDeleteWish={that.handleDeleteWish.bind(null, wish._id)}
  //               onCreateWish={that.handleUpdateWish}
  //               onArchiveWish={that.handleArchiveWish.bind(null, wish._id)}
  //           />
  //         )
  //       })}
  //     </ReactCSSTransitionGroup>
  //   </div>
  //   )
  // }
  // showSuccessNotification (content, title = '') {
  //   this.refs.container.success(
  //     content,
  //     title,
  //     {
  //       timeOut: 3000,
  //       extendedTimeOut: 5000,
  //       closeButton:true
  //     }
  //   );
  // }
  // showErrorNotification (content, title = '') {
  //   this.refs.container.warning(
  //     content,
  //     title,
  //     {
  //       timeOut: 3000,
  //       extendedTimeOut: 5000,
  //       closeButton:true
  //     }
  //   );
  // }

  render () {
    const isLoading = this.props.isLoading
    console.log(isLoading)
    const wishlists = this.props.allUsers.map((user) => {
      const wishes = this.getWishesForUser(user.name)
      return <UserWishList
          user={user}
          key={user.name}>
            {wishes.map(function (w) {
              // @todo get key from wish after testing!!!
              return <WishContainer
                key={w.text}
                user={user}
                wish={w}
                isLoading={isLoading[w._id] === true}

              />})
            }
          </UserWishList>
    })
    return (
      <div>
        {/* <CreateWish  title="foo" onSubmit={this.submit}/> */}
        <CreateWishContainer />
        {wishlists}
      </div>)
  //
  //   if (!this.state.user) {
  //     return <div>Loading…</div>;
  //   }
  //
  //   var user = this.state.user,
  //   grabbedWishes = this.state.allWishes.filter(function(wish) {
  //     return user.name === wish.grabbedBy && !wish.archivedAt;
  //   }),
  //   otherUsers = this.state.allUsers.filter(function(oneUser) {return oneUser.name !== user.name}),
  //   contentClasses = {
  //     content: true,
  //     loading: this.state.loading
  //   },
  //   containerClasses = {
  //     container: true,
  //     locked: this.state.showShoppingList
  //   },
  //   overlayClasses = {
  //     overlay: true,
  //     hidden: !this.state.showShoppingList
  //   };
  //
  //   return (
  //     <div>
  //       <ToastContainer ref="container"
  //                       toastMessageFactory={ToastMessageFactory}
  //                       className="toast-top-right" />
  //       <div className={classnames(overlayClasses)} onClick={this.handleHideShoppingList}></div>
  //       {/* <ShoppingList
  //         grabbedWishes={grabbedWishes}
  //         hidden={!this.state.showShoppingList}
  //         onHideShoppingList={this.handleHideShoppingList}
  //         user={this.state.user} */}
  //       <div className={classnames(containerClasses)}>
  //         // {this.getHeader()}
  //         <div className={classnames(contentClasses)}>
  //           <div>
  //             <div className="heading2">Neuer Wunsch</div>
  //               <div className="anchor" id='anc_addWish'></div>
  //               <CreateWish
  //                 key={'CreateWish'}
  //                 users={otherUsers}
  //                 user={this.state.user}
  //                 onCreateWish={this.handleCreateWish}
  //               />
  //           </div>
  //           {this.getListSection()}
  //           // {this.getOwnWishesSection()}
  //         </div>
  //       </div>
  //     </div>
  //   )
  }
}

Overview.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    }).isRequired,
  ).isRequired,
  isLoading: PropTypes.shape(),
  users: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string
    }).isRequired
  })
}

export default Overview
