import React from 'react';

import { withKnobs, select, number } from '@storybook/addon-knobs';

import List from '../../components/molecules/list';
import Li, { bulletType } from '../../components/atoms/li';

const renderLi = (qty: Number): Array<JSX.Element> => {
  const liItems: Array<JSX.Element> = [];
  for (let i = 0; i < qty; i++) {
    liItems.push(
      <Li
        icon={select(
          'Node icon',
          { Caret: bulletType.carret, Circle: bulletType.circle },
          bulletType.carret
        )}
      >
        Icon List Item
      </Li>
    );
  }
  return liItems;
};

export const basicLi = () => (
  <List>{renderLi(number('Qty of list items', 3, { min: 0, max: 10 }))}</List>
);

export default {
  component: List,
  title: 'Molecules.List',
  decorators: [withKnobs],
};
