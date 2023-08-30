describe('Deadline calculator', () => {
  it('is calculates deadline correctly when the turnaround time is less then the remaining of the workday', () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="submit-date"]').should('exist').type("2023-08-30T14:23");
    cy.get('[data-testid="turnaround-time"]').should('exist').clear().type('2');
    cy.get('[data-testid="deadline"]').should('exist').contains('Wed Aug 30 2023 16:23:00 GMT+0200 (Central European Summer Time)')
  })
  it('is calculates deadline correctly when the turnaround time is more then the remaining of the workday but not exceeds workweek', () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="submit-date"]').should('exist').type("2023-08-30T09:45");
    cy.get('[data-testid="turnaround-time"]').should('exist').clear().type('17');
    cy.get('[data-testid="deadline"]').should('exist').contains('Fri Sep 01 2023 10:45:00 GMT+0200 (Central European Summer Time)')
  })
  it('is calculates deadline correctly when the turnaround time is more then the remaining of the workday and exceeds workweek', () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="submit-date"]').should('exist').type("2023-08-30T09:13");
    cy.get('[data-testid="turnaround-time"]').should('exist').clear().type('26');
    cy.get('[data-testid="deadline"]').should('exist').contains('Mon Sep 04 2023 11:13:00 GMT+0200 (Central European Summer Time)')
  })
})