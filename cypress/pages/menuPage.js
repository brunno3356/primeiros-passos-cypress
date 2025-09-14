class MenuPage{
    selectorList() {
        const selectors = {

          myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
          performanceButton: '[href="/web/index.php/performance/viewPerformanceModule"]'

        }
        return selectors
    }

    acessMyinfo() {
         cy.get(this.selectorList().myInfoButton).click()
    }
    acessPerformance() {
        cy.get(this.selectorList().performanceButton).click()
    }
}
export default MenuPage