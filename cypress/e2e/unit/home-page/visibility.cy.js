describe('Home page visibility testing', () => {
  beforeEach(() => {
    cy.visit('https://www.cypress.io/')
  })

  const pageElements = ['header', 'main', 'footer']

  pageElements.forEach((element) => {
    it(`${element} is displayed`, () => {
      cy.get(element).should('be.visible')
    })
  })

  it('Cypress logo is displayed ', () => {
    cy.get('header > div > a[href*="/"]').should('be.visible')
  })
})
