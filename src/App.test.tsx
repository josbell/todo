import React from 'react';
import { fireEvent, queryByTestId, getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Rendering', () => {

  test('render h1 with text', () => {
    render(<App />);

    const text = screen.queryByText('TODO List')
    expect(text).toBeTruthy()
  });

  test('render input and add button', () => {
    render(<App />);

    const input = screen.queryByTestId('input-add')
    const button = screen.queryByTestId('button-add')
    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })

  test('render existing todo list', () => {
    const todos = ['todo1', 'todo2'];

    const { queryByTestId } = render(<App todos={todos}/>);
    expect(queryByTestId('todo-list')).toBeInTheDocument();
    expect(queryByTestId('li-todo1')).toBeInTheDocument();
    expect(queryByTestId('li-todo2')).toBeInTheDocument();
  })

  test('add new todo', () => {
    const { queryByTestId, getByTestId } = render(<App />)
    const input = queryByTestId('input-add') as HTMLInputElement
    fireEvent.change(getByTestId('input-add'), { target: { value: 'New Todo Item' } })
    fireEvent.click(getByTestId('button-add'))
    expect(queryByTestId('li-New Todo Item')).toBeInTheDocument()
  })

})

