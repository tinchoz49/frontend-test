import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Loader from '../layout/loader';

class ViewEvent extends React.Component {
  static fetchData(store, params = {}) {
    return store.findById(params.id);
  }

  componentDidMount() {
    ViewEvent
      .fetchData(this.props.eventStore, { id: this.props.route.params.id })
      .catch(() => {
        this.context.router.navigate('home');
      });
    this.props.uiStore.title = 'View Event';
  }

  renderTR(date, key) {
    console.log(format(date, 'hh:mm'));
    return (
      <tr key={key} className="striped--light-gray">
        <td>
          { format(date, 'MMM DD @ YYYY') }
        </td>
        <td>
          { format(date, 'hh:mm') }
        </td>
      </tr>
    );
  }

  renderTable(dates) {
    return (
      <table className="collapse w-100 ba br2 b--black-10 pv2 ph3">
        <tbody>
          <tr className="striped--light-gray">
            <th className="pv2 ph3 tc f6 fw6 ttu">Date</th>
            <th className="tc f6 ttu fw6 pv2 ph3">Time</th>
          </tr>
          {
            dates.map((date, key) => this.renderTR(date, key))
          }
        </tbody>
      </table>
    );
  }

  render() {
    const { lastView } = this.props.eventStore;

    if (lastView.loading) {
      return Loader();
    }

    const event = lastView.item;

    if (!event) {
      return null;
    }

    return (
      <div id="view-event" className="relative h-100">
        <div className="h-75 overflow-auto cf ph2-ns">
          <div className="fl h-100 w-100 w-70-ns pa2">
            <h2>{ event.title }</h2>
            <p>{ event.description }</p>
          </div>
          <div className="fl w-100 w-30-ns pa2">
            <img className="mw-100 h-auto" src={event.eventImage} alt={event.title} />
            <h4>{ event.location }</h4>
            { this.renderTable(event.dates) }
          </div>
        </div>
      </div>
    );
  }
}

ViewEvent.contextTypes = {
  router: PropTypes.object.isRequired
};

export default observer(ViewEvent);
