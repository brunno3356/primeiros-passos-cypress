

class MyInfoPage {
    selectorsList() {
        const selectors = {
            firstNameField: "[name='firstName']",
            lastNameField: "[name='lastName']",
            genericField: ".oxd-input--active",
            dateField: "[placeholder='yyyy-dd-mm']",
            submitButton: ".oxd-button",
            nationalityField: "[data-v-67d2aedf='']",
            marriedField: "[data-v-67d2aedf='']",
            secondCombobox: '.oxd-select-dropdown > :nth-child(7)',
            thirdCombobox: ':nth-child(4) > span',
            dateCloseButton: ".--close",

        }
        return selectors
    }
    fillPersonalDetail(firstName, lastName, nickName) {
        
        cy.get(this.selectorsList().firstNameField).clear().type(firstName)
        cy.get(this.selectorsList().lastNameField).clear().type(lastName)
        cy.get(this.selectorsList().genericField).eq(2).clear().type(nickName)



    }
     fillEmployDetails(enployeeid, otherid, driveLicenseDate, expiryDate) {
        cy.get(this.selectorsList().genericField).eq(3).clear().type(enployeeid)
        cy.get(this.selectorsList().genericField).eq(4).clear().type(otherid)
        cy.get(this.selectorsList().genericField).eq(5).clear().type(driveLicenseDate)
        cy.get(this.selectorsList().genericField).eq(6).clear().type(expiryDate)
        cy.get(this.selectorsList().dateCloseButton).click()
   }

   saveForm() {
        cy.get(this.selectorsList().submitButton).eq(1).click({force: true})
        cy.get('body').should('contain', 'Success')
        cy.get('.oxd-text--toast-message')
   }

   fillStatus() {
    cy.get(this.selectorsList().nationalityField).eq(1).click()
   cy.get(this.selectorsList().secondCombobox).click()
   cy.get(this.selectorsList().marriedField).eq(5).click()
   cy.get(this.selectorsList().thirdCombobox).click()

   }
    
   

}
export default MyInfoPage