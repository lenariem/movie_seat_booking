/// <reference types="cypress" />

describe("App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5500")
    })
    
    it("correct rendering", () => {
        cy.get("#movie")
            .should("be.visible")
            .and("contain", "Batman: The Dark Knight ($12)")
        cy.get(".showcase").should("be.visible")
        cy.get(".screen").should("be.visible")
        cy.get(".row").should("have.length", 6)
        cy.get(".seat")
            .contains("12")
            .should("have.class", "seat occupied")
        cy.get("#count")
            .should("be.visible")
            .should('have.text', '0')
        cy.get("#total")
            .should("be.visible")
            .should('have.text', '0')
        cy.get("#clearBtn")
            .should("be.visible")
            .and('have.text', 'Clear your choice')
        cy.get(".mode").should("be.visible")
    })
    
    it("user books 4 tickets", () => {
        cy.get("#movie").select("Avengers: Endgame ($10)")
        cy.get(".seat")
            .contains("1")
            .click()
            .should("have.class", "selected")
    
        cy.get(".seat")
            .contains("2")
            .click()
            .should("have.class", "selected")
    
        cy.get(".seat")
            .contains("20")
            .click()
            .should("have.class", "selected")
        
            cy.get(".seat")
            .contains("21")
            .click()
            .should("have.class", "selected")
    
        //check amount
        cy.get("#count").should('have.text', '4')
        //check price
        cy.get("#total").should('have.text', '40')
    })
    
    it("clear user's choice", () => {
        cy.get(".seat")
            .contains("17")
            .click()
            .should("have.class", "selected")
        //check amount
        cy.get("#count").should('have.text', '1')
        //check price
        cy.get("#total").should('have.text', '12')
    
        cy.get(".seat")
            .contains("17")
            .click()
            .should("not.have.class", "selected")
        //check amount
        cy.get("#count").should('have.text', '0')
        //check price
        cy.get("#total").should('have.text', '0')
    })
    
    it("user can change movie and price will be changed", () => {
        cy.get(".seat").contains("31").click()
        cy.get(".seat").contains("32").click()
    
        cy.get("#total").should('have.text', '24')
        
        cy.get("#movie").select("Soul ($8)")
    
        cy.get("#total").should('have.text', '16')
    })
    
    it("color mode works", () => {
        cy.get(".mode").click()
        cy.get("body").should("have.class", "light-mode")
    
        cy.get(".mode").click()
        cy.get("body").should("not.have.class", "light-mode")
    })
})






