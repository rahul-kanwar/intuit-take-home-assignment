import React from 'react';
import { Comment } from '../../api';
import { format } from 'date-fns';
import { Item } from './CommentItem.style';

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    let formattedDate = 'Invalid date';
    try {
      if (comment.created) {
        console.log('Parsing date:', comment.created); // Log the date string
        // Parse the date using the provided format
          formattedDate = format(new Date(comment.created), 'Pp');
      }
    } catch (error) {
      console.error('Error parsing date:', error);
    }
    return (
        <Item>
            <h4>{comment.name}</h4>
            <p>{comment.message}</p>
            <small>{formattedDate}</small>
        </Item>
    );
};

export default CommentItem;
