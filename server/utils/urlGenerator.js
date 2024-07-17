const DataURLParser = require('datauri/parser')
const path = require('path')

const getDataUrl = (file) => {
    const parser = new DataURLParser();

    const extName = path.extname(file.originalname).toString()
    return parser.format(extName, file.buffer)
}

module.exports = getDataUrl;