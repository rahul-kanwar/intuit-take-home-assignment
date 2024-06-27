/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import CommentForm from '../CommentForm';
import 'jest-styled-components';
import { createComment as mockCreateComment, Comment } from '../../../api';

jest.mock('../../../api');

describe('CommentForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { asFragment } = render(<CommentForm onCommentAdded={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('submits the form with the correct data', async () => {
    const mockOnCommentAdded = jest.fn();
    const mockComment: Comment = {
      id: 1,
      name: 'John',
      message: 'This is a test comment',
      created: '2024-06-26T10:35:42.000Z',
    };

    (mockCreateComment as jest.Mock).mockResolvedValue(mockComment);

    render(<CommentForm onCommentAdded={mockOnCommentAdded} />);

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Comment'), {
      target: { value: 'This is a test comment' },
    });

    fireEvent.click(screen.getByText('Add Comment'));

    await waitFor(() => {
      expect(mockOnCommentAdded).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John',
          message: 'This is a test comment',
          created: expect.any(String), // we don't need the exact timestamp here
        })
      );
    });
  });

  it('resets input fields after submission', async () => {
    const mockOnCommentAdded = jest.fn();
    const mockComment: Comment = {
      id: 1,
      name: 'John',
      message: 'This is a test comment',
      created: '2024-06-26T10:35:42.000Z',
    };
    (mockCreateComment as jest.Mock).mockResolvedValue(mockComment);
    render(<CommentForm onCommentAdded={mockOnCommentAdded} />);

    const nameInput = screen.getByPlaceholderText('Name');
    const messageInput = screen.getByPlaceholderText('Comment');

    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(messageInput, {
      target: { value: 'This is a test comment' },
    });

    fireEvent.click(screen.getByText('Add Comment'));

    await waitFor(() => {
      expect(nameInput.textContent).toBe('');
      expect(messageInput.textContent).toBe('');
    });
  });
});
