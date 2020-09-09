import React from 'react';
import { mount } from 'cypress-react-unit-test';

import Li from '../../../src/components/atoms/li';

describe('Molecule Li', () => {
  it('should have place older text if no children', () => {
    mount(<Li></Li>);
    cy.get('i').should('not.have.class');
  });
});
