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
  //  result = this.props.onClick(e);

   this.setState(
     {disabled: false}
   );
 },
 render: function() {
    var classes = {
      'btn': true,
      'btn-info': this.props.type === 'info',
      'btn-success': this.props.type === 'success',
      'btn-danger': this.props.type === 'danger',
      'btn-warning': this.props.type === 'warning',
      'btn-default': this.props.type === 'plain',
      'btn-link': this.props.type === 'text',
      'disabled': this.state.disabled
    };

    return (
      <button type="button" className={classnames(classes, this.props.classes)} onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <span>{this.state.text}</span>
      </button>
    )
  }
});
