import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'


const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM tests', () => {

const selectorsList = {
    
     
    
     firstNameField: "[name='firstName']",
     lastNameField: "[name='lastName']",
     genericField: ".oxd-input--active",
     dateCloseButton: ".--close",
     submitButton: ".oxd-button",
     nationalityField: "[data-v-67d2aedf='']",
     marriedField: "[data-v-67d2aedf='']"
     
  }

  it.only('User Info Update - Success', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      
    dashboardPage.checkDashboardPage()
    menuPage.acessMyinfo()

   
   cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
   cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
   cy.get(selectorsList.genericField).eq(2).clear().type('Nickname')
   cy.get(selectorsList.genericField).eq(3).clear().type('Employee')
   cy.get(selectorsList.genericField).eq(4).clear().type('otherIdtest')
   cy.get(selectorsList.genericField).eq(5).clear().type('DriversLicence')
   cy.get(selectorsList.genericField).eq(6).clear().type('2025-03-10')
   cy.get(selectorsList.dateCloseButton).click()
   cy.get(selectorsList.submitButton).eq(1).click()
   cy.get(selectorsList.nationalityField).eq(1).click()
   cy.get('.oxd-select-dropdown > :nth-child(7)').click()
   cy.get(selectorsList.marriedField).eq(5).click()
   cy.get(':nth-child(4) > span').click()

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