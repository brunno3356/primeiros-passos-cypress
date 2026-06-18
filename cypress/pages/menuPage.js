class MenuPage {
  selectors() {
    return {
      myInfoButton:       "[href='/web/index.php/pim/viewMyDetails']",
      performanceButton:  '[href="/web/index.php/performance/viewPerformanceModule"]',
      pimButton:          '[href="/web/index.php/pim/viewEmployeeList"]',
      leaveButton:        '[href="/web/index.php/leave/viewLeaveModule"]',
      timeButton:         '[href="/web/index.php/time/viewTimeModule"]',
      recruitmentButton:  '[href="/web/index.php/recruitment/viewRecruitmentModule"]',
      directoryButton:    '[href="/web/index.php/directory/viewDirectory"]',
      adminButton:        '[href="/web/index.php/admin/viewAdminModule"]',
      dashboardButton:    '[href="/web/index.php/dashboard/index"]',
      mainMenu:           '.oxd-main-menu',
    }
  }

  acessMyinfo() {
    cy.get(this.selectors().myInfoButton).click()
  }

  acessPerformance() {
    cy.get(this.selectors().performanceButton).click()
  }

  acessPim() {
    cy.get(this.selectors().pimButton).click()
  }

  acessLeave() {
    cy.get(this.selectors().leaveButton).click()
  }

  acessRecruitment() {
    cy.get(this.selectors().recruitmentButton).click()
  }

  acessAdmin() {
    cy.get(this.selectors().adminButton).click()
  }

  acessDashboard() {
    cy.get(this.selectors().dashboardButton).click()
  }

  acessDirectory() {
    cy.get(this.selectors().directoryButton).click()
  }
}

export default MenuPage