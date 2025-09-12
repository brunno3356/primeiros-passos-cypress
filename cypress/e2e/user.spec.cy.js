import userData from '../fixtures/userData.json'

describe('Orange HRM tests', () => {

const selectorsList = {
     usernameFireld: "[name='username']",
     passwordField:  "[name='password']",
     loginButton:    "[type='submit']",
     sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
     dashboardGrid: ".orangehrm-dashboard-grid",
     wrongCredentialAlert: "[role='alert']",
     myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
     firstNameField: "[name='firstName']",
     lastNameField: "[name='lastName']",
     genericField: ".oxd-input--active",
     dateCloseButton: ".--close",
     submitButton: ".oxd-button"
  }

  it.only('User Info Update - Success', () => {
      cy.visit('/auth/login')
      cy.get(selectorsList.usernameFireld).type(userData.userSuccess.username)
      cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
      cy.get(selectorsList.loginButton).click()
      cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
      cy.get(selectorsList.dashboardGrid)
      cy.get(selectorsList.myInfoButton).click()
      cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
      cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
      cy.get(selectorsList.genericField).eq(2).clear().type('Nickname')
      cy.get(selectorsList.genericField).eq(3).clear().type('Employee')
      cy.get(selectorsList.genericField).eq(4).clear().type('otherIdtest')
      cy.get(selectorsList.genericField).eq(5).clear().type('DriversLicence')
      cy.get(selectorsList.genericField).eq(6).clear().type('2025-03-10')
      cy.get(selectorsList.dateCloseButton).click()
      cy.get(selectorsList.submitButton).eq(1).click()
      cy.get('body').should('contain', 'Success')
      cy.get('.oxd-text--toast-message')
  })
  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorsList.usernameFireld).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type( userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
}) 
})