import { useEffect } from 'react'
import { useWebsite } from '@/providers/WebsiteProvider'
import posthog from 'posthog-js'

export const useUserWebsite = () => {
    const {  } = useWebsite();

    const Accept = () => {
        
    }

    return {
        Accept
    }
}