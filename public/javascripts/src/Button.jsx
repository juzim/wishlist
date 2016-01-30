var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Button',
  getInitialState: function () {
   return {
     text: this.props.text,
     disabled: this.props.disabled
    };
  },
 onMouseOver: function () {
   if (!this.props.hoverText) {
     return;
   }
   this.setState({
     text: this.props.hoverText
   });
 },
 onMouseOut: function () {
   this.setState({
     text: this.props.text
   });
 },
 onClick: function(e) {
   if (!this.props.disableOverlay) {
     this.setState(
       {disabled: true}
     )
   }
   result = this.props.onClick(e);

   this.setState(
     {disabled: false}
   );
 },
 render: function() {
    var classes = {
      'button': true,
      'half': this.props.size === 'half',
      'grabbable': this.props.type === 'grabbable',
      'grabbedByOther': this.props.type === 'grabbedByOther',
      'grabbedByUser': this.props.type === 'grabbedByUser',
      'plain': this.props.type === 'plain',
      'disabled': this.state.disabled
    };

    return (
      <div className={classnames(classes)} onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <span>{this.state.text}</span>
      </div>
    )
  }
});
