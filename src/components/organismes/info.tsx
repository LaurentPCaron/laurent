import React from 'react';

import Avatar from '../atoms/avatar';
import List from '../molecules/list';
import Li, { bulletType } from '../atoms/li';

const Info = (props: IInfo) => {
  const { avatarAlt, avatarSrc, profilItems } = props;

  const renderLi = () => {
    return profilItems.map(item => {
      return <Li icon={bulletType.carret}>{item}</Li>;
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'pink',
        maxWidth: '15%',
        height: '30em',
        paddingTop: '2.5em',
      }}
    >
      <div>
        <div style={{ padding: '0 25%' }}>
          <Avatar src={avatarSrc} alt={avatarAlt} />
        </div>
        <div style={{ padding: '5em 2.5em' }}>
          <List>{renderLi()}</List>
        </div>
      </div>
    </div>
  );
};

export interface IInfo {
  avatarSrc: string;
  avatarAlt: string;
  profilItems: string[];
}

export default Info;
