/**
 * Page Object — PIM (People Information Management)
 * Módulo: /pim/viewEmployeeList
 */
class PimPage {
  selectors() {
    return {
      pageTitle:          '.oxd-topbar-header-breadcrumb h6',
      searchNameInput:    ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input',
      employeeIdInput:    ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input',
      searchButton:       '[type="submit"]',
      addButton:          '.oxd-button--secondary',
      tableRows:          '.oxd-table-body .oxd-table-row',
      tableEmptyText:     '.oxd-table-body span',
      recordCountText:    '.oxd-text--span',
      firstNameCol:       '.oxd-table-cell:nth-child(2)',
      tableHeader:        '.oxd-table-header',
    }
  }

  accessPimModule() {
    cy.visit('/pim/viewEmployeeList')
  }

  searchByName(name) {
    cy.get(this.selectors().searchNameInput).clear().type(name)
    cy.get(this.selectors().searchButton).click()
    cy.waitForLoader()
  }

  searchByEmployeeId(id) {
    cy.get(this.selectors().employeeIdInput).clear().type(id)
    cy.get(this.selectors().searchButton).click()
    cy.waitForLoader()
  }

  checkResultsFound() {
    cy.get(this.selectors().tableRows).should('have.length.at.least', 1)
  }

  checkNoResultsFound() {
    cy.get(this.selectors().tableEmptyText).should('contain', 'No Records Found')
  }

  checkPageTitle() {
    cy.location('pathname').should('include', '/pim/viewEmployeeList')
  }

  checkTableColumns() {
    cy.get(this.selectors().tableHeader).should('be.visible')
    cy.get(this.selectors().tableHeader).should('contain', 'First Name')
    cy.get(this.selectors().tableHeader).should('contain', 'Last Name')
  }

  getRecordCount() {
    return cy.get(this.selectors().recordCountText).first()
  }
}

export default PimPage
