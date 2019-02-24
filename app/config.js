var environments = {};


environments.staging = {
    'http' : 4000,
    'https' : 4400,
    'envName' : 'staging'
};

environments.production = {
    'http' : 8080,
    'https' : 9090,
    'envName' : 'production'
};

var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '' ;

var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;