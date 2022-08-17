describe('Hero block', () => {
  beforeEach(() => {
    cy.visit('https://www.cypress.io/')
  })

  it('`$npm install cypress` button copy npm command in clipboard ', { browser: 'chrome' }, () => {
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin
        }
      })
    )

    cy.window()
      .its('navigator.permissions')
      .invoke('query', { name: 'clipboard-read' })
      .its('state')
      .should('equal', 'granted')

    cy.get('section.Hero').find('button.NpmButton__Button-sc-8gct4l-0').focus().realClick()

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq('npm install cypress')
      })
    })
  })

  it('`$npm install cypress` click triggers a `toast` popup ', () => {
    cy.get('section.Hero').find('button.NpmButton__Button-sc-8gct4l-0').focus().realClick()

    cy.contains('.ClipboardMsg', 'Copied to clipboard!').should('be.visible')

    cy.get('.ClipboardMsg', { timeout: 2000 }).should('not.exist')
  })
})
