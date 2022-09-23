import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useSites } from '@/hooks/services/website/useSites'
import { decryptToken } from '@/utils/tools'
import posthog from 'posthog-js'
import axios from 'axios'
import config from '@/config/index'

export const useAddonSettings = () => {
    const toast = useToast();
    const { addonSettingsData, setIsAddonSettingsModal } = useCore();
    const { currentEditWebsite, setCurrentEditWebsite } = useWebsite();
    const { Logout } = useWeb3;
    const { GetWebsites } = useSites();

    const [twitter, setTwitter] = useState('');
    const [discord, setDiscord] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [reddit, setReddit] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!currentEditWebsite) return;
        if (!addonSettingsData) return;
        
        if (addonSettingsData.item === 'socials') {
            const { external_links: { twitter, instagram, youtube, tiktok, discord, reddit, facebook } } = currentEditWebsite;
            setTwitter(twitter || '');
            setDiscord(discord || '');
            setInstagram(instagram || '');
            setFacebook(facebook || '');
            setYoutube(youtube || '');
            setReddit(reddit || '');
            setTiktok(tiktok || '');
        }

    }, [currentEditWebsite, addonSettingsData])

    const ClearLinks = () => {
        setTwitter('');
        setDiscord('');
        setInstagram('');
        setFacebook('');
        setYoutube('');
        setReddit('');
        setTiktok('');
    }

    const SaveSocials = async () => {
        try {
            if (!currentEditWebsite) return;

            let noChanges = true;
            const newLinks = [ twitter, instagram, youtube, tiktok, discord, reddit, facebook ];
            const oldLinks = Object.values(currentEditWebsite.external_links).map((value) => {
                return value || ''
            });
            newLinks.forEach((link, idx) => {
                if (link !== oldLinks[idx]) noChanges = false;
            })

            if (noChanges) throw new Error('No changes detected');

            const storageToken = localStorage.getItem('nfthost-user');
            if (!storageToken) return;

            const token = decryptToken(storageToken, true);

            setIsSaving(true);

            const newExternalLink = { twitter, instagram, youtube, tiktok, discord, reddit, facebook };

            await axios.patch(`${config.serverUrl}/api/website/updateExternalLink`, {
                websiteId: currentEditWebsite._id,
                external_links: newExternalLink
            }, {
                headers: { 
                    Authorization: `Bearer ${token.accessToken}` 
                }
            })

            await GetWebsites();

            let newEditWebsite = { ...currentEditWebsite };
            newEditWebsite.external_links = newExternalLink;

            setCurrentEditWebsite(newEditWebsite);
            setIsSaving(false);

            posthog.capture('User saved external link on addon', {
                addon: addonSettingsData.addon
            });

            ClearLinks();

            toast({
                title: 'Success',
                description: `Successfully changed mint website's external link(s)`,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })

            setIsAddonSettingsModal(false);
        }
        catch (err) {
            setIsSaving(false);
            console.error(err);
            if (err.response?.data?.isExpired) await Logout();
            toast({
                title: 'Error',
                description: !err.response ? err.message : (err.response?.data?.message || 'Something wrong occured'),
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        twitter,
        setTwitter,
        discord,
        setDiscord,
        instagram,
        setInstagram,
        facebook, 
        setFacebook,
        youtube,
        setYoutube,
        reddit,
        setReddit,
        tiktok,
        setTiktok,
        isSaving,
        setIsSaving,
        SaveSocials
    }
}