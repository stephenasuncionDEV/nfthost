import { useUser } from '@/providers/UserProvider'
import { useToast } from '@chakra-ui/react'

export const useNavbar = () => {
    const toast = useToast();
    const { address } = useUser();

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

    const onCopyAddress = () => {
        navigator.clipboard.writeText(address);

        toast({
            title: 'Success',
            description: 'Address has been copied to clipboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

    return {
        onTiktok,
        onDiscord,
        onSponsor,
        onTwitter,
        onCopyAddress
    }
}