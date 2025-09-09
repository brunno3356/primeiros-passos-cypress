describe('Orange HRM tests', () => {

const selectorsList = {
     usernameFireld: "[name='username']",
     passwordField:  "[name='password']",
     loginButton:    "[type='submit']",
     sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
     wrongCredentialAlert: "[role='alert']"
  }

  it('Login - Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorsList.usernameFireld).type('Admin')
    cy.get(selectorsList.passwordField).type('admin123')
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.sectionTitleTopBar).contains('Dashboard')
  })
  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorsList.usernameFireld).type('Test')
    cy.get(selectorsList.passwordField).type('test')
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
}) 
})