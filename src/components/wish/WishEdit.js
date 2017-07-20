import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import Button from '../Button'
import React from 'react'

let WishEdit = ({ wish, handleSubmit, reset, onCancel, currentUser, userNames, buttons }) => {
  // let classes = {
  //   wish:true,
  // }
  return (
      <div>
          <form onSubmit={ handleSubmit }>
            <div className="buttonContainer btn-group-vertical" role="group">
            <Button
              text='Speichern'
              type='submit'
            />
            <Button
              text='Abbrechen'
              onClick={() => {
                // reset('updateWish')
                onCancel()
              }}
            />
            </div>
          <div className="editPrice">
            <label htmlFor="price">Preis</label>
            <Field name="price" component="input"/>
          </div>
          <div className="wishContent">
          <div className="formSection">
            <label htmlFor="text">Titel</label>
            <Field name="text" component="input" type="text" required/>
          </div>
          <div className="formSection">
            <label htmlFor="url">Link</label>
            <Field name="url" component="input" type="text"/>
          </div>

          <div className="formSection">
            <label htmlFor="for">Für</label>
            <Field name="for" component="select" required>
              <option />
              {userNames.map(u => {return <option key={u} value={u}>
                {currentUser === u ? "mich" : u}
              </option>})}
            </Field>
          </div>
          <div className="formSection">
            <label htmlFor="priority">Priorität</label>
            <Field name="priority" component="select">
              <option />
              <option value="1">Wichtig</option>
              <option value="3">Nicht wichtig</option>
            </Field>
          </div>
          <div className="formSection">
            <label htmlFor="comment">Infos</label>
            <Field
              component="input"
              name="comment"
              className="comment"
              type="text"
            />
          </div>

          </div>
          </form>

        <div className="clearfix"></div>
      </div>
  )
}

WishEdit.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.shape({
    title: PropTypes.string
  })
}

WishEdit = reduxForm({})(WishEdit)

export default WishEdit;
