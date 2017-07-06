var React = require('react');
var Button = require('./Button.js');

module.exports = React.createClass({
  displayName: "UserAnnouncement",
  getInitialState: function() {
    return {
      announcement: this.props.announcement
    };
  },
  handleChange: function(event) {
    this.setState({
      'announcement': event.target.value
    });
  },
  render: function() {
    return (
      (
        <div>
          <div className="formSection">
            <div>
              <label htmlFor="announcement"></label>
            </div>
            <textarea placeholder="Generelle Tipps, z.B. 'Über Blumen freue ich mich immer, aber bitte keine Gartenzwerge mehr, die machen mir Angst!'" id="announcement" className="announcement" type="text" onChange={this.handleChange} value={this.state.announcement}></textarea>
          </div>
          <Button
            text='Speichern'
            type='plain'
            onClick={this.props.onSubmit.bind(null, this.state.announcement)}
          />
        </div>

      )
    )
  }
});
