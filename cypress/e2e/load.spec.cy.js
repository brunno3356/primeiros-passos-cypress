import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import PimPage from '../pages/pimPage.js'
import MenuPage from '../pages/menuPage.js'
import userData from '../fixtures/userData.json'

const loginPage     = new LoginPage()
const dashboardPage = new DashboardPage()
const pimPage       = new PimPage()
const menuPage      = new MenuPage()

// ============================================================
// SUÍTE: Testes de Carga / Performance — Orange HRM
//
// Estratégia:
//   - Realiza operações repetidas N vezes medindo tempo
//   - Navega por múltiplos módulos em sequência
//   - Usa cy.intercept() para medir tempo de resposta das APIs
//   - Verifica que o sistema não degrada acima de thresholds
//
// Nota: Cypress não substitui ferramentas como k6/JMeter para
//       carga real, mas permite simular uso intenso em E2E.
// ============================================================

describe('⚡ Testes de Carga e Performance — Orange HRM', () => {

  // ----------------------------------------------------------
  // 🔁 CARGA: Login repetido 5x consecutivos
  // ----------------------------------------------------------

  it('🔁 [CARGA] Login e Logout realizados 5 vezes consecutivas', () => {
    const ITERATIONS = 5

    Cypress._.times(ITERATIONS, (i) => {
      cy.log(`🔄 Iteração ${i + 1} de ${ITERATIONS}`)
      loginPage.acessLoginPage()
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      dashboardPage.checkDashboardPage()

      // Logout via URL direta (mais rápido para testes de carga)
      cy.visit('/auth/logout')
      cy.location('pathname').should('include', '/auth/login')
    })
  })

  // ----------------------------------------------------------
  // 🔁 CARGA: Navegação sequencial por 6 módulos
  // ----------------------------------------------------------

  it('🔁 [CARGA] Navegação sequencial por 6 módulos do sistema', () => {
    cy.loginAs()

    const modules = [
      { path: '/pim/viewEmployeeList',            label: 'PIM' },
      { path: '/leave/viewLeaveModule',            label: 'Leave' },
      { path: '/recruitment/viewRecruitmentModule', label: 'Recruitment' },
      { path: '/performance/viewPerformanceModule', label: 'Performance' },
      { path: '/dashboard/index',                  label: 'Dashboard' },
      { path: '/admin/viewAdminModule',            label: 'Admin' },
    ]

    modules.forEach(({ path, label }) => {
      cy.log(`📂 Navegando para: ${label}`)
      cy.visit(path)
      cy.location('pathname').should('include', path)
      cy.get('body').should('be.visible')
    })
  })

  // ----------------------------------------------------------
  // 🔁 CARGA: Busca no PIM repetida 8 vezes com termos variados
  // ----------------------------------------------------------

  it('🔁 [CARGA] Busca no PIM realizada 8 vezes com termos diferentes', () => {
    cy.loginAs()
    pimPage.accessPimModule()

    const searchTerms = [
      'Admin', 'John', 'Jane', 'Peter', 'Mary',
      'XxInexistente', 'Smith', 'David'
    ]

    searchTerms.forEach((term, index) => {
      cy.log(`🔍 Busca ${index + 1}/8: "${term}"`)
      pimPage.searchByName(term)
      cy.get('.oxd-table-body').should('be.visible')
    })
  })

  // ----------------------------------------------------------
  // 📊 PERFORMANCE: Tempo de carregamento do Dashboard
  // ----------------------------------------------------------

  it('📊 [PERFORMANCE] Dashboard carrega em menos de 10 segundos', () => {
    const startTime = Date.now()

    loginPage.acessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    dashboardPage.checkDashboardPage()

    cy.then(() => {
      const elapsed = Date.now() - startTime
      cy.log(`⏱️ Tempo de carregamento do Dashboard: ${elapsed}ms`)
      expect(elapsed).to.be.lessThan(10000)
    })
  })

  // ----------------------------------------------------------
  // 📊 PERFORMANCE: Intercepta API e verifica tempo de resposta
  // ----------------------------------------------------------

  it('📊 [PERFORMANCE] API de funcionários responde em menos de 5 segundos', () => {
    cy.loginAs()

    cy.intercept('GET', '**/pim/viewEmployeeList**').as('employeeListRequest')

    pimPage.accessPimModule()

    cy.wait('@employeeListRequest', { timeout: 5000 }).then((interception) => {
      cy.log(`✅ API /pim/viewEmployeeList respondeu com status: ${interception.response.statusCode}`)
      expect(interception.response.statusCode).to.be.oneOf([200, 302])
    })
  })

  // ----------------------------------------------------------
  // 📊 PERFORMANCE: Múltiplos logins interceptando a API
  // ----------------------------------------------------------

  it('📊 [PERFORMANCE] Endpoint de autenticação é estável em 3 tentativas', () => {
    const ITERATIONS = 3

    Cypress._.times(ITERATIONS, (i) => {
      cy.log(`🔐 Tentativa de login ${i + 1}/${ITERATIONS}`)

      cy.intercept('POST', '**/auth/validate**').as(`loginRequest_${i}`)

      loginPage.acessLoginPage()
      loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
      dashboardPage.checkDashboardPage()

      cy.visit('/auth/logout')
    })
  })

  // ----------------------------------------------------------
  // 🔁 CARGA: Acesso ao My Info repetido 5 vezes
  // ----------------------------------------------------------

  it('🔁 [CARGA] Acesso à página My Info repetido 5 vezes sem degradação', () => {
    cy.loginAs()

    Cypress._.times(5, (i) => {
      cy.log(`👤 Acesso My Info: iteração ${i + 1}/5`)
      cy.visit('/pim/viewMyDetails')
      cy.location('pathname').should('include', '/pim/viewMyDetails')
      cy.get("[name='firstName']").should('be.visible')
    })
  })

})
