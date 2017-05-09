import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import React from 'react';

const shareOn = {
  twitter({ title, date, url }) {
    let text = `Iré al ${title} @ ${date} `;

    while (text.length + url.length > 140) {
      const split = title.split(' ');
      title = title.slice(0, split.length - 1).join(' ');
      if ([',', '.', '!', '?', ':'].indexOf(title[title.length - 1]) === -1) {
        title = title.slice(0, title.length - 1);
      }
      text = `Iré al ${title}... @ ${date} `;
    }

    return 'http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text);
  }
};

function onSelect(key, message) {
  const width = 680;
  const height = 370;
  const top = (screen.height/2) - height / 2;
  const left= (screen.width/2) - width / 2;
  const features = 'top='+top+',left='+left+',width='+width+',height='+height+'scrollbars=yes,toolbar=yes,location=yes,menubar=yes,resizable=yes,status=yes,titlebar=yes';

  window.open(shareOn[key](message), 'Share your event', features);
}

const menu = (message) => (
  <Menu onSelect={({ key }) => onSelect(key, message)}>
    <MenuItem className="shadow-hover" key="twitter">
      <i className="fa fa-twitter pr2" aria-hidden="true"></i>
      Twitter
    </MenuItem>
  </Menu>
);

export default function Share({ message }) {
  return (
    <Dropdown
      trigger={['click']}
      overlay={menu(message)}
      animation="slide-up"
    >
      <i className="fa fa-share-alt shadow-hover" aria-hidden="true"></i>
    </Dropdown>
  );
}
