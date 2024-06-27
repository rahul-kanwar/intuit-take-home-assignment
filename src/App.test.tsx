import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import { format } from 'date-fns';

import App from './App';
import {
  Comment,
  getComments as mockGetComments,
  createComment as mockPostComments,
} from './api';

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 1,
    name: 'John Doe',
    message: 'This is a test comment',
    created: '2024-06-26T10:35:42.457Z',
  },
  {
    id: 2,
    name: 'Jane Doe',
    message: 'Another test comment',
    created: '2024-06-26T11:35:42.457Z',
  },
];

const mockNewComment: Comment = {
  id: 3,
  name: 'New User',
  message: 'This is a new comment',
  created: '2024-06-26T12:35:42.457Z',
};

// Mock the api functions
jest.mock('./api', () => ({
  getComments: jest.fn(),
  createComment: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    (mockGetComments as jest.Mock).mockResolvedValue(mockComments);
    (mockPostComments as jest.Mock).mockResolvedValue(mockNewComment);
  });
  it('renders correctly', async () => {
    const { asFragment } = render(<App />);

    await waitFor(() => {
      mockComments.forEach(comment => {
        expect(screen.getByText(comment.name)).toBeInTheDocument();
        expect(screen.getByText(comment.message)).toBeInTheDocument();
        expect(
          screen.getByText(format(new Date(comment.created), 'Pp'))
        ).toBeInTheDocument();
      });
    });

    expect(asFragment()).toMatchSnapshot();

    // Add a new comment
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'New User' },
    });
    fireEvent.change(screen.getByPlaceholderText('Comment'), {
      target: { value: 'This is a new comment' },
    });
    fireEvent.click(screen.getByText('Add Comment'));

    await waitFor(() => {
      expect(screen.getByText('New User')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('This is a new comment')).toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
