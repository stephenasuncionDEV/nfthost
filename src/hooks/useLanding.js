import { useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider'

export const useLanding = () => { 
    const { setIsCookieModal } = useCore();

    useEffect(() => {
        // Check if user accepted cookie
        if (!localStorage.getItem('nfthost-cookie')) {
            setIsCookieModal(true);
        }
    }, [])

    return {
        setIsCookieModal
    }
}