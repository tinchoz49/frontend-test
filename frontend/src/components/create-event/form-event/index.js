import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import schema from './schema';
import Ajv from 'ajv';
import Dropzone from 'react-dropzone';
import { extendObservable, toJS } from 'mobx';

const ajv = require('ajv-errors')(new Ajv({
  allErrors: true,
  jsonPointers: true
}));
const validate = ajv.compile(schema);

class FormEvent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.enableValidations = false;

    extendObservable(this, {
      errors: [],
      message: '',
      event: {
        title: '',
        description: '',
        location: '',
        dates: [],
        image: {}
      }
    });
  }

  getValidatorData() {
    return this.event;
  }

  renderHelpText(err) {
    if (!err) {
      return null;
    }
    return (
     <small className="message f6 bg-light-red white pa2 pb2 db mb2">{ err.message }</small>
    );
  }

  getErrorField(field) {
    return this.errors.find(error => error.dataPath === `/${field}`);
  }

  onChange(field) {
    return event => {
      const value = event.target.value;
      this.event[field] = value;
      if (this.enableValidations) {
        this.validate();
      }
    };
  }

  validate() {
    validate(toJS(this.event));
    this.errors = validate.errors ? validate.errors : [];
  }

  onSubmit(event) {
    event.preventDefault();
    const { eventStore } = this.props;
    this.validate();
    this.enableValidations = true;
    this.message = null;
    if (this.errors.length === 0) {
      eventStore
        .create(toJS(this.event))
        .then(() => {
          this.context.router.navigate('home');
        })
        .catch(err => {
          this.message = err.message;
        });
    }
  }

  onDrop(files) {
    this.event.image = files[0];
  }

  renderInputText({ id, label }) {
    return (
      <div>
        <input
          id={ id }
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          type="text"
          value={this.event[id]}
          onChange={this.onChange(id)}
          aria-describedby="name-desc"
          placeholder={ label } />
        { this.renderHelpText(this.getErrorField(id)) }
      </div>
    );
  }

  renderTextarea() {
    return (
      <div className="textarea">
        <textarea
          id="description"
          className="input-reset ba b--black-20 pa2 mb2 db w-100 h-100"
          aria-describedby="name-desc"
          placeholder="Description"
          onChange={this.onChange('description')}
          value={this.event.description}
        >
        </textarea>
        { this.renderHelpText(this.getErrorField('description')) }
      </div>
    );
  }

  renderMessage() {
    if (!this.message) {
      return null;
    }

    return (
      <div className="bg-red f4 white pa2 w-100">
        {this.message}
      </div>
    )
  }

  renderImage() {
    const dropClasses = classnames('w-100 mb2 dropzone', {
      'ba b--black-20': !this.event.image.preview
    });

    return (
      <div>
        <Dropzone className={dropClasses} onDrop={this.onDrop.bind(this)}>
          { this.event.image.preview ? <img className="mw-100 h-auto" src={this.event.image.preview} alt={this.event.image.name} /> : 'drop/click to upload your image' }
        </Dropzone>
        { this.renderHelpText(this.getErrorField('image')) }
      </div>
    );
  }
}

FormEvent.contextTypes = {
  router: PropTypes.object.isRequired
};

export default FormEvent;
