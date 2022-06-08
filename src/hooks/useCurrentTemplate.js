import { useEffect } from 'react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { TemplatesArr } from '@/utils/tools'
import LZString from 'lz-string'

export const useCurrentTemplate = () => {
    const { 
        setCurrentTemplate,
        currentEditWebsite
    } = useWebsite();

    useEffect(() => {
        UpdateCurrentTemplate();
    }, [])

    const UpdateCurrentTemplate = (data = null) => {
        try {
            const templateKeysArr = TemplatesArr.map((template) => template.key);
            const template = JSON.parse(LZString.decompress(data ? data : currentEditWebsite.data)).template;
            const indexOfKey = templateKeysArr.indexOf(template);
            setCurrentTemplate(TemplatesArr[indexOfKey]);
        }
        catch (err) {
            console.error(err);
        }
    }

    return {
        UpdateCurrentTemplate
    }
}
