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
      'btn-info': this.props.format === 'info',
      'btn-success': this.props.format === 'success',
      'btn-danger': this.props.format === 'danger',
      'btn-warning': this.props.format === 'warning',
      'btn-default': this.props.format === 'plain',
      'btn-link': this.props.format === 'text',
      'disabled': this.state.disabled
    };

    return (
      <button
        type={this.props.type ? this.props.type : "button"}
        className={classnames(classes, this.props.classes)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        onClick={this.props.onClick ? this.props.onClick : null}
        >
        <span>{this.state.text}</span>
      </button>
    )
  }
}

export default Button
