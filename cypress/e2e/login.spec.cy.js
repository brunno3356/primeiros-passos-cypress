import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()

// ============================================================
// SUÍTE: Login Orange HRM
// Cobre: Sucesso, Falha, Campos Vazios, Strings Longas,
//        SQL Injection, XSS, Verificação de URL e Mensagens
// ============================================================

describe('🔐 Login — Orange HRM', () => {

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Login com credenciais válidas redireciona para Dashboard', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    dashboardPage.checkDashboardPage()
  })

  it('✅ [SUCESSO] Dashboard exibe o grid de widgets após login', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    dashboardPage.checkDashboardWidgets()
  })

  it('✅ [SUCESSO] URL após login contém /dashboard/index', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
  })

  // ----------------------------------------------------------
  // ❌ CENÁRIOS DE FALHA
  // ----------------------------------------------------------

  it('❌ [FALHA] Login com usuário inválido exibe mensagem de erro', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userFail.username, userData.userFail.password)
    loginPage.checkAcessIvalid()
    cy.get("[role='alert']").should('contain', 'Invalid credentials')
  })

  it('❌ [FALHA] Login com username correto e senha errada exibe erro', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, 'senha_errada_123')
    cy.get("[role='alert']").should('be.visible')
  })

  it('❌ [FALHA] Login com ambos os campos vazios exibe erro de obrigatório', () => {
    loginPage.acessLoginPage()
    cy.get("[type='submit']").click()
    cy.get('.oxd-input-field-error-message').should('have.length.at.least', 1)
    cy.get('.oxd-input-field-error-message').first().should('contain', 'Required')
  })

  it('❌ [FALHA] Login com username vazio exibe campo obrigatório', () => {
    loginPage.acessLoginPage()
    cy.get("[name='password']").type(userData.userEmptyUsername.password)
    cy.get("[type='submit']").click()
    cy.get('.oxd-input-field-error-message').should('be.visible')
  })

  it('❌ [FALHA] Login com password vazio exibe campo obrigatório', () => {
    loginPage.acessLoginPage()
    cy.get("[name='username']").type(userData.userEmptyPassword.username)
    cy.get("[type='submit']").click()
    cy.get('.oxd-input-field-error-message').should('be.visible')
  })

  it('❌ [FALHA] Página de login mantém URL /auth/login em caso de falha', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userFail.username, userData.userFail.password)
    cy.location('pathname').should('include', '/auth/login')
  })

  // ----------------------------------------------------------
  // ⚠️ CENÁRIOS DE LIMITE / BORDA
  // ----------------------------------------------------------

  it('⚠️ [LIMITE] Username com +300 caracteres não autentica', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userLongUsername.username, userData.userLongUsername.password)
    cy.get("[role='alert']").should('be.visible')
    cy.location('pathname').should('include', '/auth/login')
  })

  it('⚠️ [LIMITE] Password com +300 caracteres não autentica', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userLongPassword.username, userData.userLongPassword.password)
    cy.get("[role='alert']").should('be.visible')
    cy.location('pathname').should('include', '/auth/login')
  })

  // ----------------------------------------------------------
  // 🔒 SEGURANÇA
  // ----------------------------------------------------------

  it('🔒 [SEGURANÇA] SQL Injection no username não autentica', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSqlInjection.username, userData.userSqlInjection.password)
    cy.location('pathname').should('include', '/auth/login')
    cy.get("[role='alert']").should('be.visible')
  })

  it('🔒 [SEGURANÇA] Página de login está disponível (health check)', () => {
    loginPage.acessLoginPage()
    cy.get("[name='username']").should('be.visible')
    cy.get("[name='password']").should('be.visible')
    cy.get("[type='submit']").should('be.visible')
  })

})