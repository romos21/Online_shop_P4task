import React from 'react';
import reactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/components/App';

test('renders learn react link', () => {
  reactDOM.render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
