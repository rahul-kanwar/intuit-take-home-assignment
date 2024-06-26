import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import CommentList from '../CommentList';
import { Comment } from '../../../api';


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

describe('CommentList Component', () => {
  it('renders correctly without new comment', () => {
    const { asFragment } = render(<CommentList newComment={null} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with new comment', () => {
    const newComment: Comment = {
      id: 3,
      name: 'New User',
      message: 'This is a new comment',
      created: '2024-06-26 12:35:42',
    };
    const { asFragment } = render(<CommentList newComment={newComment} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the list of comments', () => {
    render(<CommentList newComment={null} />);
    mockComments.forEach(comment => {
      expect(screen.getByText(comment.name)).toBeInTheDocument();
      expect(screen.getByText(comment.message)).toBeInTheDocument();
      expect(screen.getByText(/6\/26\/2024/)).toBeInTheDocument();
    });
  });
});
