const config = {
    db: {
        uri: process.env.MONGO_URI,
    },
    api: {
        port: process.env.PORT || 3000,
    }
}

module.exports = { config }