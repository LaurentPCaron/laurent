import React from 'react';

import Li from '../../components/atoms/li';

export const BasicLi = () => <Li>Basic List Item</Li>;

export const IconLi = () => <Li icon="caret right">Icon List Item</Li>;

export default {
  component: Li,
  title: 'Atoms.Liste Item',
};
