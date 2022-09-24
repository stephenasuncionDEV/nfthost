import { useState, useRef } from 'react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useToast } from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { getAccessToken } from '@/utils/tools'
import errorHandler from '@/utils/errorHandler'
import config from '@/config/index'
import posthog from 'posthog-js'
import axios from 'axios'

export const useWebsiteControls = () => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom'
    });
    const { user } = useUser();
    const { setWebsites, setEditingWebsite } = useWebsite();
    const [isGettingWebsites, setIsGettingWebsites] = useState(false);
    const [isCreatingWebsite, setIsCreatingWebsite] = useState(false);
    const [isUpdatingWebsite, setIsUpdatingWebsite] = useState(false);
    const [isDeletingWebsite, setIsDeletingWebsite] = useState(false);
    const [creationInputState, setCreationInputState] = useState({});
    const [editInputState, setEditInputState] = useState({});
    const recaptchaRef = useRef();

    const getWebsites = async () => {
        try {
            setIsGettingWebsites(true);

            const accessToken = getAccessToken();

            const res = await axios.get(`${config.serverUrl}/api/website/getWebsites`, {
                params: {
                    memberId: user._id
                },
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            setWebsites(res.data);
            setIsGettingWebsites(false);
        }
        catch (err) {
            setIsGettingWebsites(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const createWebsite = async ({ route, title, description, logo, script, embed, favicon, robot, language, onClose }) => {
        try {
            setIsCreatingWebsite(true);

            let errorsObj = {};

            if (!route.length) errorsObj.route = { status: true, message: 'Subdomain must be filled in' };
            if (route.length > 255) errorsObj.route = { status: true, message: 'Max subdomain length is 255 characters' };
            if (!title.length) errorsObj.title = { status: true, message: 'Title field must be filled in' };
            if (title.length > 32) errorsObj.title = { status: true, message: 'Max title length is 32 characters' };
            if (!description.length) errorsObj.description = { status: true, message: 'Description field must be filled in' };
            if (script.length > 0 && !(/</i.test(script) && />/i.test(script))) errorsObj.script = { status: true, message: 'Script/Style code must be a valid html code' };
            if (!embed.length || !(/</i.test(embed) && />/i.test(embed))) errorsObj.embed = { status: true, message: 'Embed code must be a valid html code' };
            if (!logo.length) errorsObj.logo = { status: true, message: 'Logo Image Link field must be filled in' };
            if (logo.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp)$/) == null) errorsObj.logo = { status: true, message: 'Logo Image Link field must be an image file' };
            if (favicon.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp|ico)$/) == null) errorsObj.favicon = { status: true, message: 'Favicon Link field must be an image file' };

            if (Object.keys(errorsObj).length > 0) {
                setCreationInputState(errorsObj);
                throw new Error('Please fix all the errors before creating a website');
            }

            if (!recaptchaRef.current.getValue().length) throw new Error('Please verify that you are a human.');

            const res = await axios.post(`${config.serverUrl}/api/website/create`, {
                memberId: user._id,
                route: route.toLowerCase(),
                components: {
                    title,
                    unrevealedImage: logo,
                    description,
                    embed,
                    script
                },
                meta: {
                    robot,
                    favicon,
                    language
                }
            }, {
                headers: { 
                    Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot create website at the moment');

            posthog.capture('User created a mint website');

            await getWebsites();

            toast({
                title: 'Success',
                description: 'Successfuly created a mint website',
                status: 'success',
            })

            onClose();
            setIsCreatingWebsite(false);
        }
        catch (err) {
            setIsCreatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const editWebsite = (website) => {
        setEditingWebsite(website);
    }

    const updateTitle = async (websiteId, title) => {
        try {
            setIsUpdatingWebsite(true);

            let errorsObj = { ...editInputState };

            if (title.length > 32) errorsObj.title = { status: true, message: 'Max title length is 32 characters' };

            if (errorsObj.title) {
                setEditInputState(errorsObj);
                throw new Error('Please fix all the errors');
            }

            const accessToken = getAccessToken();

            const res = await axios.patch(`${config.serverUrl}/api/website/updateTitle`, {
                websiteId,
                title
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot update website at the moment');

            setWebsites((prevWebsite) => {
                return prevWebsite.map(web => {
                    if (web._id === websiteId) {
                        return {
                            ...web,
                            components: {
                                ...web.components,
                                title
                            }
                        }
                    }
                    return web;
                })
            })

            setEditingWebsite((prevWebsite) => {
                return {
                    ...prevWebsite,
                    components: {
                        ...prevWebsite.components,
                        title
                    }
                }
            })

            toast({
                title: 'Success',
                description: "Successfuly updated website's name",
                status: 'success',
            })

            setIsUpdatingWebsite(false);
        }
        catch (err) {
            setIsUpdatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const updateDescription = async (websiteId, description) => {
        try {
            setIsUpdatingWebsite(true);

            const accessToken = getAccessToken();

            const res = await axios.patch(`${config.serverUrl}/api/website/updateDescription`, {
                websiteId,
                description
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot update website at the moment');

            setWebsites((prevWebsite) => {
                return prevWebsite.map(web => {
                    if (web._id === websiteId) {
                        return {
                            ...web,
                            components: {
                                ...web.components,
                                description
                            }
                        }
                    }
                    return web;
                })
            })

            setEditingWebsite((prevWebsite) => {
                return {
                    ...prevWebsite,
                    components: {
                        ...prevWebsite.components,
                        description
                    }
                }
            })

            toast({
                title: 'Success',
                description: "Successfuly updated website's description",
                status: 'success',
            })

            setIsUpdatingWebsite(false);
        }
        catch (err) {
            setIsUpdatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const updateLanguage = async (websiteId, language) => {
        try {
            setIsUpdatingWebsite(true);

            const accessToken = getAccessToken();

            const res = await axios.patch(`${config.serverUrl}/api/website/updateLanguage`, {
                websiteId,
                language
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot update website at the moment');

            setWebsites((prevWebsite) => {
                return prevWebsite.map(web => {
                    if (web._id === websiteId) {
                        return {
                            ...web,
                            meta: {
                                ...web.meta,
                                language
                            }
                        }
                    }
                    return web;
                })
            })

            setEditingWebsite((prevWebsite) => {
                return {
                    ...prevWebsite,
                    meta: {
                        ...prevWebsite.meta,
                        language
                    }
                }
            })

            toast({
                title: 'Success',
                description: "Successfuly updated website's language metadata",
                status: 'success',
            })

            setIsUpdatingWebsite(false);
        }
        catch (err) {
            setIsUpdatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const updateScript = async (websiteId, script) => {
        try {
            setIsUpdatingWebsite(true);

            let errorsObj = { ...editInputState };

            if (!(/</i.test(script) && />/i.test(script))) errorsObj.script = { status: true, message: 'Script/Style code must be a valid html code' };

            if (errorsObj.script) {
                setEditInputState(errorsObj);
                throw new Error('Please fix all the errors');
            }

            const accessToken = getAccessToken();

            const res = await axios.patch(`${config.serverUrl}/api/website/updateScript`, {
                websiteId,
                script
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot update website at the moment');

            setWebsites((prevWebsite) => {
                return prevWebsite.map(web => {
                    if (web._id === websiteId) {
                        return {
                            ...web,
                            components: {
                                ...web.components,
                                script
                            }
                        }
                    }
                    return web;
                })
            })

            setEditingWebsite((prevWebsite) => {
                return {
                    ...prevWebsite,
                    components: {
                        ...prevWebsite.components,
                        script
                    }
                }
            })

            toast({
                title: 'Success',
                description: "Successfuly updated website's styles/scripts code",
                status: 'success',
            })

            setIsUpdatingWebsite(false);
        }
        catch (err) {
            setIsUpdatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const updateEmbed = async (websiteId, embed) => {
        try {
            setIsUpdatingWebsite(true);

            let errorsObj = { ...editInputState };

            if (!(/</i.test(embed) && />/i.test(embed))) errorsObj.embed = { status: true, message: 'Embed code must be a valid html code' };

            if (errorsObj.embed) {
                setEditInputState(errorsObj);
                throw new Error('Please fix all the errors');
            }

            const accessToken = getAccessToken();

            const res = await axios.patch(`${config.serverUrl}/api/website/updateEmbed`, {
                websiteId,
                embed
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot update website at the moment');

            setWebsites((prevWebsite) => {
                return prevWebsite.map(web => {
                    if (web._id === websiteId) {
                        return {
                            ...web,
                            components: {
                                ...web.components,
                                embed
                            }
                        }
                    }
                    return web;
                })
            })

            setEditingWebsite((prevWebsite) => {
                return {
                    ...prevWebsite,
                    components: {
                        ...prevWebsite.components,
                        embed
                    }
                }
            })

            toast({
                title: 'Success',
                description: "Successfuly updated website's embed code",
                status: 'success',
            })

            setIsUpdatingWebsite(false);
        }
        catch (err) {
            setIsUpdatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const updateRobot = async (websiteId, robot) => {
        try {
            setIsUpdatingWebsite(true);

            const accessToken = getAccessToken();

            const res = await axios.patch(`${config.serverUrl}/api/website/updateRobot`, {
                websiteId,
                robot
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) throw new Error('Cannot update website at the moment');

            setWebsites((prevWebsite) => {
                return prevWebsite.map(web => {
                    if (web._id === websiteId) {
                        return {
                            ...web,
                            meta: {
                                ...web.meta,
                                robot
                            }
                        }
                    }
                    return web;
                })
            })

            setEditingWebsite((prevWebsite) => {
                return {
                    ...prevWebsite,
                    meta: {
                        ...prevWebsite.meta,
                        robot
                    }
                }
            })

            toast({
                title: 'Success',
                description: "Successfuly updated website's robot metadata",
                status: 'success',
            })

            setIsUpdatingWebsite(false);
        }
        catch (err) {
            setIsUpdatingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const deleteWebsite = async () => {
        try {
            setIsDeletingWebsite(false);

            setIsDeletingWebsite(true);
        }
        catch (err) {
            setIsDeletingWebsite(false);
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    return {
        getWebsites,
        isGettingWebsites,
        createWebsite,
        isCreatingWebsite,
        recaptchaRef,
        creationInputState,
        editWebsite,
        editInputState,
        updateTitle,
        updateDescription,
        updateLanguage,
        updateScript,
        updateEmbed,
        updateRobot,
        isUpdatingWebsite,
        deleteWebsite,
        isDeletingWebsite,
    }
}