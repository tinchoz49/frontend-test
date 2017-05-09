import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router5';

const renderTitle = {
  home(title) {
    return (
      <Link routeName='home' className="dib link black-70">
        <h1 className="f3 f2-ns">{ title }</h1>
      </Link>
    );
  },
  common(title) {
    return (
      <div className="dib f1 f-5-ns w-100">
        <Link routeName='home' className="fl link black-70 pr2">
          <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
        </Link>
        <h1 className="black-70 active f3 f2-ns">{ title }</h1>
      </div>
    );
  }
};

export default observer(function Header({ route, uiStore }) {
  return (
    <header className="w-100 pa2 ph5-ns bg-white">
      <div className="db dt-ns mw9 center w-100">
        <div className="db dtc-ns v-mid tl w-100">
          {
            renderTitle[route.name] ? renderTitle[route.name](uiStore.title) : renderTitle.common(uiStore.title)
          }
        </div>
      </div>
    </header>
  );
});
