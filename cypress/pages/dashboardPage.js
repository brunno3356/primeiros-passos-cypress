class DashboardPage {
  selectors() {
    return {
      dashboardGrid:      '.orangehrm-dashboard-grid',
      quickLaunchWidget:  '.orangehrm-quick-launch-card',
      quickLaunchItems:   '.orangehrm-quick-launch-card',
      timeAtWorkWidget:   '.orangehrm-attendance-card',
      mainMenu:           '.oxd-main-menu',
      sidebarItems:       '.oxd-main-menu-item',
      pageTitle:          '.oxd-topbar-header-breadcrumb h6',
      userProfileIcon:    '[aria-label="profile"]',
      welcomeMessage:     '.oxd-userdropdown-name',
    }
  }

  checkDashboardPage() {
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(this.selectors().dashboardGrid).should('be.visible')
  }

  checkDashboardWidgets() {
    cy.get(this.selectors().dashboardGrid).should('be.visible')
    cy.get(this.selectors().quickLaunchItems).should('have.length.at.least', 1)
  }

  checkMainMenuVisible() {
    cy.get(this.selectors().mainMenu).should('be.visible')
    cy.get(this.selectors().sidebarItems).should('have.length.at.least', 5)
  }

  checkUserProfileVisible() {
    cy.get(this.selectors().userProfileIcon).should('be.visible')
  }

  checkPageTitle(expected) {
    if (expected) {
      cy.get(this.selectors().pageTitle).should('contain', expected)
    } else {
      cy.get(this.selectors().pageTitle).should('be.visible')
    }
  }
}

export default DashboardPage