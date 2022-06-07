//const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    reactStrictMode: true,
    env: {
        CHAIN_ID: process.env.CHAIN_ID,
        METAMASK_ADDRESS: process.env.METAMASK_ADDRESS,
        ENCRYPT_KEY: process.env.ENCRYPT_KEY,
        POSTHOG_KEY: process.env.POSTHOG_KEY,
        CREATE_WEBSITE_TOKEN: process.env.CREATE_WEBSITE_TOKEN
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(new webpack.IgnorePlugin({
            resourceRegExp: /^electron$/
        }));
        return config;
        
        // if (isDev) {
        //     return config;
        // }
    
        // return {
        //     ...config,
        //     externals: {
        //         react: 'React',
        //         'react-dom': 'ReactDOM',
        //     },
        // };
    },
    // async headers() {
    //     return [{
    //         source: "/api/:path*",
    //         headers: [
    //             { key: "Access-Control-Allow-Credentials", value: "true" },
    //             { key: "Access-Control-Allow-Origin", value: "*" },
    //             { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
    //             { key: "Access-Control-Allow-Headers", value: "Origin, X-Requested-With, Content-Type, Accept, Authorization" },
    //         ]
    //     }]
    // }
}