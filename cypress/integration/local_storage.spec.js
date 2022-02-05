/// <reference types="cypress" />

describe('Local Storage', () => {
    beforeEach(() => {
      cy.visit("http://localhost:5500")
    })

    it("keep color mode", () => {
        cy.get(".mode")
            .click()
            .should(() => {
                expect(localStorage.getItem('theme')).to.eq('light-mode')
            })

        cy.get("body").should("have.class", "light-mode")
       
        cy.reload()
        cy.get("body").should("have.class", "light-mode")
        
        cy.get(".mode")
            .click()
            .should(() => {
                expect(localStorage.getItem('theme')).to.eq('')
            })

        cy.reload()
        cy.get("body").should("not.have.class", "light-mode")
    })

    it("keep user's choice, selected movie and price", () => {
        cy.get("#movie").select("Avengers: Endgame ($10)")
        cy.get(".seat").contains("1").click()
        cy.get(".seat").contains("2")
            .click()
            .should(() => {
                expect(localStorage.getItem('selectedSeats')).to.eq('[0,1]')
                expect(localStorage.getItem('selectedMovieIndex')).to.eq('1')
                expect(localStorage.getItem('selectedMoviePrice')).to.eq('10')
            })

        cy.get("#count").should('have.text', '2')
        cy.get("#total").should('have.text', '20')

        cy.reload()

        cy.get("#movie").should("contain", "Avengers: Endgame ($10)")
        cy.get(".seat").contains("1").should("have.class", "selected")
        cy.get(".seat").contains("2").should("have.class", "selected")
        cy.get("#count").should('have.text', '2')
        cy.get("#total").should('have.text', '20')
    })
  
    it("clear local storage", () => {
        cy.get(".mode").click()
        cy.get("#movie").select("Inception ($9)")
        cy.get(".seat").contains("5")
            .click()
            .should(() => {
                expect(localStorage.getItem('selectedSeats')).to.eq('[4]')
                expect(localStorage.getItem('selectedMovieIndex')).to.eq('3')
                expect(localStorage.getItem('theme')).to.eq('light-mode')
                expect(localStorage.getItem('selectedMoviePrice')).to.eq('9')
            })

        cy.get("#count").should('have.text', '1')
        cy.get("#total").should('have.text', '9')

        cy.clearLocalStorage()
        cy.get("#clearBtn")
            .click()
            .should(() => {
                expect(localStorage.getItem('selectedSeats')).to.eq('[]')
                expect(localStorage.getItem('selectedMovieIndex')).to.eq('0')
                expect(localStorage.getItem('theme')).to.be.null
                expect(localStorage.getItem('selectedMoviePrice')).to.eq('12')
            })

        cy.get("#movie").should("contain", "Batman: The Dark Knight ($12)")
        cy.get(".seat").contains("5").should("not.have.class", "selected")
        cy.get("#count").should('have.text', '0')
        cy.get("#total").should('have.text', '0')
        cy.get("body").should("not.have.class", "light-mode")
    })
  })
  