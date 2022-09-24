import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useCore } from '@/providers/CoreProvider'
import axios from 'axios'
import config from '@/config/index'
import { decryptToken } from '@/utils/tools'

export const useTransactions = (update = true) => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const { setTransactions, setIsGettingTransactions } = useCore();
    const { user } = useUser();

    useEffect(() => {
        if (!update) return;
        GetTransactions();
    }, [])

    const GetTransactions = async (pageNumber = 0) => {
        try {
            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;
            if (!user) return;

            const token = decryptToken(storageToken, true);

            setIsGettingTransactions(true);

            const res = await axios.get(`${config.serverUrl}/api/payment/get`, {
                params: {
                    memberId: user._id,
                    pageNumber
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
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const CopyHash = (payment) => {
        navigator.clipboard.writeText(payment.hash);

        toast({
            title: 'Success',
            description: 'Copied transaction hash',
            status: 'success',
        })
    }

    return {
        CopyHash,
        GetTransactions
    }
}