import React from 'react';
import { mount } from 'cypress-react-unit-test';

import List from '../../../src/components/molecules/list';
import Li, { bulletType } from '../../../src/components/atoms/li';

describe("Liste d'objet", () => {
  it('should not have clas on the i', () => {
    mount(
      <List>
        <Li>1</Li>
        <Li>1</Li>
        <Li>1</Li>
      </List>
    );
    cy.get('i').should('not.have.class');
  });

  it('should have have a icon class', () => {
    const icon = bulletType.carret;
    mount(
      <List>
        <Li icon={icon}>1</Li>
        <Li icon={icon}>1</Li>
        <Li icon={icon}>1</Li>
      </List>
    );
    cy.get('i').should('have.class', icon);
  });
});
