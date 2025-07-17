import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ state: null }),
  };
});

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { pk: '1', title: 'Trip to Israel' },
          { pk: '2', title: 'Beach Packing' },
        ]),
    })
  );
});

test('renders list items from fetch', async () => {
  render(<Home />, { wrapper: MemoryRouter });

  await waitFor(() => {
    expect(screen.getByText('Trip to Israel')).toBeInTheDocument();
    expect(screen.getByText('Beach Packing')).toBeInTheDocument();
  });
});