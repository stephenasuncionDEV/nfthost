import { useWebsite } from '@/providers/WebsiteProvider'
import { useEffect } from 'react'
import { useWeb } from '@/hooks/services/website/useWeb'

export const useEditWebsite = () => {
    const { editWebsiteFormRef, currentEditWebsite } = useWebsite();
    const { EditWebsite } = useWeb();

    useEffect(() => {
        if (!editWebsiteFormRef || !currentEditWebsite) return;
        EditWebsite(currentEditWebsite);
    }, [editWebsiteFormRef])
}