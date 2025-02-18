describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should add a new todo, complete, and delete it', function() {
    //add
    cy.get('[data-testid="input-add"]').type("cy test todo")
    cy.get('[data-testid="button-add"]').click()
    cy.get('[data-testid="todo-list"]').children().last().as('newTodo')
    cy.reload()
    cy.get('[data-testid="todo-list"]').should('contain', 'cy test todo')
    cy.get('@newTodo').find('button').invoke('attr', 'data-cy', 'created-by-cypress');

    //complete
    cy.get('@newTodo').find('input').check()
    cy.reload()
    cy.get('@newTodo').find('input').should('be.checked')

    //uncheck
    cy.get('[data-testid="todo-list"]').children().last().as('newTodo')
    cy.get('@newTodo').find('input').uncheck()
    cy.reload()
    cy.get('@newTodo').find('input').should('not.be.checked')

    //delete
    cy.get('@newTodo').find('button').click()
  })

})