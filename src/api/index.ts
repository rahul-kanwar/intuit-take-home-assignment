import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface Comment {
  id: number;
  name: string;
  created: string;
  message: string;
}

export const getComments = async (): Promise<Comment[]> => {
  const response = await apiClient.get('/getComments');
  return response.data;
};

export const createComment = async (comment: Omit<Comment, 'id'>): Promise<Comment> => {
  const response = await apiClient.post('/createComment', comment);
  return response.data;
};

export const deleteComments = async (): Promise<void> => {
  await apiClient.delete('/deleteComments');
};
