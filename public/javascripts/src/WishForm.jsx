var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: "Header",
  getInitialState: function() {
    return {
      grabbedBy: this.props.grabbedBy,
      text: this.props.text,
      comment: this.props.comment,
      price: this.props.price,
      wishUrl: this.props.url,
      for: this.props.for,
    };
  },
  reset: function() {
    this.setState(this.getInitialState());
  },
  render: function() {
    return (
      <div>
        <div>
          <label htmlFor="title">Titel</label>
          <input type="text" id="text" defaultValue={this.state.text} onChange={this.onFormChange} required/>
        </div>
        <div>
          <label htmlFor="price">Preis</label>
          <input id="price" ref="price" type="text" className="price" defaultValue={this.state.price} maxLength="6" onChange={this.onFormChange}/>
        </div>
        <div>
          <label htmlFor="url">Link</label>
          <input id="url" ref="url" type="url" defaultValue={this.state.wishUrl} onChange={this.onFormChange}/>
        </div>
        <div>
          <label htmlFor="comment">Kommentar</label>
          <textarea id="comment" ref="comment" className="comment" type="text" defaultValue={this.state.comment} onChange={this.onFormChange}></textarea>
        </div>
      </div>
    )
  }
});
