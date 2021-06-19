/// <reference types="cypress" />

import Chance from 'chance';

const chance = new Chance();

describe('Admin console page', () => {
    const email = chance.email();
    const pass = 'ValidPassword111';

    beforeEach(() => {
        cy.visit('https://intense-shore-07962.herokuapp.com/');
    });

    it('has a title', () => {
        cy.contains('Email')
        cy.contains('Password')
        cy.contains('Remember me')
        cy.contains('Forgot your password?')
    });

    it('blocks unauthorized access', () => {
        cy.get('#delivery_manager_email')
            .type(email, { force: true });
        cy.get('#delivery_manager_password')
            .type(pass, { force: true });
        cy.get('#delivery_manager_submit_action').click();

        cy.get('.flashes').children()
            .should('contain', 'Invalid Email or password.')
            .and("be.visible");
    });

    it('allows to be logged in', () => {
        cy.get('#delivery_manager_email')
            .type('deliverymanager@example.com', {force: true});
        cy.get('#delivery_manager_password')
            .type('password', {force: true});
        cy.get('#delivery_manager_submit_action').click();

        cy.get('.flash')
            .should('contain', 'Signed in successfully.');
        cy.url().should('eq', 'https://intense-shore-07962.herokuapp.com/');
        cy.get('#header').children()
            .should('contain', 'Delivery App');
        cy.get('#header').children()
            .should('contain', 'Comments');
        cy.get('#header').children()
            .should('contain', 'Couriers');
        cy.get('#header').children()
            .should('contain', 'Delivery Managers');
        cy.get('#header').children()
            .should('contain', 'Package Assignments');
        cy.get('#header').children()
            .should('contain', 'Packages');
        cy.get('#logout')
            .should('contain', 'Logout');
    });
});