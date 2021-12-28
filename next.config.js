module.exports = {
    reactStrictMode: true,
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        MONGODB_DB: process.env.MONGODB_DB,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        METAMASK_ADDRESS: process.env.METAMASK_ADDRESS
    }
}
