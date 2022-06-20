import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'

export const useTransactions = (update = true) => {
    const toast = useToast();
    const { setTransactions, setIsGettingTransactions } = useCore();
    const { user } = useUser();
    const { Logout } = useWeb3();

    useEffect(() => {
        if (!update) return;
        GetTransactions();
    }, [])

    const GetTransactions = async () => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;
            if (!user) return;

            const token = decryptToken(storageToken, true);

            setIsGettingTransactions(true);

            const res = await axios.get(`${config.serverUrl}/api/payment/get`, {
                params: {
                    memberId: user._id
                },
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })
  
            setTransactions(res.data);
            setIsGettingTransactions(false);
        }
        catch (err) {
            setIsGettingTransactions(false);
            console.error(err);
            if (err.response?.data?.isExpired) await Logout();
            toast({
                title: 'Error',
                description: !err.response ? err.message : err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const CopyHash = (payment) => {
        navigator.clipboard.writeText(payment.hash);

        toast({
            title: 'Success',
            description: 'Copied transaction hash',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-center'
        })
    }

    return {
        CopyHash
    }
}