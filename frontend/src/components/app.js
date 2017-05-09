import React from 'react';
import { routeNode } from 'react-router5';
import Header from './layout/header';
import Main from './main';

function App({ eventStore, uiStore, route }) {
  return (
    <div className="content-app h-100">
      <Header route={ route } uiStore={ uiStore }/>
      <Main eventStore={ eventStore } uiStore={ uiStore } route={ route }/>
    </div>
  );
}

export default routeNode('')(App);
