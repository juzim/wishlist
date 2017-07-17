var React = require('react');
var classnames = require('classnames');

class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text
    }
  }
 onMouseOver() {
   if (!this.props.hoverText) {
     return;
   }
   this.setState({
     text: this.props.hoverText
   });
 }

 onMouseOut() {
   this.setState({
     text: this.props.text
   });
 }
 // onClick: function(e) {
 //   if (!this.props.disableOverlay) {
 //     this.setState(
 //       {disabled: true}
 //     )
 //   }
 //  //  result = this.props.onClick(e);
 //
 //   this.setState(
 //     {disabled: false}
 //   );
 // },

  render() {
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
      <button
        type="button"
        className={classnames(classes, this.props.classes)}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        >
        <span>{this.state.text}</span>
      </button>
    )
  }
}

export default Button
