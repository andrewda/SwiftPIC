const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const router = require('./router');

const app = express();

// Database Setup
mongoose.connect(config.database);

// App Setup
app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(express.static('public'));

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port, () => {
	console.log('Server listening on port:', port);
	console.log('Using secret:', config.secret);
});
