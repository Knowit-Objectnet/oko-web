import { createYield, idText } from 'typescript';

describe('Site test', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });
});
