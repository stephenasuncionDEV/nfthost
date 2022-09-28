const production = {
    frontendUrl: 'nfthost.app',
    clientUrl: 'https://nfthost.app',
	serverUrl: 'https://nfthost-backend.vercel.app',
    stripe: {
        publicKey: 'pk_live_51LlUJgHjrZpuqKHtNAMYLAAUODz0DyJv6ZN21MJndNhYZS3MjM3fM7fvhKaIxyM0r3GWZ39mL8NELAbqXZeJvdlr00GXCSAZ2n'
    },
    recaptcha: {
        siteKey: '6LeuRbYgAAAAABGYVWikwVFs--HA8EJ1K80kQ8Ew'
    },
    nfthost: {
        wallet_metamask: '0x6Ae52916bdB4AB8D6ebDc0c07C6dd9Cd20f86368',
        wallet_phantom: 'FXJk29TmfWmReUxbKJF385oifSNxCspvqyXhzUsf2X9e'
    }
}

export default production