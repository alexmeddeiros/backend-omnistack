const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

//GET, POST = criar algo, PUT, DELETE
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post('/boxes/:id/files', multer(multerConfig).single('inputFile'), FileController.store);


module.exports = routes;

// expõe as informaçoes do arquivo, ou seja, esse arquivo routes.js está 
// exportando a variável routes para o server.js
