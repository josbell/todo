import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Rendering', () => {
  test('render h1 with text', () => {
    render(<App />)
    const text = screen.queryByText('TODO List')
    expect(text).toBeTruthy()
  });

  test('render input and add button', () => {
    render(<App />)
    const input = screen.getByTestId('input-add')
    const button = screen.getByTestId('button-add')
    expect(input).toBeTruthy()
    expect(button).toBeTruthy()
  })
})
