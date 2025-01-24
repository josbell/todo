import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Rendering', () => {

  beforeEach(() => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(['todo1', 'todo2'])
      })
    ) as jest.Mock;
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('render h1 with text', async() => {
    await act(async () => {
      render(<App />);
    });
    const text = screen.queryByText('TODO List')
    expect(text).toBeTruthy()
  });

  test('render input and add button', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = screen.queryByTestId('input-add')
    const button = screen.queryByTestId('button-add')
    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })

  test('render existing todo list', async () => {
    await act(async () => {
      render(<App />);
    });

    const todoList = await screen.findByTestId('todo-list');
    const todo1 = await screen.findByTestId('li-todo1');
    const todo2 = await screen.findByTestId('li-todo2');

    expect(todoList).toBeInTheDocument();
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  })

  test('add new todo', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = screen.queryByTestId('input-add') as HTMLInputElement;
    const button = screen.queryByTestId('button-add') as HTMLButtonElement;

    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Todo Item' } });
      fireEvent.click(button);
    });

    const newTodo = screen.queryByTestId('li-New Todo Item');
    expect(newTodo).toBeInTheDocument();
  })

})

