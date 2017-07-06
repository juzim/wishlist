var React = require('react');
var Linkify = require('react-linkify').default;

module.exports = React.createClass({
  displayName: "WishNote",
  render: function() {
    if (!this.props.comment) {
      return null;
    }

    return (
      <div className="field comment">
        <Linkify properties={{target: '_blank'}}>{this.props.comment}</Linkify>
      </div>
    );
  }
});
