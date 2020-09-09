import React from 'react';
import { mount } from 'cypress-react-unit-test';

import Avatar from '../../../src/components/atoms/avatar';

describe('Avatar', () => {
  it('should show the placeholder avatar', () => {
    mount(<Avatar />);
    cy.get('img').should('exist');
  });
  it('should have "me.png as image\'s source', () => {
    const src = 'me.img';
    mount(<Avatar src={src} alt={'Me'} />);
    cy.get('img').should('have.attr', 'src', src);
  });
});
