import { test, render, screen, beforeEach } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
});
test('renders learn react link', () => {
  const linkElement = screen.getByText(/Finish/i);
  expect(linkElement).toBeInTheDocument();
});
