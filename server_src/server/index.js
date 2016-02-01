/* eslint-disable no-console */
import env from '../../env.json';
import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import stories from './fixtures/storiesFixture';
import socketio from 'socket.io';

const PORT = process.env.PORT || 8080;

// Only use `page` server-side so that null-loader handles style imports.
let page;
if (process.env.NODE_ENV === 'production') {
  page = require('./page.compiled');
}

let id = 99;

const config = env[process.env.NODE_ENV || 'development'];

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.set('views', __dirname + '/../../server_views');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/api/stories/:id', (req, res) => {
  const storyId = Number(req.params.id);
  const currentStory = stories.find(story => story.id === storyId);
  res.json(currentStory);
});

const EventEmitter = require('events');
const util = require('util');
function MyEmitter() {
  EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

app.post('/api/stories/:id/pieces', (req, res) => {
  const storyId = Number(req.params.id);
  const currentStoryIndex = stories.findIndex(story => story.id === storyId);
  const newPiece = req.body.piece;
  newPiece.id = id++;
  stories[currentStoryIndex].pieces.push(newPiece);
  res.json(newPiece);
  myEmitter.emit('event', stories[currentStoryIndex]);
});

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    page.default(req, res);
  } else {
    res.render('index', {
      markup: '',
      initialState: JSON.stringify({}),
      scriptSource: config.SCRIPT_SOURCE,
      styleSource: config.STYLE_SOURCE,
    });
  }
});

console.log(`listening on port ${PORT}`);

const server = createServer(app);

const io = socketio.listen(server);

io.on('connection', (socket) => {
  console.log('client connected');
  myEmitter.on('event', (story) => {
    console.log('emitting update');
    socket.emit('update', story);
  });
});

server.listen(8080);
