const express         = require('express'); // Express
const config          = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger      = require('debug')('app:db');
const Joi             = require('joi');     // Validation
const helmet          = require('helmet');  // STL certificate
const morgan          = require('morgan');  // Log
const logger          = require('./middleware/logger');
const authenticator   = require('./middleware/authenticator');

// Import routes
const home    = require('./routes/home');
const courses = require('./routes/courses');


// Init express
const app = express();

// Middlewares
app.use(helmet());

// Defining routes
app.use('/api/routes', courses);
app.use('/', home);

// console.log(`APP ENV: ${app.get('env')}`); // Default undefined
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // Default develpment

// Just log in production environment
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan activated...');
}

dbDebugger('Connected to the database...');

// Set views
app.set('view engine', 'pug');
app.set('views', './views'); // Default

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Read encoded (or in Postman x-www-form-urlencoded)
app.use(express.static('public'));
app.use(logger);
app.use(authenticator);

console.log(`My application name: ${config.get('name')}`);
console.log(`Mail host: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));