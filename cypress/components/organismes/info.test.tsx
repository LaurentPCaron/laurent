import React from 'react';
import { mount } from 'cypress-react-unit-test';

import Info from '../../../src/components/organismes/info';

describe('Info Div', () => {
  before(() => {
    mount(
      <Info
        avatarSrc={'placeHoler.png'}
        avatarAlt={'PlaceHolder'}
        profilItems={['a', 'b', 'c']}
      />
    );
  });
  it('should have the avatar', () => {
    cy.get('Avatar').should('exist');
  });
  it('should have the liste of info', () => {
    cy.get('List').should('exist');
  });
});
