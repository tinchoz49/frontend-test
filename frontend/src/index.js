import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import App from './components/app';
import router from './router';
import EventStore from './stores/event-store';
import UiStore from './stores/ui-store';
import 'tachyons';
import 'font-awesome/css/font-awesome.css';
import './components/layout/index.css';
import 'rc-dropdown/assets/index.css';

const eventStore = EventStore(window.__STATE);
const uiStore = UiStore();
router.start(() => {
  ReactDOM.render(
    <RouterProvider router={ router }>
      <App eventStore={ eventStore } uiStore={ uiStore }/>
    </RouterProvider>,
    document.getElementById('root')
  );
});

