var React = require('react');
var classnames = require('classnames');
var Button = require('./Button.js');

module.exports = React.createClass({
  displayName: "ShoppingList",
  handleClick: function() {
    window.print();
  },
  render: function() {
    var classes = {
      shoppingListContainer: true,
      hidden: this.props.hidden
    };

    return (
      <div className={classnames(classes)}>
        <div className="shoppingList">
          <h1>{this.props.user.name}s Einkaufsliste</h1>
            <div className="shoppingListButtons">
            <Button
              text='Ausdrucken'
              type='plain'
              onClick={this.handleClick}
              size='half'
              disableOverlay={true}
            />
          </div>
          <div className="closeIcon" onClick={this.props.onHideShoppingList}>schließen</div>
          {this.props.grabbedWishes.map(function(wish) {
            var urlHost = false;

            if (wish.url) {
              var parser = document.createElement('a');
              parser.href = wish.url;
              urlHost = parser.hostname;
            }

            return (
              <div key={'slis_' + wish._id} className="wish">
                <div className="checkBox">&#9744;</div>
                <div className="field title">{wish.text}</div>
                {wish.price ? <div className="field price">Kostet: {wish.price}</div>  : ''}
                {wish.comment ? <div className="field comment">{wish.comment}</div> : ''}
                {wish.url ? <span className="field url">Online kaufen: <a href={wish.url} target="_blank">{urlHost}</a></span> : ''}
                <div>
                  <span className="field addedBy">Für: {wish.for}</span>
                  {wish.addedBy !== wish.for ? <span className="field addedBy"> &middot; Hinzugefügt von: {wish.addedBy}</span>  : ''}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
});
