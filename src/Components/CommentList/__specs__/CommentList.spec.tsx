import React from 'react';
import { render, screen } from '@testing-library/react';

import 'jest-styled-components';
import CommentList from '../CommentList';
import { Comment, getComments as mockGetComments } from '../../../api';

// Mock comments data
const mockComments: Comment[] = [
  {
    id: 1,
    name: 'John Doe',
    message: 'This is a test comment',
    created: '2024-06-26 10:35:42',
  },
  {
    id: 2,
    name: 'Jane Doe',
    message: 'Another test comment',
    created: '2024-06-26 11:35:42',
  },
];

// Mock the getComments function
jest.mock('../../../api', () => ({
  getComments: jest.fn(),
}));

describe('CommentList Component', () => {
  beforeEach(() => {
    (mockGetComments as jest.Mock).mockResolvedValue(mockComments);
  });

  it('renders correctly with initial comments', async () => {
    const { asFragment } = render(<CommentList newComment={null} />);
    expect(asFragment()).toMatchSnapshot();

    // Wait for the comments to be rendered
    const johnDoeElement = await screen.findByText('John Doe');
    const janeDoeElement = await screen.findByText('Jane Doe');

    expect(johnDoeElement).toBeInTheDocument();
    expect(janeDoeElement).toBeInTheDocument();
  });

  it('renders correctly with new comment', async () => {
    const newComment: Comment = {
      id: 3,
      name: 'New User',
      message: 'This is a new comment',
      created: '2024-06-26T22:55:07.947Z',
    };

    const { asFragment } = render(<CommentList newComment={newComment} />);

    // Wait for the comments to be rendered using findByText
    const johnDoeElement = await screen.findByText('John Doe');
    const janeDoeElement = await screen.findByText('Jane Doe');
    const newUserElement = await screen.findByText('New User');

    expect(johnDoeElement).toBeInTheDocument();
    expect(janeDoeElement).toBeInTheDocument();
    expect(newUserElement).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
