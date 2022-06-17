import { useWebsite } from '@/providers/WebsiteProvider'
import { useEffect } from 'react'
import { useSites } from './useSites'

export const useEditWebsite = () => {
    const { editWebsiteFormRef, currentEditWebsite } = useWebsite();
    const { EditWebsite } = useSites();

    useEffect(() => {
        if (!editWebsiteFormRef || !currentEditWebsite) return;
        EditWebsite(currentEditWebsite);
    }, [editWebsiteFormRef])

    return {
        
    }
}