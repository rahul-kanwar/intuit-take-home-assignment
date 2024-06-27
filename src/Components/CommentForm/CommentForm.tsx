import React, { useState, ChangeEvent, FormEvent } from 'react';

import { createComment, Comment } from '../../api';
import { Form, Input, TextArea, Button } from './CommentForm.style';

interface CommentFormProps {
  onCommentAdded: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCommentAdded }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newComment: Omit<Comment, 'id'> = {
        name,
        message,
        created: new Date().toISOString(),
      };
      const addedComment = await createComment(newComment);
      onCommentAdded({ ...addedComment, ...newComment });
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        required
      />
      <TextArea
        placeholder="Comment"
        value={message}
        rows={10}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setMessage(e.target.value)
        }
        required
      />
      <Button type="submit">Add Comment</Button>
    </Form>
  );
};

export default CommentForm;
