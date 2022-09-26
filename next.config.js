module.exports = {
    reactStrictMode: false,
    env: {
        CHAIN_ID: process.env.CHAIN_ID,
        ENCRYPT_KEY: process.env.ENCRYPT_KEY,
        POSTHOG_KEY: process.env.POSTHOG_KEY,
        CREATE_WEBSITE_TOKEN: process.env.CREATE_WEBSITE_TOKEN,
        INFURA_ID: process.env.INFURA_ID
    },
    // async rewrites() {
    //     return {
    //         beforeFiles: [
    //             {
    //                 source: '/:path*',
    //                 has: [
    //                     {
    //                         type: 'host',
    //                         value: '(?<subdomain>.*).nfthost.app',
    //                     },
    //                 ],
    //                 destination: '/:subdomain/:path*',
    //             }
    //         ]
    //     }
    // }
}