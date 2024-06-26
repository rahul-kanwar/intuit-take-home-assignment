import React, { useState, useEffect } from 'react';
import CommentForm from './Components/CommentForm/CommentForm';
import CommentList from './Components/CommentList/CommentList';
import Notification from './Components/Notification/Notification';
import styled from 'styled-components';
import { Comment } from './api';
import io from 'socket.io-client';

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const App: React.FC = () => {
  const [newComment, setNewComment] = useState<Comment | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('newComment', (comment: Comment) => {
      setNewComment(comment);
      setNotification('New comment added!');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCommentAdded = (comment: Comment) => {
    setNewComment(comment);
    setNotification('New comment added!');
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <Container>
      <h1 style={{textAlign: 'center'}}>Comments Feed</h1>
      <CommentForm onCommentAdded={handleCommentAdded} />
      {notification && <Notification message={notification} onClose={handleCloseNotification} />}
      <CommentList newComment={newComment} />
    </Container>
  );
};

export default App;
