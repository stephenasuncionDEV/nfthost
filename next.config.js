module.exports = {
    reactStrictMode: true,
    env: {
        CHAIN_ID: process.env.CHAIN_ID,
        ENCRYPT_KEY: process.env.ENCRYPT_KEY,
        POSTHOG_KEY: process.env.POSTHOG_KEY,
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
        CREATE_WEBSITE_TOKEN: process.env.CREATE_WEBSITE_TOKEN,
        INFURA_ID: process.env.INFURA_ID
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin({
            resourceRegExp: /^electron$/
        }));
        return config;
    }
}