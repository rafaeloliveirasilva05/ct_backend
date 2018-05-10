
require('dotenv').config()

const server = require('./app/server/index')

server.listen(process.env.PORT || '8080', function () {
    console.log('teste teste');
});
