import { useUser } from '@/providers/UserProvider'
import { useToast } from '@chakra-ui/react'

export const useNavbar = () => {
    const toast = useToast();
    const { address } = useUser();

    const Tiktok = () => {
        window.open("https://www.tiktok.com/@nfthostofficial");
    }

    const Discord = () => {
        window.open("https://discord.gg/u2xXYn7C9T");
    }

    const Sponsor = () => {
        window.open("https://www.buymeacoffee.com/stephenasuncion");
    }

    const Twitter = () => {
        window.open("https://twitter.com/Steb_01");
    }

    const CopyAddress = () => {
        navigator.clipboard.writeText(address);

        toast({
            title: 'Success',
            description: 'Wallet address has been copied to clipboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

    return {
        Tiktok,
        Discord,
        Sponsor,
        Twitter,
        CopyAddress
    }
}