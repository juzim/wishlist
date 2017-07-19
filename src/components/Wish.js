import Button from './Button'
import PropTypes from 'prop-types'
import WishNote from './WishNote'
var React = require('react');
var classnames = require('classnames');
var ReactTooltip = require("react-tooltip")

const Wish = ({handleDelete, wish, user, foo}) => {
  // handleEditButtonClick() {
  //   this.setState({editMode: true});
  // }
  // handleSave() {
  //   if (!this.state.text) {
  //     alert('Bitte gebe einen Titel ein!');
  //     return false;
  //   }
  //
  //   if (this.state.for === "") {
  //     alert('Bitte wähle einen Beschenkten aus!');
  //     return false;
  //   }
  //
  //   var url = this.state.wishUrl;
  //
  //   if (url && !/^https?:\/\//i.test(url)) {
  //     url = 'http://' + url;
  //   }
  //
  //    var formData = {
  //     text: this.state.text,
  //     comment: this.state.comment,
  //     price: this.state.price,
  //     url: url,
  //     for: this.state.for,
  //     id: wish._id,
  //     addedBy: wish.addedBy,
  //     priority: this.state.priority
  //   };
  //
  //   wish.onCreateWish(formData);
  //
  //   this.setState({
  //     editMode: false
  //   });
  // }
  // getButtons() {
  //   let buttons,
  //     isAdmin = wish.user.isAdmin,
  //     canEdit = isAdmin || wish.user.name === wish.addedBy,
  //     isOwnWish = wish.user.name === wish.for,
  //     grabbedByUser = wish.grabbedBy === wish.user.name,
  //     buttonDone = (
  //       <Button
  //         key={'button_done_' + wish._id}
  //         onClick={wish.onArchiveWish}
  //         text='Erledigt'
  //         hoverText='archivieren'
  //         type='plain'
  //       />
  //     ),
  //     buttonGrabbedByUser = (
  //       <Button
  //         key={'button_ungrab_' + wish._id}
  //         onClick={wish.onGrabWish}
  //         text='Geschnappt!'
  //         hoverText='Doch nicht?'
  //         type='success'
  //       />
  //     ),
  //     buttonEdit = (
  //       <Button
  //         key={'button_edit_' + wish._id}
  //         onClick={this.handleEditButtonClick}
  //         text='Bearbeiten'
  //         hoverText='Bearbeiten'
  //         type='text'
  //       />
  //     ),
  //     buttonDelete = (
  //       <Button
  //         key={'button_delete_' + wish._id}
  //         onClick={wish.onDeleteWish}
  //         text='Löschen'
  //         hoverText='Löschen'
  //         type='danger'
  //       />
  //     ),
  //     buttonReset = (
  //       <Button
  //         key={'button_reset_' + wish._id}
  //         onClick={this.reset}
  //         text='Abbrechen'
  //         hoverText='Abbrechen'
  //         type='text'
  //       />
  //     );
  //
  //   // if (wish.archivedAt) {
  //   //   return canEdit ? deleteLink : null;
  //   // }
  //
  //   if (this.state.editMode) {
  //     return (
  //       <div>
  //         <Button
  //           key={'button_save_' + wish._id}
  //           text='Speichern'
  //           type='info'
  //           onClick={this.handleSave}
  //         />
  //         {buttonDelete}
  //         {buttonDone}
  //         {buttonReset}
  //       </div>
  //     )
  //   }
  //
  //   if (isOwnWish) {
  //     buttons = false;
  //   } else if (grabbedByUser) {
  //     buttons = (
  //       <div>
  //         {buttonGrabbedByUser}
  //         {buttonDone}
  //       </div>
  //     );
  //   } else if (wish.grabbedBy) {
  //     var text = wish.grabbedBy;
  //     buttons = (
  //       <Button
  //         key={'button_grabbedBy_' + wish._id}
  //         text={text}
  //         type='danger'
  //         classes={{'grabbedByOther': true}}
  //         disabled={true}
  //       />
  //     );
  //   } else {
  //     buttons = (
  //       <div>
  //         <Button
  //           key={'button_grab_' + wish._id}
  //           onClick={wish.onGrabWish}
  //           text='Frei!'
  //           size='half'
  //           hoverText='Schnappen!'
  //           type='info'
  //         />
  //         {this.hasChippedIn(wish.user.name) ?
  //           <Button
  //             key={'button_chipOut_' + wish._id}
  //             onClick={wish.onChipOut}
  //             text='Nicht mitzahlen'
  //             type='plain'
  //             size='half'
  //           />
  //         :
  //           <Button
  //             key={'button_chipIn_' + wish._id}
  //             onClick={wish.onChipIn}
  //             text='Mitzahlen'
  //             type='plain'
  //             size='half'
  //           />
  //         }
  //       </div>
  //     )
  //     ;
  //   }
  //
  //   return (
  //     <div>
  //     {buttons}
  //     {canEdit ? buttonEdit : ''}
  //     </div>
  //   );
  // }
  // onFormChange(event) {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }
  // handleCollapsedClick() {
  //   this.setState({collapsed: false});
  // }
  // hasChippedIn(user) {
  //   return wish.chippedIn !== undefined && wish.chippedIn[user] === true;
  // }
  // getChippedIn() {
  //   if (wish.user.name === wish.for) {
  //     return false;
  //   }
  //   var chippedIn = [];
  //
  //   for (var key in wish.chippedIn) {
  //      if (wish.chippedIn.hasOwnProperty(key) && this.hasChippedIn(key)) {
  //        chippedIn.push(key);
  //     }
  //   }
  //
  //   return (
  //     <div>
  //       {chippedIn.map(function(user) {
  //         return <img alt="" key={'h_img_' + user} data-tip={user} className="chippedIn" src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'}></img>
  //       })}
  //     </div>
  // )
  // }
    let urlHost = false, addedAt = false, priority = false, archivedText, archivedAt;

    // if (this.state.wishUrl) {
    //   var parser = document.createElement('a');
    //   parser.href = this.state.wishUrl;
    //   urlHost = parser.hostname;
    // }

    if (wish.addedAt) {
      addedAt = new Date(wish.addedAt);
    }

    if (wish.archivedAt) {
      archivedAt = new Date(wish.archivedAt);
    }

    const prioMapping = {
      1: {'icon': "🡅", 'text': "Wichtig!"},
      2: {'icon': "", 'text': ""},
      3: {'icon': "🡇", 'text': "Nicht so wichtig…"},
    }

    if (wish.priority && wish.priority !== 2) {
      const prioClasses = {
        "priority": true,
        "fl": true,
        "high": wish.priority === 1,
        "low": wish.priority === 3,
      };

      priority = (<span className={classnames(prioClasses)} data-tip={prioMapping[wish.priority]['text']}>{prioMapping[wish.priority]['icon']}</span>);
    }

    if (archivedAt) {
      archivedText = (
        <div className="field addedBy">
          Archiviert
          {wish.archivedBy ? ' von ' + wish.archivedBy : ''}
          {' am ' + archivedAt.getDate() + '.' + (archivedAt.getMonth() + 1) + '.' + archivedAt.getFullYear()}
        </div>
      );
    }


    var classes = {
      wish: true,
      // edit: this.state.editMode,
      // loading: this.state.loading
    }
    // content = this.state.editMode ? this.getEditContent() : this.getViewContent();

    // if (this.state.collapsed) {
    //   return (
    //     <div className={classnames(classes)} onClick={this.handleCollapsedClick}>
    //     <div className="collapsed">
    //       <div className="title fl">{this.state.text}</div>
    //       <div className="btn-group-vertical buttonContainer" role="group">
    //         <Button
    //           onClick={() => {wish.handleDelete(wish.id)}}>
    //           Löschen
    //         </Button>
    //       </div>
    //     <div className="clearfix"></div>
    //     </div>
    //     </div>
    //   );
    // }
    let anchorId = "anc_wish_" + wish._id;
    return (
      <div className={classnames(classes)}>
        <div className="anchor" id={anchorId}></div>
        <div>
          <form className="wishForm" action="#">
            <div className="buttonContainer btn-group-vertical" role="group">
              <Button
                onClick={() => {handleDelete(wish.id)}}
                text="löschen"
              />
              {/* {this.getButtons()}
              {this.getChippedIn()} */}
            </div>
            <div className="wishContent">
              <div>
                {user.name === wish.for || wish.addedBy === wish.for ? '' :
                  <div className="field addedBy">
                    Hinzugefügt von {wish.addedBy}
                    {wish.addedAt ? ' am ' + addedAt.getDate() + '.' + (addedAt.getMonth() + 1) + '.' + addedAt.getFullYear(): ''}
                  </div>
                }
                {archivedText}
                <div className="title">{priority}{wish.text}</div>
                {wish.price ? <div>Kostet: {wish.price}</div> : ''}
                <div className="fields">
                  {wish.wishUrl ? <div className="field url"><a href={wish.wishUrl} target="_blank">{urlHost}</a></div> : ''}
                  <WishNote comment={wish.comment} />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="clearfix"></div>
        <ReactTooltip place="top" type="info" effect="solid"/>
      </div>
    )
}

Wish.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  wish: PropTypes.shape()
}

export default Wish
