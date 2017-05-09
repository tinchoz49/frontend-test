import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router5';

export default observer(class Featured extends React.Component {
  renderItem(event) {
    return (
      <article key={ event.id }>
        <Link className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" routeName="view" routeParams={{ id: event.id }}>
          <div className="dtc w3">
            <img src={ event.eventImage } className="db w-100" alt={ event.title }/>
          </div>
          <div className="dtc v-top pl2">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">
              { event.title } DATE
            </h1>
            <h2 className="f6 fw4 mt2 mb0 black-60">
              { event.description }
            </h2>
          </div>
        </Link>
      </article>
    );
  }

  render() {
    const { list } = this.props.featured;

    if (list.length === 0) {
      return null;
    }

    return (
      <div className="fl w-100 w-30-ns pa2 mw6 center">
        <h2 className="bb pb2">{ 'Today\'s Higlight' }</h2>
        { list.map(event => this.renderItem(event)) }
      </div>
    );
  }
});
