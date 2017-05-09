import React from 'react';
import { observer } from 'mobx-react';
import cxs from 'cxs';
import Button from '../../layout/button';
import Share from '../../layout/share';
import format from 'date-fns/format'

const className = cxs({
  'height': '450px'
});

export default observer(function Card() {
  const { event } = this.props;

  return (
    <article className={ `${className} fl w-100 w-50-ns pa2` }>
      <div className="content relative mw mw6-ns hidden ba h-100">
        <div className="absolute o-40 w-100 h-100">
          <div className="absolute w-100 h-100" style={{ background: `url(${event.eventImage})`, backgroundSize: 'cover' }}></div>
          <div className="absolute bg-black o-80 w-100 h-100"></div>
        </div>
        <div className="relative flex flex-column h-100">
          <div className="self-start w-100 cf mv0 ph3">
            <div className="fl w-80">
              <h3 className="f4 white">{ format(event.nextDate, 'MMM DD @ YYYY') }</h3>
            </div>
            <div className="fl w-20 f2 pv3 ph4 center white">
              <Share message={{
                title: event.title,
                date: format(event.nextDate, 'DD/MM/YYYY'),
                url: ''
              }}/>
            </div>
          </div>
          <div className="self-middle flex pa3 bt h5">
            <h2 className="self-end white f3">
              { event.title }
            </h2>
          </div>
          <div className="self-end pv2 ph2 bottom-0 w-100 bt">
            {
              Button({
                type: 'link',
                routeName: 'view',
                routeParams: {
                  id: event.id
                },
                text: 'View'
              })
            }
          </div>
        </div>
      </div>
    </article>
  );
});
