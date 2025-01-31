import React from 'react';
import { fireEvent, render, screen, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Rendering', () => {

  beforeEach(() => {
    globalThis.fetch = jest.fn((url, options) => {
      if (options?.method === 'POST') {
        return Promise.resolve({ json: () => Promise.resolve( {_id: 'mock-id', title: 'New Todo Item'} ) })
      } else if (options?.method === 'DELETE') {
        return Promise.resolve ({ 
          ok: true,
          json: () => Promise.resolve( {message: 'mock-messaage'} )
        })
      } else if (options?.method === 'PATCH') {
        return Promise.resolve({ json: () => Promise.resolve( { title: 'todo1', _id: 'todo1ID', isCompleted: true }) })
      }
      return Promise.resolve({ json: () => Promise.resolve([{ title: 'todo1', _id: 'todo1ID'}, { title: 'todo2', _id: 'todo2ID'}]) })
    }) as jest.Mock;
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
    const todo1 = await screen.findByTestId('li-todo1ID');
    const todo2 = await screen.findByTestId('li-todo2ID');

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

    const newTodo = screen.queryByTestId('li-mock-id');
    expect(newTodo).toBeInTheDocument();
  })

  test('delete todo', async () => {
    await act(async () => {
      render(<App />);
    });

    const todoItem = screen.queryByTestId('li-todo1ID') as HTMLElement;
    const deleteButton = within(todoItem).getByRole('button');

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(todoItem).not.toBeInTheDocument();
  })

  test('complete todo', async () => {
    await act(async () => {
      render(<App />);
    });

    const todoItem = screen.queryByTestId('li-todo1ID') as HTMLElement;
    const checkbox = within(todoItem).getByRole('checkbox');

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass('line-through'); 
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/todo1ID', {
      method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'todo1', isCompleted: true})
    })
  })

})

