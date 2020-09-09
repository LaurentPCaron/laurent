import React from 'react';

import { withKnobs, text } from '@storybook/addon-knobs';

import Avatar from '../../components/atoms/avatar';

export const DefaultAvatar = () => <Avatar />;

export const CustomtAvatar = () => (
  <Avatar
    src={text('Src', 'https://i.redd.it/nzefqjua85z11.jpg')}
    alt={text('Alt', 'Eevee')}
  />
);

export default {
  component: Avatar,
  title: 'Atoms.Avatar',
  decorators: [withKnobs],
};
