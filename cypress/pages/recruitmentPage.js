/**
 * Page Object — Recruitment Module
 * Módulo: /recruitment/viewRecruitmentModule
 */
class RecruitmentPage {
  selectors() {
    return {
      pageTitle:          '.oxd-topbar-header-breadcrumb h6',
      addButton:          '.oxd-button--secondary',
      jobTitleDropdown:   '.oxd-select-text',
      vacancyInput:       ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input',
      hiringManagerInput: ':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input',
      descriptionInput:   'textarea',
      saveButton:         '[type="submit"]',
      searchButton:       '[type="submit"]',
      vacancyTable:       '.oxd-table',
      tableRows:          '.oxd-table-body .oxd-table-row',
      noRecordText:       '.oxd-table-body span',
      candidateNameInput: ':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input',
      statusDropdown:     ':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-text',
    }
  }

  accessRecruitmentModule() {
    cy.visit('/recruitment/viewRecruitmentModule')
  }

  accessVacancies() {
    cy.visit('/recruitment/viewJobVacancy')
  }

  accessCandidates() {
    cy.visit('/recruitment/viewCandidates')
  }

  checkRecruitmentPageTitle() {
    cy.location('pathname').should('include', '/recruitment')
    cy.get(this.selectors().pageTitle).should('be.visible')
  }

  checkVacancyTableVisible() {
    cy.get(this.selectors().vacancyTable).should('be.visible')
  }

  searchCandidate(name) {
    cy.get(this.selectors().candidateNameInput).clear().type(name)
    cy.get(this.selectors().searchButton).last().click()
    cy.waitForLoader()
  }

  checkResultsFound() {
    cy.get(this.selectors().tableRows).should('have.length.at.least', 1)
  }

  checkNoResultsFound() {
    cy.get(this.selectors().noRecordText).should('contain', 'No Records Found')
  }
}

export default RecruitmentPage
