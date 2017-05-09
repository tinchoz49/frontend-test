import React from 'react';
import cxs from 'cxs';
import Button from '../layout/button';
import { observer } from 'mobx-react';
import FormEvent from './form-event';
import DatesWidget from './form-event/dates-widget';

const className = cxs({
  '.dropzone': {
    'min-height': '250px'
  },
  '.textarea': {
    'height': '90%'
  }
});

class CreateEvent extends FormEvent {
  static fetchData() {
    return Promise.resolve();
  }

  componentDidMount() {
    this.props.uiStore.title = 'Create New Event';
  }

  render() {
    return (
      <form id="create-event" className={ `${className} relative h-100` } onSubmit={this.onSubmit}>
        { this.renderMessage() }
        <div className="h-75 overflow-auto cf ph2-ns">
          <div className="fl h-100 w-100 w-70-ns pa2">
            { this.renderInputText({ id: 'title', label: 'Event Name' }) }
            { this.renderTextarea() }
          </div>
          <div className="fl w-100 w-30-ns pa2">
            { this.renderImage() }
            { this.renderInputText({ id: 'location', label: 'Location' }) }
            <DatesWidget dates={this.event.dates}/>
            { this.renderHelpText(this.getErrorField('dates')) }
          </div>
        </div>
        <footer className="absolute bg-white pv3 ph2 bottom-0 w-100 bt tr">
          {
            Button({
              type: 'submit',
              text: 'Save'
            })
          }
        </footer>
      </form>
    );
  }
}

export default observer(CreateEvent);
