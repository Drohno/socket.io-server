// Basic imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const path = require('path')
const sockets = require('./socket/init');

// Basic variables
const port = 3000;

// Defining the Express app
const app = express();

// Adding Helmet to enhance Rest API's security
app.use(helmet());

// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Enabling CORS for all requests
app.use(cors());

// Adding morgan to log HTTP requests
app.use(morgan('combined'));

// Define the client folder
app.use('/static', express.static(path.join(__dirname, 'public')))

// Defining an endpoint to return client html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

// Starting socket and server
const server = http.createServer(app);
sockets(server);

server.listen(port, () => {
  console.log(`listening @ localhost:${port}`);
});
