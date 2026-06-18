import PerformancePage from '../pages/performancePage.js'
import MenuPage from '../pages/menuPage.js'

const performancePage = new PerformancePage()
const menuPage        = new MenuPage()

// ============================================================
// SUÍTE: Performance — Orange HRM
// Cobre: Acesso ao módulo, sub-menus, KPIs, My Reviews
// ============================================================

describe('📊 Performance — Orange HRM', () => {

  beforeEach(() => {
    cy.loginAs()
  })

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Módulo Performance carrega corretamente', () => {
    performancePage.accessPerformanceModule()
    performancePage.checkPerformancePageTitle()
  })

  it('✅ [SUCESSO] Sub-menus do módulo Performance estão visíveis', () => {
    performancePage.accessPerformanceModule()
    performancePage.checkSubMenusVisible()
  })

  it('✅ [SUCESSO] Página de KPIs carrega tabela', () => {
    performancePage.accessManageKpis()
    cy.location('pathname').should('include', '/performance/searchKpi')
    performancePage.checkTableVisible()
  })

  it('✅ [SUCESSO] Página "My Reviews" carrega corretamente', () => {
    performancePage.accessMyReviews()
    cy.location('pathname').should('include', '/performance/viewMyPerformanceReview')
    cy.get('.oxd-table').should('be.visible')
  })

  it('✅ [SUCESSO] Navegação via menu lateral acessa Performance', () => {
    menuPage.acessPerformance()
    cy.location('pathname').should('include', '/performance')
  })

})
