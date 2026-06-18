// ***********************************************
// Custom Commands — Orange HRM Cypress Suite
// ***********************************************

import LoginPage from '../pages/loginPage'
import userData from '../fixtures/userData.json'

const loginPage = new LoginPage()

/**
 * Realiza login com usuário Admin (padrão)
 * Uso: cy.loginAs() ou cy.loginAs('Admin', 'admin123')
 */
Cypress.Commands.add('loginAs', (username = userData.userSuccess.username, password = userData.userSuccess.password) => {
  loginPage.acessLoginPage()
  loginPage.loginWithAnyUser(username, password)
  cy.location('pathname').should('include', '/dashboard/index')
})

/**
 * Realiza logout da aplicação
 */
Cypress.Commands.add('logout', () => {
  cy.get('[aria-label="profile"]').click({ force: true })
  cy.contains('Logout').click()
  cy.location('pathname').should('include', '/auth/login')
})

/**
 * Aguarda o spinner/loader sumir
 */
Cypress.Commands.add('waitForLoader', () => {
  cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist')
})

/**
 * Navega para um módulo via menu lateral
 * @param {string} menuItem - texto do item do menu
 */
Cypress.Commands.add('navigateTo', (menuItem) => {
  cy.get('.oxd-main-menu').contains(menuItem).click()
})