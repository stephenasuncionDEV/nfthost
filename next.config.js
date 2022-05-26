const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    reactStrictMode: true,
    env: {
        CHAIN_ID: process.env.CHAIN_ID,
        METAMASK_ADDRESS: process.env.METAMASK_ADDRESS,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    },
    webpack: config => {
        if (isDev) {
            return config;
        }
    
        return {
            ...config,
            externals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        };
    },
}