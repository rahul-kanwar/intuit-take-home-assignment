import React from 'react';
import { render, screen } from '@testing-library/react';

import 'jest-styled-components';
import { Comment } from '../../../api';
import CommentItem from '../CommentItem';

// Mock comment data
const mockComment: Comment = {
  id: 1,
  name: 'John Doe',
  message: 'This is a test comment',
  created: '2024-06-26 10:35:42',
};

const mockInvalidDateComment: Comment = {
  id: 2,
  name: 'Jane Doe',
  message: 'This comment has an invalid date',
  created: 'invalid date string',
};

describe('CommentItem Component', () => {
  it('renders correctly with valid date', () => {
    const { asFragment } = render(<CommentItem comment={mockComment} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with invalid date', () => {
    const { asFragment } = render(
      <CommentItem comment={mockInvalidDateComment} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct content with valid date', () => {
    render(<CommentItem comment={mockComment} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText(/6\/26\/2024/)).toBeInTheDocument();
  });

  it('displays "Invalid date" with invalid date', () => {
    render(<CommentItem comment={mockInvalidDateComment} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(
      screen.getByText('This comment has an invalid date')
    ).toBeInTheDocument();
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });
});
