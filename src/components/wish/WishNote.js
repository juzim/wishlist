var React = require('react');
var Linkify = require('react-linkify').default;

class WishNote extends React.Component {
  render() {
    if (!this.props.comment) {
      return null;
    }

    return (
      <div className="field comment">
        <Linkify properties={{target: '_blank'}}>{this.props.comment}</Linkify>
      </div>
    );
  }
}

export default WishNote
