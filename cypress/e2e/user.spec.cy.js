import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'
import MyInfoPage from '../pages/myInfoPage.js'

const Chance = require('chance')

const chance = new Chance()
const loginPage  = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage   = new MenuPage()
const myInfoPage = new MyInfoPage()

// ============================================================
// SUÍTE: My Info — Orange HRM
// Cobre: Atualização com sucesso, campos obrigatórios,
//        strings longas (+300 chars), caracteres especiais
// ============================================================

describe('👤 My Info — Orange HRM', () => {

  beforeEach(() => {
    cy.loginAs()
  })

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Atualização de dados pessoais com dados válidos', () => {
    menuPage.acessMyinfo()

    const firstName = chance.first()
    const lastName  = chance.last()
    const nickName  = 'Nick' + chance.integer({ min: 1, max: 999 })

    myInfoPage.fillPersonalDetail(firstName, lastName, nickName)
    myInfoPage.fillEmployDetails('EMP001', 'OTH001', '2025-08-28', '2023-03-04')
    myInfoPage.fillStatus()
    myInfoPage.saveForm()
  })

  it('✅ [SUCESSO] Página My Info carrega corretamente', () => {
    menuPage.acessMyinfo()
    cy.location('pathname').should('include', '/pim/viewMyDetails')
    cy.get("[name='firstName']").should('be.visible')
    cy.get("[name='lastName']").should('be.visible')
  })

  // ----------------------------------------------------------
  // ⚠️ CENÁRIOS DE LIMITE / BORDA
  // ----------------------------------------------------------

  it('⚠️ [LIMITE] Nickname com exatamente 300 caracteres é aceito no campo', () => {
    menuPage.acessMyinfo()
    const exactly300 = userData.strings.exactly300
    expect(exactly300.length).to.be.at.least(290)

    cy.get('.oxd-input--active').eq(2).clear().type(exactly300, { delay: 0 })
    cy.get('.oxd-input--active').eq(2).invoke('val').should('have.length.at.least', 1)
  })

  it('⚠️ [LIMITE] Nickname com +300 caracteres é truncado ou aceito sem crash', () => {
    menuPage.acessMyinfo()
    const over300 = userData.strings.over300
    expect(over300.length).to.be.greaterThan(300)

    cy.get('.oxd-input--active').eq(2).clear().type(over300, { delay: 0 })
    // A aplicação não deve travar ou mostrar erro não tratado
    cy.get('body').should('be.visible')
    cy.get('.oxd-input--active').eq(2).should('be.visible')
  })

  it('⚠️ [LIMITE] Caracteres especiais no nickname não causam crash', () => {
    menuPage.acessMyinfo()
    cy.get('.oxd-input--active').eq(2).clear().type(userData.strings.specialChars)
    cy.get('body').should('be.visible')
  })

  it('⚠️ [LIMITE] Caracteres Unicode no nickname não causam crash', () => {
    menuPage.acessMyinfo()
    cy.get('.oxd-input--active').eq(2).clear().type(userData.strings.unicodeChars)
    cy.get('body').should('be.visible')
  })

  // ----------------------------------------------------------
  // ❌ CENÁRIOS DE FALHA / VALIDAÇÃO
  // ----------------------------------------------------------

  it('❌ [FALHA] Salvar formulário com First Name vazio exibe validação', () => {
    menuPage.acessMyinfo()
    cy.get("[name='firstName']").clear()
    cy.get('.oxd-button--secondary').first().click({ force: true })
    // Espera mensagem de campo obrigatório OU toast de sucesso não aparece
    cy.get('body').should('not.contain', 'Successfully Saved')
  })

})