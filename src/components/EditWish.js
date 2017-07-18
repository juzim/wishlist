var React = require('react');
var Button = require('./Button.js');

module.exports = React.createClass({
  displayName: "CreateWish",
  getInitialState: function() {
    return {
      grabbedBy: null,
      text: null,
      comment: "",
      price: null,
      wishUrl: null,
      for: "",
      priority: 2
    };
  },
  reset: function() {
    this.setState(this.getInitialState());
  },
  onFormChange: function(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  },
  handleSave: function(e) {
    e.preventDefault();

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
      priority: this.state.priority
    };

    this.props.onCreateWish(formData);

    this.reset();
  },
  render: function() {
    return (
        <div className='wish create well'>
          <div className="buttonContainer">
            <Button
              text='Speichern'
              type='info'
              onClick={this.handleSave}
            />
            <Button
              text='Abbrechen'
              type='text'
              onClick={this.reset}
            />
          </div>
          <div className="formSection">
            <label htmlFor="for">Für</label>
            <select id="for" onChange={this.onFormChange} required value={this.state.for}>
              <option value="">--</option>
              <option value={this.props.user.name}>Mich</option>
              {this.props.users.map(function(user) {
                return (
                  <option key={'c_o_' + user.name}>{user.name}</option>
                )
              })}
            </select>
            <div className="editPrice" >
              <label htmlFor="price">Preis</label>
              <input id="price" type="text" onChange={this.onFormChange} value={this.state.price}/>
            </div>
          </div>
          <div className="formSection">
            <label htmlFor="title">Titel</label>
            <input type="text" id="text" onChange={this.onFormChange} required value={this.state.text}/>
          </div>
          <div className="wishContent">
              <div className="formSection">
                <label htmlFor="url">Link</label>
                <input id="wishUrl" type="url" onChange={this.onFormChange} value={this.state.wishUrl}/>
              </div>
              <div className="formSection">
                <label htmlFor="comment">Infos</label>
                <textarea id="comment" className="comment" type="text" onChange={this.onFormChange} value={this.state.comment}></textarea>
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
          <div className="clearfix"></div>
        </div>
    )
  }
});
