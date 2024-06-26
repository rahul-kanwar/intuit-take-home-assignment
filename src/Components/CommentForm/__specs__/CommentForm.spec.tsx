import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CommentForm from '../CommentForm';
import 'jest-styled-components';

// Mock props
const mockOnCommentAdded = jest.fn();

describe('CommentForm Component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<CommentForm onCommentAdded={mockOnCommentAdded} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('submits the form with the correct data', () => {
    render(<CommentForm onCommentAdded={mockOnCommentAdded} />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Comment'), { target: { value: 'This is a test comment' } });

    fireEvent.click(screen.getByText('Add Comment'));

    expect(mockOnCommentAdded).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John',
      message: 'This is a test comment',
    }));
  });

  it('resets input fields after submission', () => {
    render(<CommentForm onCommentAdded={mockOnCommentAdded} />);

    const nameInput = screen.getByPlaceholderText('Name');
    const messageInput = screen.getByPlaceholderText('Comment');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test comment' } });

    fireEvent.click(screen.getByText('Add Comment'));

    expect(nameInput.textContent).toBe('');
    expect(messageInput.textContent).toBe('');
  });
});
