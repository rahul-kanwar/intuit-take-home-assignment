import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import cors from 'cors';

import DataAccessObject from './dataAccessObject.js';
import Comment from './comment.js';

const { json, urlencoded } = bodyParser;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
const port = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
    io.emit('newComment', result); // Emit the new comment to all connected clients
  }).catch(error => {
    response.status(500).send(error);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  }).catch(error => {
    response.status(500).send(error);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  }).catch(error => {
    response.status(500).send(error);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComment', function(request, response) {
    const { body } = request;
    const { id } = body;
    comment.deleteComment(id).then(result => {
      response.send(result);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// WebSocket setup
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});