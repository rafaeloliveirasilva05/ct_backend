const fs = require('fs')
const path = require('path')

module.exports = (server) => {
    fs
        .readdirSync(__dirname)//le um diretorio, no casso dirname é o diretorio atual 
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js")))
        .forEach(file => require(path.resolve(__dirname, file))(server));
};

