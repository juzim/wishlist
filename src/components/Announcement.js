var React = require('react');
var Linkify = require('react-linkify').default;

module.exports = React.createClass({
  displayName: "Announcement",
  render: function() {
    if (!this.props.announcement) {
      return null;
    }

  return (
    <div className="announcement">
      <Linkify properties={{target: '_blank'}}>
        {this.props.announcement}
      </Linkify>
    </div>
  );
  }
});
