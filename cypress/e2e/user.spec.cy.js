import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'
import MyInfoPage from '../pages/myInfoPage.js'

const Chance = require('chance');

const chance = new Chance();
const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfoPage = new MyInfoPage()

describe('Orange HRM tests', () => {

  it('User Info Update - Success', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      
    dashboardPage.checkDashboardPage()
    menuPage.acessMyinfo()

    myInfoPage.fillPersonalDetail(chance.first(), chance.last(), chance.string())
    myInfoPage.fillEmployDetails('Employeeid', 'Otherid', '2025-08-28', chance.date({string: true, american: false}))
    myInfoPage.fillStatus()
    myInfoPage.saveForm()
  })
  
})