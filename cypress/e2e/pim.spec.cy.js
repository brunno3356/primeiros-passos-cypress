import userData from '../fixtures/userData.json'
import PimPage from '../pages/pimPage.js'
import MenuPage from '../pages/menuPage.js'

const pimPage  = new PimPage()
const menuPage = new MenuPage()

// ============================================================
// SUÍTE: PIM (People Information Management) — Orange HRM
// Cobre: Busca de funcionários, filtros, validações de campo,
//        limites de caracteres, resultados vazios
// ============================================================

describe('🧑‍💼 PIM — Orange HRM', () => {

  beforeEach(() => {
    cy.loginAs()
  })

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Módulo PIM carrega a lista de funcionários', () => {
    pimPage.accessPimModule()
    pimPage.checkPageTitle()
    cy.get('.oxd-table').should('be.visible')
  })

  it('✅ [SUCESSO] Busca por "Admin" retorna pelo menos 1 resultado', () => {
    pimPage.accessPimModule()
    pimPage.searchByName('Admin')
    pimPage.checkResultsFound()
  })

  it('✅ [SUCESSO] Tabela de funcionários exibe colunas esperadas', () => {
    pimPage.accessPimModule()
    pimPage.checkTableColumns()
  })

  it('✅ [SUCESSO] Navegação via menu lateral acessa o PIM corretamente', () => {
    cy.navigateTo('PIM')
    cy.location('pathname').should('include', '/pim/viewEmployeeList')
  })

  // ----------------------------------------------------------
  // ❌ CENÁRIOS DE FALHA / RESULTADOS VAZIOS
  // ----------------------------------------------------------

  it('❌ [FALHA] Busca por nome inexistente retorna "No Records Found"', () => {
    pimPage.accessPimModule()
    pimPage.searchByName('XxFuncionarioInexistenteXx99999')
    pimPage.checkNoResultsFound()
  })

  it('❌ [FALHA] Busca por Employee ID inexistente retorna "No Records Found"', () => {
    pimPage.accessPimModule()
    pimPage.searchByEmployeeId('999999999')
    pimPage.checkNoResultsFound()
  })

  // ----------------------------------------------------------
  // ⚠️ CENÁRIOS DE LIMITE / BORDA
  // ----------------------------------------------------------

  it('⚠️ [LIMITE] Campo de busca com +300 caracteres não trava a aplicação', () => {
    pimPage.accessPimModule()
    pimPage.searchByName(userData.strings.over300)
    // Espera resultado vazio ou erro tratado
    cy.get('body').should('be.visible')
    cy.get('.oxd-table-body').should('be.visible')
  })

  it('⚠️ [LIMITE] Campo de busca com caracteres especiais não causa crash', () => {
    pimPage.accessPimModule()
    pimPage.searchByName(userData.strings.specialChars)
    cy.get('body').should('be.visible')
  })

  it('⚠️ [LIMITE] Campo de busca com tentativa XSS não executa script', () => {
    pimPage.accessPimModule()
    pimPage.searchByName(userData.strings.xssAttempt)
    cy.get('body').should('not.contain', 'xss')
  })

})
