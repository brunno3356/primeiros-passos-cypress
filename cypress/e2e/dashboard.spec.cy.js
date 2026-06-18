import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'

const dashboardPage = new DashboardPage()
const menuPage      = new MenuPage()

// ============================================================
// SUÍTE: Dashboard — Orange HRM
// Cobre: Widgets, menu lateral, Quick Launch, perfil, título
// ============================================================

describe('🏠 Dashboard — Orange HRM', () => {

  beforeEach(() => {
    cy.loginAs()
  })

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Dashboard carrega com grid de widgets visível', () => {
    dashboardPage.checkDashboardPage()
    dashboardPage.checkDashboardWidgets()
  })

  it('✅ [SUCESSO] Menu lateral exibe pelo menos 5 itens de navegação', () => {
    dashboardPage.checkMainMenuVisible()
  })

  it('✅ [SUCESSO] Ícone de perfil do usuário está visível no header', () => {
    dashboardPage.checkUserProfileVisible()
  })

  it('✅ [SUCESSO] Quick Launch widget está presente no dashboard', () => {
    cy.get('.orangehrm-dashboard-grid').should('be.visible')
    cy.get('.orangehrm-quick-launch').should('be.visible')
  })

  it('✅ [SUCESSO] Navegação para PIM via menu lateral funciona', () => {
    menuPage.acessPim()
    cy.location('pathname').should('include', '/pim/viewEmployeeList')
  })

  it('✅ [SUCESSO] Navegação para Leave via menu lateral funciona', () => {
    menuPage.acessLeave()
    cy.location('pathname').should('include', '/leave')
  })

  it('✅ [SUCESSO] Navegação para Recruitment via menu lateral funciona', () => {
    menuPage.acessRecruitment()
    cy.location('pathname').should('include', '/recruitment')
  })

  it('✅ [SUCESSO] Navegação para Performance via menu lateral funciona', () => {
    menuPage.acessPerformance()
    cy.location('pathname').should('include', '/performance')
  })

  it('✅ [SUCESSO] Retorno ao Dashboard via menu lateral funciona', () => {
    menuPage.acessPim()
    menuPage.acessDashboard()
    dashboardPage.checkDashboardPage()
  })

})
