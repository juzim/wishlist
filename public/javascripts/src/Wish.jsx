var React = require('react');
var Button = require('./Button.jsx');
var classnames = require('classnames');
var ReactTooltip = require("react-tooltip")

module.exports = React.createClass({
  displayName: "Wish",
  getInitialState: function() {
    return {
      editMode: this.props.editMode,
      grabbedBy: this.props.grabbedBy,
      text: this.props.text,
      comment: this.props.comment,
      price: this.props.price,
      wishUrl: this.props.url,
      for: this.props.for,
    };
  },
  handleEditButtonClick: function() {
    this.setState({editMode: true});
  },
  handleSave: function() {
    if (!this.state.text) {
      alert('Bitte gebe einen Titel ein!');
      return false;
    }

    if (this.state.for === "") {
      alert('Bitte wähle einen Beschenkten aus!');
      return false;
    }

    var url = this.state.wishUrl;

    if (url && !/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

     var formData = {
      text: this.state.text,
      comment: this.state.comment,
      price: this.state.price,
      url: url,
      for: this.state.for,
      id: this.props._id,
      addedBy: this.props.addedBy
    };

    // var compareData = formData;
    // compareData['editMode'] = undefined;
    // compareData['grabbedBy'] = undefined;
    //
    // debugger;
    //
    // if (this.getInitialState === compareData) {
    //   return;
    // }


    this.props.onCreateWish(formData);

    this.setState({
      editMode: false
    });
  },
  reset: function() {
    this.setState(this.getInitialState());
  },
  getButtons: function() {
    if (this.state.editMode) {
      return (
        <div>
          <Button
            key={'button_save_' + this.props._id}
            text='Speichern'
            type='plain'
            onClick={this.handleSave}
          />
          <div className="delete" onClick={this.props.onDeleteWish}>Löschen</div>
          <div className="delete" onClick={this.reset}>Abbrechen</div>
        </div>
      )
    }

    var buttons,
      editLink = <div className="delete" onClick={this.handleEditButtonClick}>Bearbeiten</div>,
      showEdit = this.props.user.isAdmin || this.props.user.name === this.props.addedBy,
      isOwnWish = this.props.user.name === this.props.for,
      grabbedByUser = this.props.grabbedBy === this.props.user.name;

    if (isOwnWish) {
      buttons = false;
    } else if (grabbedByUser) {
      buttons = (
        <div>
          <Button
            key={'button_ungrab_' + this.props._id}
            onClick={this.props.onGrabWish}
            text='Geschnappt!'
            hoverText='Doch nicht?'
            type='grabbedByUser'
            size='half'
          />
          <Button
            key={'button_done_' + this.props._id}
            onClick={this.props.onArchiveWish}
            text='Erledigt'
            hoverText='Löschen'
            type='plain'
            size='half'
          />
        </div>
      );
    } else if (this.props.grabbedBy) {
      var text = 'Geschnappt von ' + this.props.grabbedBy;
      buttons = (
        <Button
          key={'button_grabbedBy_' + this.props._id}
          text={text}
          type='grabbedByOther'
        />
      );
    } else {
      buttons = (
        <div>
          <Button
            key={'button_grab_' + this.props._id}
            onClick={this.props.onGrabWish}
            text='Frei!'
            size='half'
            hoverText='Schnappen!'
            type='grabbable'
          />
          {this.hasChippedIn(this.props.user.name) ?
            <Button
              key={'button_chipOut_' + this.props._id}
              onClick={this.props.onChipOut}
              text='Nicht mitzahlen'
              type='plain'
              size='half'
            />
          :
            <Button
              key={'button_chipIn_' + this.props._id}
              onClick={this.props.onChipIn}
              text='Mitzahlen'
              type='plain'
              size='half'
            />
          }
        </div>
      )
      ;
    }

    return (
      <div>
      {buttons}
      {showEdit ? editLink : ''}
      </div>
    );
  },
  onFormChange: function(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  },
  hasChippedIn: function(user) {
    return this.props.chippedIn != undefined && this.props.chippedIn[user] === true;
  },
  getChippedIn: function() {
    if (this.props.user.name === this.props.for) {
      return false;
    }
    var chippedIn = [];

    for (var key in this.props.chippedIn) {
       if (this.props.chippedIn.hasOwnProperty(key) && this.hasChippedIn(key)) {
         chippedIn.push(key);
      }
    }

    return (
      <div>
        {chippedIn.map(function(user) {
          return <img key={'h_img_' + user} data-tip={user} className="chippedIn" src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'}></img>
        })}
      </div>
  )
  },
  getViewContent: function() {
    var urlHost = false, addedAt = false;

    if (this.state.wishUrl) {
      var parser = document.createElement('a');
      parser.href = this.state.wishUrl;
      urlHost = parser.hostname;
    }

    if (this.props.addedAt) {
      addedAt = new Date(this.props.addedAt);
    }

    return (
      <div>
        {this.props.user.name === this.props.for || this.props.addedBy === this.props.for ? '' :
          <div className="field addedBy">
            Hinzugefügt von {this.props.addedBy}
            {this.props.addedAt ? ' am ' + addedAt.getDate() + '.' + (addedAt.getMonth() + 1) + '.' + addedAt.getFullYear(): ''}
          </div>
        }
        <div className="title">{this.state.text}</div>
        {this.state.price ? <div>Kostet: {this.state.price}</div> : ''}
        <div className="fields">
          {this.state.wishUrl ? <div className="field url"><a href={this.state.wishUrl} target="_blank">{urlHost}</a></div> : ''}
          {this.state.comment ? <div className="field comment">{this.state.comment}</div> : ''}
        </div>
      </div>
    );
  },
  getEditContent: function() {
    return (
      <div>
        <div className="formSection">
          <label htmlFor="title">Titel</label>
          <input type="text" id="text" defaultValue={this.state.text} onChange={this.onFormChange} required/>
        </div>
        <div className="formSection">
          <label htmlFor="price">Preis</label>
          <input id="price" ref="price" type="text" className="price" defaultValue={this.state.price} onChange={this.onFormChange}/>
        </div>
        <div className="formSection">
          <label htmlFor="url">Link</label>
          <input id="wishUrl" ref="url" type="url" defaultValue={this.state.wishUrl} onChange={this.onFormChange}/>
        </div>
        <div className="formSection">
          <label htmlFor="comment">Kommentar</label>
          <textarea id="comment" ref="comment" className="comment" type="text" defaultValue={this.state.comment} onChange={this.onFormChange}></textarea>
        </div>
      </div>
    );
  },
  render: function() {
    var classes = {
      wish: true,
      edit: this.state.editMode,
      loading: this.state.loading
    },
    content = this.state.editMode ? this.getEditContent() : this.getViewContent();

    return (
      <div className={classnames(classes)}>
        <div>
          <form className="wishForm" action="#">
            <div className="buttonContainer">
              {this.getButtons()}
              {this.getChippedIn()}
            </div>
            <div className="wishContent">
              {content}
            </div>
          </form>
        </div>
        <div className="clearfix"></div>
        <ReactTooltip place="top" type="info" effect="solid"/>
      </div>
    )
  }
});
