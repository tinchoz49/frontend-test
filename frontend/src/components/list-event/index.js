import React from 'react';
import Featured from './featured';
import ShowAll from './show-all';
import Button from '../layout/button';
import Loader from '../layout/loader';
import { observer } from 'mobx-react';

class ListEvent extends React.Component {
  static fetchData(store) {
    return store.load();
  }

  componentDidMount() {
    this.props.uiStore.title = 'Events';
    ListEvent.fetchData(this.props.eventStore);
  }

  render() {
    const { eventStore } = this.props;

    if (eventStore.loading) {
      return Loader();
    }

    return (
      <div id="list-event" className="relative h-100">
        <div className="h-75 overflow-auto cf ph2-ns">
          <ShowAll events={ eventStore.events }/>
          <Featured featured={ eventStore.featured }/>
        </div>
        <footer className="absolute bg-white pv3 ph2 bottom-0 w-100 bt tr">
          {
            Button({
              type: 'link',
              routeName: 'create',
              text: 'Create'
            })
          }
        </footer>
    </div>
    );
  }
}

export default observer(ListEvent);
