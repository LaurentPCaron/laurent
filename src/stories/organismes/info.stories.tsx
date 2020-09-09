import React from 'react';

import Info from '../../components/organismes/info';

export const DefaultInfo = () => (
  <Info
    avatarSrc="https://i.redd.it/nzefqjua85z11.jpg"
    avatarAlt="eevee.png"
    profilItems={['Laurent', 'Caron', 'Front-End']}
  />
);

export default {
  component: Info,
  title: 'Organismes.Info',
};
