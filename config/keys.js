//figure out which set of credentials to return
if(process.env.NODE_ENV === 'production'){
    //We are in production
    module.exports = require('./prod');
}
else {
    module.exports = require('./dev');
}