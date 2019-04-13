const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id);// recebe o parametro da box

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file); //armazena o array dentro do do box

        await box.save();

        //avisar os user que um arquivo foi criado
        req.io.sockets.in(box._id).emit('Arquivo', file);

        return res.json(file); // retorna para  front
    }
}

module.exports = new FileController;