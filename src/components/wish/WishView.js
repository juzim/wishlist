import Button from '../Button'
import PropTypes from 'prop-types'
import WishNote from './WishNote'
import Priority from './Priority'
import AddedBy from './AddedBy'
var React = require('react');
var ReactTooltip = require("react-tooltip")

const WishView = ({handleDelete, handleEdit, wish, user, buttons}) => {
    let urlHost = false, archivedText;




    return (
        <div>
            <div className="buttonContainer btn-group-vertical" role="group">
              <Button
                onClick={() => {handleDelete(wish.id)}}
                text="löschen"
              />

              <Button
                onClick={() => {handleEdit(wish.id)}}
                text="Bearbeiten"
              />
              {/* {this.getButtons()}
              {this.getChippedIn()} */}
            </div>
            <div className="wishContent">
              <div>
                <AddedBy wish={wish} user={user} />
                {archivedText}
                <div className="title">
                  <Priority priority={Number(wish.priority)}/>
                  {wish.text}
                </div>
                {wish.price ? <div>Kostet: {wish.price}</div> : ''}
                <div className="fields">
                  {wish.wishUrl ? <div className="field url"><a href={wish.wishUrl} target="_blank">{urlHost}</a></div> : ''}
                  <WishNote comment={wish.comment} />
                </div>
              </div>
            </div>
          <div className="clearfix"></div>
          <ReactTooltip place="top" type="info" effect="solid"/>
        </div>
    )
}

WishView.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  wish: PropTypes.shape()
}

export default WishView
