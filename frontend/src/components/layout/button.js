import React from 'react';
import { Link } from 'react-router5';

export default function Button(props) {
  const className = 'f5 no-underline black bg-white bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4';

  if (props.type === 'link') {
    return (
      <Link routeName={ props.routeName } className={ className } routeParams={ props.routeParams }>
        <span>{ props.text }</span>
      </Link>
    );
  }

  if (props.type === 'submit') {
    return (
      <input className={ className } type="submit" value={props.text} />
    );
  }
  return (
    <button className={ className } onClick={ props.action }>
      <span>{ props.text }</span>
    </button>
  );
}
