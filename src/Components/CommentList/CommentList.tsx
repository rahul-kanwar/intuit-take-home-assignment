import React, { useState, useEffect } from 'react';

import { getComments, Comment } from '../../api';
import CommentItem from '../CommentItem/CommentItem';
import { List } from './CommentList.style';

interface CommentListProps {
  newComment: Comment | null;
}

const CommentList: React.FC<CommentListProps> = ({ newComment }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isRepeatRender, setIsRepeatRender] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments();
        setComments(data);
        setIsRepeatRender(true);
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    };
    fetchComments();
  }, []);

  useEffect(() => {
    if (newComment && isRepeatRender) {
      setComments(prevComments => [...prevComments, newComment]);
    }
  }, [newComment, isRepeatRender]);

  return (
    <List>
      {comments
        .sort((a: Comment, b: Comment) => b.id - a.id)
        .map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </List>
  );
};

export default CommentList;
