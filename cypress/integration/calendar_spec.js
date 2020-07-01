const { idText, createYield } = require("typescript")

describe ('Site test', () => {
    it('successfully loads', () => {
        cy.visit('/')
    })
})