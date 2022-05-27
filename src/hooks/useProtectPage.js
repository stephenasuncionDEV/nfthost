import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'

export const useProtectPage = () => {
    const { isLoggedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn === undefined) return;
        console.log(isLoggedIn)
        if (!isLoggedIn) router.push('/', undefined, { shallow: true }); 
    }, [isLoggedIn])
}