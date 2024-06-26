import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import 'jest-styled-components';
import { act } from 'react-dom/test-utils'; 
import Notification from '../Notification';

describe('Notification Component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Notification message="Test Notification" onClose={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct message', () => {
    render(<Notification message="Test Notification" onClose={() => {}} />);
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
  });

  it('auto-closes after 3 seconds', async () => {
    const mockOnClose = jest.fn();
    render(<Notification message="Test Notification" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    }, { timeout: 3000 });
  });
});