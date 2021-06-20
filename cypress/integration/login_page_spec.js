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
        cy.login(email, pass);

        cy.get('.flashes').children()
            .should('contain', 'Invalid Email or password.')
            .and("be.visible");
    });

    it('allows to be logged in', () => {
        cy.fixture("test_data").then((user) => {
            const userName = user.email;
            const passWord = user.password;
            cy.login(userName, passWord);
        });

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