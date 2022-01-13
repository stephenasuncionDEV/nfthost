module.exports = {
    reactStrictMode: true,
    env: {
        CHAIN_ID: process.env.CHAIN_ID,
        MORALIS_APP_ID: process.env.MORALIS_APP_ID,
        MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
        METAMASK_ADDRESS: process.env.METAMASK_ADDRESS,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    }
}