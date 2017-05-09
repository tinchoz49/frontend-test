import React, { createElement } from 'react';
import ListEvent from './list-event';
import CreateEvent from './create-event';
import ViewEvent from './view-event';

const _components = {
  'home': ListEvent,
  'create': CreateEvent,
  'view': ViewEvent
};

class Main extends React.Component {
  static get components() {
    return _components;
  }

  render() {
    const { route, eventStore, uiStore } = this.props;

    return (
      <main className="cf w-100 h-100 pt3 f6 ph3 ph4-ns">
        <div className="mw9 h-100 center ph3-ns">
          { createElement(Main.components[route.name], { eventStore, uiStore, route }) }
        </div>
      </main>
    );
  }
}

export default Main;
