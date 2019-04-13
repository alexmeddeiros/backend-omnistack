const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); //constant da aplicação que recebe o express(rotas)
app.use(cors());// ess lib é necessário vir no começo do server 
const server = require('http').Server(app);
const io = require('socket.io')(server);

// sempre que o user entrar em uma pasta, ele será isolado naquala pasta, para que ao enviar algo,
//isso nao apareça em outras pastas.
io.on("connection", socket => {
    socket.on("conectRoom", box => {
        socket.join(box);
    });
});

//db Connect
mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-zby9v.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next(); //isso faz com que , quando ele execute esse comando, siga para as proximas rotas, 
    //senao todas as requisiçoes param aqui.
})


//cadastrando modulos | midlewares
app.use(express.json()); //ajuda o servidor a entender as requisições
app.use(express.urlencoded({ extended: true }));//permite o envio de arquivos nas requisições
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
//toda ves que u user usar a rota /files, ele será direcionado para o arquivo


app.use(require('./routes')); // Route Path
server.listen(process.env.PORT || 8888);