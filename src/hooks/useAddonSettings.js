import { useEffect, useState } from 'react'
import { useWebsite } from '@/providers/WebsiteProvider'

export const useAddonSettings = () => {
    const { currentEditWebsite } = useWebsite();
    const [twitter, setTwitter] = useState('');
    const [discord, setDiscord] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [reddit, setReddit] = useState('');
    const [tiktok, setTiktok] = useState('');

    useEffect(() => {
        if (!currentEditWebsite) return;
        const { external_links: { twitter, instagram, youtube, tiktok, discord, reddit, facebook } } = currentEditWebsite;

        setTwitter(twitter || '');
        setDiscord(discord || '');
        setInstagram(instagram || '');
        setFacebook(facebook || '');
        setYoutube(youtube || '');
        setReddit(reddit || '');
        setTiktok(tiktok || '');

    }, [currentEditWebsite])

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
        setTiktok
    }
}