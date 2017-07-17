import Button from './Button'
import WishNote from './WishNote'
var React = require('react');
var classnames = require('classnames');
var ReactTooltip = require("react-tooltip")

class Wish extends React.Component {
  constructor (props) {
    super(props)
    this.state =      {
          editMode: this.props.editMode,
          grabbedBy: this.props.grabbedBy,
          text: this.props.text,
          comment: this.props.comment,
          price: this.props.price,
          wishUrl: this.props.url,
          for: this.props.for,
          collapsed: this.props.collapsed,
          priority: this.props.priority
        };
  }
  handleEditButtonClick() {
    this.setState({editMode: true});
  }
  handleSave() {
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
      addedBy: this.props.addedBy,
      priority: this.state.priority
    };

    this.props.onCreateWish(formData);

    this.setState({
      editMode: false
    });
  }
  reset() {
    this.setState(this.getInitialState());
  }
  getButtons() {
    let buttons,
      isAdmin = this.props.user.isAdmin,
      canEdit = isAdmin || this.props.user.name === this.props.addedBy,
      isOwnWish = this.props.user.name === this.props.for,
      grabbedByUser = this.props.grabbedBy === this.props.user.name,
      buttonDone = (
        <Button
          key={'button_done_' + this.props._id}
          onClick={this.props.onArchiveWish}
          text='Erledigt'
          hoverText='archivieren'
          type='plain'
        />
      ),
      buttonGrabbedByUser = (
        <Button
          key={'button_ungrab_' + this.props._id}
          onClick={this.props.onGrabWish}
          text='Geschnappt!'
          hoverText='Doch nicht?'
          type='success'
        />
      ),
      buttonEdit = (
        <Button
          key={'button_edit_' + this.props._id}
          onClick={this.handleEditButtonClick}
          text='Bearbeiten'
          hoverText='Bearbeiten'
          type='text'
        />
      ),
      buttonDelete = (
        <Button
          key={'button_delete_' + this.props._id}
          onClick={this.props.onDeleteWish}
          text='Löschen'
          hoverText='Löschen'
          type='danger'
        />
      ),
      buttonReset = (
        <Button
          key={'button_reset_' + this.props._id}
          onClick={this.reset}
          text='Abbrechen'
          hoverText='Abbrechen'
          type='text'
        />
      );

    // if (this.props.archivedAt) {
    //   return canEdit ? deleteLink : null;
    // }

    if (this.state.editMode) {
      return (
        <div>
          <Button
            key={'button_save_' + this.props._id}
            text='Speichern'
            type='info'
            onClick={this.handleSave}
          />
          {buttonDelete}
          {buttonDone}
          {buttonReset}
        </div>
      )
    }

    if (isOwnWish) {
      buttons = false;
    } else if (grabbedByUser) {
      buttons = (
        <div>
          {buttonGrabbedByUser}
          {buttonDone}
        </div>
      );
    } else if (this.props.grabbedBy) {
      var text = this.props.grabbedBy;
      buttons = (
        <Button
          key={'button_grabbedBy_' + this.props._id}
          text={text}
          type='danger'
          classes={{'grabbedByOther': true}}
          disabled={true}
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
            type='info'
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
      {canEdit ? buttonEdit : ''}
      </div>
    );
  }
  onFormChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleCollapsedClick() {
    this.setState({collapsed: false});
  }
  hasChippedIn(user) {
    return this.props.chippedIn !== undefined && this.props.chippedIn[user] === true;
  }
  getChippedIn() {
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
          return <img alt="" key={'h_img_' + user} data-tip={user} className="chippedIn" src={user.imageUrl ? "images/user/" + user.imageUrl : 'images/default-profile.png'}></img>
        })}
      </div>
  )
  }
  getViewContent() {
    let urlHost = false, addedAt = false, priority = false, archivedText, archivedAt;

    if (this.state.wishUrl) {
      var parser = document.createElement('a');
      parser.href = this.state.wishUrl;
      urlHost = parser.hostname;
    }

    if (this.props.addedAt) {
      addedAt = new Date(this.props.addedAt);
    }

    if (this.props.archivedAt) {
      archivedAt = new Date(this.props.archivedAt);
    }

    const prioMapping = {
      1: {'icon': "🡅", 'text': "Wichtig!"},
      2: {'icon': "", 'text': ""},
      3: {'icon': "🡇", 'text': "Nicht so wichtig…"},
    }
    console.log(this.props.priority)

    if (this.props.priority && this.props.priority !== 2) {
      const prioClasses = {
        "priority": true,
        "fl": true,
        "high": this.props.priority === 1,
        "low": this.props.priority === 3,
      };

      priority = (<span className={classnames(prioClasses)} data-tip={prioMapping[this.props.priority]['text']}>{prioMapping[this.props.priority]['icon']}</span>);
    }

    if (archivedAt) {
      archivedText = (
        <div className="field addedBy">
          Archiviert
          {this.props.archivedBy ? ' von ' + this.props.archivedBy : ''}
          {' am ' + archivedAt.getDate() + '.' + (archivedAt.getMonth() + 1) + '.' + archivedAt.getFullYear()}
        </div>
      );
    }

    return (
      <div>
        {this.props.user.name === this.props.for || this.props.addedBy === this.props.for ? '' :
          <div className="field addedBy">
            Hinzugefügt von {this.props.addedBy}
            {this.props.addedAt ? ' am ' + addedAt.getDate() + '.' + (addedAt.getMonth() + 1) + '.' + addedAt.getFullYear(): ''}
          </div>
        }
        {archivedText}
        <div className="title">{priority}{this.state.text}</div>
        {this.state.price ? <div>Kostet: {this.state.price}</div> : ''}
        <div className="fields">
          {this.state.wishUrl ? <div className="field url"><a href={this.state.wishUrl} target="_blank">{urlHost}</a></div> : ''}
          <WishNote comment={this.state.comment} />
        </div>
      </div>
    );
  }
  getEditContent() {
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
        <div className="formSection">
          <label htmlFor="priority">Priorität</label>
          <select value={this.state.priority} onChange={this.onFormChange} id="priority">
            <option value="2">-</option>
            <option value="1">Wichtig</option>
            <option value="3">Nicht wichtig</option>
          </select>
        </div>
      </div>
    );
  }
  render() {
    var classes = {
      wish: true,
      edit: this.state.editMode,
      loading: this.state.loading
    },
    content = this.state.editMode ? this.getEditContent() : this.getViewContent();

    if (this.state.collapsed) {
      return (
        <div className={classnames(classes)} onClick={this.handleCollapsedClick}>
        <div className="collapsed">
          <div className="title fl">{this.state.text}</div>
          <div className="btn-group-vertical buttonContainer" role="group">
            {this.getButtons()}
          </div>
        <div className="clearfix"></div>
        </div>
        </div>
      );
    }
    let anchorId = "anc_wish_" + this.props._id;
    return (
      <div className={classnames(classes)}>
        <div className="anchor" id={anchorId}></div>
        <div>
          <form className="wishForm" action="#">
            <div className="buttonContainer btn-group-vertical" role="group">
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
}

export default Wish
