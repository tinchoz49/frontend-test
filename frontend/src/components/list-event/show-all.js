import React from 'react';
import { observer } from 'mobx-react';
import Card from './card';

export default observer(class ShowAll extends React.Component {
  render() {
    const { list } = this.props.events;

    if (list.length === 0) {
      return null;
    }

    return (
      <div className="fl w-100 w-70-ns pa2">
        { list.map(event => <Card key={event.id} event={ event } />)}
      </div>
    );
  }
});
