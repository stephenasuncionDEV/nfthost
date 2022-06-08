import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/providers/UserProvider'

export const useProtectPage = () => {
    const router = useRouter();
    const { isLoggedIn } = useUser();

    useEffect(() => {
        if (isLoggedIn === undefined) return;
        if (!isLoggedIn) router.push('/', undefined, { shallow: true });
    }, [isLoggedIn])
}