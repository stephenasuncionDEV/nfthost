export const useNavbar = () => {
    const onTiktok = () => {
        window.open("https://www.tiktok.com/@nfthostofficial");
    }

    const onDiscord = () => {
        window.open("https://discord.gg/BMZZXZMnmv");
    }

    const onSponsor = () => {
        window.open("https://www.buymeacoffee.com/stephenasuncion");
    }

    const onTwitter = () => {
        window.open("https://twitter.com/Steb_01");
    }

    return {
        onTiktok,
        onDiscord,
        onSponsor,
        onTwitter
    }
}