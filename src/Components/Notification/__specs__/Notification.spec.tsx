import React, { act } from 'react';
import { render, waitFor, screen } from '@testing-library/react';

import 'jest-styled-components';
import Notification from '../Notification';

describe('Notification Component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Notification message="Test Notification" onClose={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct message', () => {
    render(<Notification message="Test Notification" onClose={() => {}} />);
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
  });

  it('auto-closes after 3 seconds', async () => {
    jest.useFakeTimers();
    const mockOnClose = jest.fn();
    render(<Notification message="Test Notification" onClose={mockOnClose} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(
      () => {
        expect(mockOnClose).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });
});
