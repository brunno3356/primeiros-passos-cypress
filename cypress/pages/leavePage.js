/**
 * Page Object — Leave Module
 * Módulo: /leave/viewLeaveModule
 */
class LeavePage {
  selectors() {
    return {
      pageTitle:          '.oxd-topbar-header-breadcrumb h6',
      applyLeaveMenu:     '[href="/web/index.php/leave/applyLeave"]',
      myLeaveMenu:        '[href="/web/index.php/leave/viewMyLeaveList"]',
      leaveTypeDropdown:  '.oxd-select-text',
      fromDateInput:      ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input',
      toDateInput:        ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input',
      applyButton:        '[type="submit"]',
      errorMessage:       '.oxd-input-field-error-message',
      entitlementTable:   '.oxd-table-body',
      balanceTable:       '.leave-type-balance',
      leaveListTable:     '.oxd-table',
      leaveListRows:      '.oxd-table-body .oxd-table-row',
    }
  }

  accessLeaveModule() {
    cy.visit('/leave/viewLeaveModule')
  }

  accessApplyLeave() {
    cy.visit('/leave/applyLeave')
  }

  accessMyLeaveList() {
    cy.visit('/leave/viewMyLeaveList')
  }

  checkLeaveModuleTitle() {
    cy.location('pathname').should('include', '/leave')
    cy.get(this.selectors().pageTitle).should('be.visible')
  }

  selectLeaveType(index = 1) {
    cy.get(this.selectors().leaveTypeDropdown).first().click()
    cy.get('.oxd-select-dropdown > li').eq(index).click()
  }

  fillLeaveDate(fromDate, toDate) {
    cy.get(this.selectors().fromDateInput).clear().type(fromDate)
    cy.get(this.selectors().toDateInput).clear().type(toDate)
  }

  submitLeaveRequest() {
    cy.get(this.selectors().applyButton).click()
  }

  checkErrorMessage() {
    cy.get(this.selectors().errorMessage).should('be.visible')
  }

  checkLeaveListVisible() {
    cy.get(this.selectors().leaveListTable).should('be.visible')
  }
}

export default LeavePage
