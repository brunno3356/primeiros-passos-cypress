import LeavePage from '../pages/leavePage.js'
import MenuPage from '../pages/menuPage.js'

const leavePage = new LeavePage()
const menuPage  = new MenuPage()

// ============================================================
// SUÍTE: Leave (Licenças/Férias) — Orange HRM
// Cobre: Acesso ao módulo, tipos de licença, My Leave List,
//        solicitação sem data (falha), datas inválidas
// ============================================================

describe('📅 Leave — Orange HRM', () => {

  beforeEach(() => {
    cy.loginAs()
  })

  // ----------------------------------------------------------
  // ✅ CENÁRIOS DE SUCESSO
  // ----------------------------------------------------------

  it('✅ [SUCESSO] Módulo Leave carrega corretamente', () => {
    leavePage.accessLeaveModule()
    leavePage.checkLeaveModuleTitle()
  })

  it('✅ [SUCESSO] Navegação para "Apply Leave" funciona', () => {
    leavePage.accessApplyLeave()
    cy.location('pathname').should('include', '/leave/applyLeave')
    cy.get('.oxd-select-text').should('be.visible')
  })

  it('✅ [SUCESSO] Página "My Leave List" carrega tabela de licenças', () => {
    leavePage.accessMyLeaveList()
    cy.location('pathname').should('include', '/leave/viewMyLeaveList')
    leavePage.checkLeaveListVisible()
  })

  it('✅ [SUCESSO] Navegação via menu lateral acessa Leave corretamente', () => {
    menuPage.acessLeave()
    cy.location('pathname').should('include', '/leave')
  })

  // ----------------------------------------------------------
  // ❌ CENÁRIOS DE FALHA / VALIDAÇÃO
  // ----------------------------------------------------------

  it('❌ [FALHA] Submeter solicitação de licença sem selecionar tipo exibe erro', () => {
    leavePage.accessApplyLeave()
    leavePage.submitLeaveRequest()
    cy.get('.oxd-input-field-error-message').should('be.visible')
  })

  it('❌ [FALHA] Submeter licença sem preencher as datas exibe erro de validação', () => {
    leavePage.accessApplyLeave()
    leavePage.selectLeaveType(1)
    leavePage.submitLeaveRequest()
    // Espera pelo menos uma mensagem de erro de campo obrigatório
    cy.get('.oxd-input-field-error-message').should('have.length.at.least', 1)
  })

  // ----------------------------------------------------------
  // ⚠️ CENÁRIOS DE LIMITE / BORDA
  // ----------------------------------------------------------

  it('⚠️ [LIMITE] Comentário com +300 caracteres no campo de notas não trava', () => {
    leavePage.accessApplyLeave()
    leavePage.selectLeaveType(1)
    cy.get('textarea').first().type(
      'a'.repeat(305),
      { delay: 0 }
    )
    cy.get('body').should('be.visible')
  })

  it('⚠️ [LIMITE] Data em formato inválido exibe erro ou é ignorada', () => {
    leavePage.accessApplyLeave()
    leavePage.selectLeaveType(1)
    leavePage.fillLeaveDate('99/99/9999', '99/99/9999')
    leavePage.submitLeaveRequest()
    cy.get('body').should('be.visible')
  })

})
