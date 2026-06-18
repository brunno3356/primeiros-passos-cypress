import RecruitmentPage from '../pages/recruitmentPage.js'
import MenuPage from '../pages/menuPage.js'

const recruitmentPage = new RecruitmentPage()
const menuPage        = new MenuPage()

// ============================================================
// SUÍTE: Recruitment — Orange HRM
// Cobre: Acesso ao módulo, vagas, candidatos, busca,
//        resultados inexistentes, validação de formulário
// ============================================================

describe('📋 Recruitment — Orange HRM', () => {

  beforeEach(() => {
    cy.loginAs()
  })

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Módulo Recruitment carrega corretamente', () => {
    recruitmentPage.accessRecruitmentModule()
    recruitmentPage.checkRecruitmentPageTitle()
  })

  it('✅ [SUCESSO] Página de Vagas (Job Vacancies) carrega tabela', () => {
    recruitmentPage.accessVacancies()
    cy.location('pathname').should('include', '/recruitment/viewJobVacancy')
    recruitmentPage.checkVacancyTableVisible()
  })

  it('✅ [SUCESSO] Página de Candidatos carrega corretamente', () => {
    recruitmentPage.accessCandidates()
    cy.location('pathname').should('include', '/recruitment/viewCandidates')
    cy.get('.oxd-table').should('be.visible')
  })

  it('✅ [SUCESSO] Navegação via menu lateral acessa Recruitment', () => {
    menuPage.acessRecruitment()
    cy.location('pathname').should('include', '/recruitment')
  })

  // ----------------------------------------------------------
  // ❌ CENÁRIOS DE FALHA / RESULTADOS VAZIOS
  // ----------------------------------------------------------

  it('❌ [FALHA] Busca por candidato inexistente retorna "No Records Found"', () => {
    recruitmentPage.accessCandidates()
    recruitmentPage.searchCandidate('CandidatoQueNaoExisteAbsolutamente99999')
    recruitmentPage.checkNoResultsFound()
  })

  // ----------------------------------------------------------
  // ⚠️ CENÁRIOS DE LIMITE / BORDA
  // ----------------------------------------------------------

  it('⚠️ [LIMITE] Busca com +300 caracteres não causa crash', () => {
    recruitmentPage.accessCandidates()
    recruitmentPage.searchCandidate('a'.repeat(310))
    cy.get('body').should('be.visible')
  })

  it('⚠️ [LIMITE] Busca com caracteres especiais não causa crash', () => {
    recruitmentPage.accessCandidates()
    recruitmentPage.searchCandidate('!@#$%^&*()')
    cy.get('body').should('be.visible')
  })

})
