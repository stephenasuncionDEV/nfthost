export const useNavbar = () => {
    const onTiktok = () => {
        window.open("https://www.tiktok.com/@nfthostofficial");
    }

    const onDiscord = () => {
        window.open("https://discord.gg/BMZZXZMnmv");
    }

    const onGithub = () => {
        window.open("https://github.com/stephenasuncionDEV/nfthost");
    }

    const onSponsor = () => {
        window.open("https://www.buymeacoffee.com/stephenasuncion");
    }

    return {
        onTiktok,
        onDiscord,
        onGithub,
        onSponsor
    }
}