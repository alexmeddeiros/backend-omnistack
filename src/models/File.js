const mongoose = require('mongoose'); //lib pra conectar com o mongodb

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

File.virtual('url').get(function () {
    const url = process.env.PORT || 'http://localhost:8888';
    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);