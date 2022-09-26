module.exports = {
    reactStrictMode: false,
    env: {
        CHAIN_ID: process.env.CHAIN_ID,
        ENCRYPT_KEY: process.env.ENCRYPT_KEY,
        POSTHOG_KEY: process.env.POSTHOG_KEY,
        CREATE_WEBSITE_TOKEN: process.env.CREATE_WEBSITE_TOKEN,
        INFURA_ID: process.env.INFURA_ID
    },
    rewrites() {
        return {
            beforeFiles: [
                {
                    source: 'https://:subdomain*.nfthost.app',
			        destination: 'https://nfthost.app/:subdomain*',
                    // source: '/:path*',
                    // has: [
                    //     {
                    //         type: 'host',
                    //         value: '(?<subdomain>.*).nfthost.app',
                    //     },
                    // ],
                    // destination: '/:subdomain/:path*',
                },
            ]
        }
    }
}