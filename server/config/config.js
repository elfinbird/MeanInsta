// fetching env configuration
var config = require('./config.json');

// check env: prod or dev?
var env = process.env.NODE_ENV || 'development';

var envConfig = config[env];

// add env configurations values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);