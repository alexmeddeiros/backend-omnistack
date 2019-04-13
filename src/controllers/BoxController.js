const Box = require('../models/Box');

class BoxController {
    async store(req, res) {
        //req.body.title pega a requisição do body com o title
        //req.body pega a requisição do body total
        const box = await Box.create(req.body);

        return res.json(box);
    }

    async show(req, res) {
        // pega apens o id do arquivo e nem de todos os arquivos Para pegar todos os dados
        //usa o POPULATE()
        //const box = await Box.findById(req.params.id);

        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: - 1 } } //ordeda por decrescente
        });

        return res.json(box);
    }
}

module.exports = new BoxController;