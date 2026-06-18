/**
 * Page Object — Performance Module
 * Módulo: /performance/viewPerformanceModule
 */
class PerformancePage {
  selectors() {
    return {
      pageTitle:        '.oxd-topbar-header-breadcrumb h6',
      manageKpisMenu:   '[href="/web/index.php/performance/searchKpi"]',
      myTrackerMenu:    '[href="/web/index.php/performance/viewMyPerformanceReview"]',
      trackerTable:     '.oxd-table',
      kpiTable:         '.oxd-table',
      tableRows:        '.oxd-table-body .oxd-table-row',
      subMenuItems:     '.oxd-topbar-body-nav-tab-item',
      topBarNav:        '.oxd-topbar-body-nav',
    }
  }

  accessPerformanceModule() {
    cy.visit('/performance/viewPerformanceModule')
  }

  accessManageKpis() {
    cy.visit('/performance/searchKpi')
  }

  accessMyReviews() {
    cy.visit('/performance/viewMyPerformanceReview')
  }

  checkPerformancePageTitle() {
    cy.location('pathname').should('include', '/performance')
    cy.get(this.selectors().pageTitle).should('be.visible')
  }

  checkSubMenusVisible() {
    cy.get(this.selectors().topBarNav).should('be.visible')
  }

  checkTableVisible() {
    cy.get(this.selectors().kpiTable).should('be.visible')
  }
}

export default PerformancePage
