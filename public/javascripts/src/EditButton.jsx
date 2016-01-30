var React = require('react');
var classnames = require('classnames');
var Button = require('./Button.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div onClick={this.props.handleClick}>
        <Button>
          Bearbeiten
        </Button>
      </div>
    )
  }
});
