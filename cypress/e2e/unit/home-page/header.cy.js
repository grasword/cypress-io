describe('Header', () => {
  beforeEach(() => {
    cy.visit('https://www.cypress.io/')
  })

  it('Navigation menu links has a valid href', () => {
    cy.get('header * ul > li > a').as('navItems')

    cy.get('@navItems').should('have.length', 11)

    cy.get('@navItems').each((item) => {
      cy.wrap(item, { log: false })
        .invoke({ log: false }, 'attr', 'href')
        .then((href) => {
          cy.log(`${href} should return 200`)
          cy.request(href).its('status').should('eq', 200)
        })
    })
  })

  it('Cypress logo has a valid href ', () => {
    cy.get('header * a[href="/"]')
      .invoke('attr', 'href')
      .then((href) => {
        cy.request(href).its('status').should('eq', 200)
      })
  })
})
