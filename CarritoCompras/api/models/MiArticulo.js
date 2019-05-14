module.exports = {
    connection: 'Mysqladapter',
    attributes: {
        title: {
            type: "string"
        },
        country: {
            type: "string"
        },
        number: {
            type: "string"
        },
        volume: {
            type: "string"
        },
        year: {
            type: "string"
        },
        journal: {
            type: "string"
        },
        editorial: {
            type: "string"
        },
        abstract: {
            type: "longtext"
        },
        issns: {
            type: "string"
        },
        doi: {
            type: "string"
        },
        language: {
            type: "string"
        },
        keywords: {
            type: "string"
        },
        link: {
            type: "longtext"
        },
        authors: {
            type: "string"
        },
        category: {
            type: "string"
        },
        pages: {
            type: "string"
        },
        notas: {
            type: "longtext"
        },
        Mifile: {
            collection: 'MiFile',
            via: 'fkIdMiArticulo'
        },
        fkIdUser: {
            model: 'User'
        }
    }
};
