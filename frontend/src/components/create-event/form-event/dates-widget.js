import React from 'react';
import { observer } from 'mobx-react';
import format from 'date-fns/format';

export default observer(class DatesWidget extends React.Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onAdd(e) {
    e.preventDefault();
    const { dates } = this.props;
    dates.push(new Date());
  }

  onRemove(e) {
    e.preventDefault();
    const { dates } = this.props;
    dates.pop();
  }

  onChange(key) {
    return event => {
      const value = event.target.value;
      this.parseDates[key] = value;
    };
  }

  renderDate(key, date) {
    const value = date ? format(date, 'YYYY-MM-DD') : '';

    return <input
          className="input-reset ba b--black-20 pa2 mb2 db"
          type="date"
          required
          value={value}
          onChange={this.onChange(key)}
          aria-describedby="name-desc"/>;
  }

  renderTime(key, time) {
    const value = time ? format(time, 'hh:mm') : '';

    return <input
          className="input-reset ba b--black-20 pa2 mb2 db"
          type="time"
          required
          value={value}
          onChange={this.onChange(key)}
          aria-describedby="name-desc"/>;
  }

  renderField(key, date) {
    return (
      <tr key={key} className="striped--light-gray">
        <td>
          { this.renderDate(key, date) }
        </td>
        <td>
          { this.renderTime(key, date) }
        </td>
        <td>
        </td>
      </tr>
    );
  }

  render() {
    const { dates } = this.props;

    return (
      <table className="collapse w-100 ba br2 b--black-10 pv2 ph3">
        <tbody>
          <tr className="striped--light-gray">
            <th className="pv2 ph3 tc f6 fw6 ttu">Date</th>
            <th className="tc f6 ttu fw6 pv2 ph3">Time</th>
            <th className="tr f6 ttu fw6 pv2 th3">
              <a onClick={this.onAdd} className="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center mr2 tc br2 pa2" title="Add date">
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </a>
              <a onClick={this.onRemove} className="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center tc br2 pa2" title="Add date">
                <i className="fa fa-minus-circle" aria-hidden="true"></i>
              </a>
            </th>
          </tr>
          {
            dates.map((date, key) => this.renderField(key, date))
          }
        </tbody>
      </table>
    );
  }
});
