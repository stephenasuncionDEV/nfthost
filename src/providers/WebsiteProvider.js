import { useState, useContext, createContext } from 'react'

export const WebsiteContext = createContext({})
export const useWebsite = () => useContext(WebsiteContext)

export const WebsiteProvider = ({ children }) => {
    const [userWebsite, setUserWebsite] = useState();
    const [websites, setWebsites] = useState();
    const [currentDashboard, setCurrentDashboard] = useState('sites');
    const [newSubcription, setNewSubscription] = useState('free');
    const [newComponentTitle, setNewComponentTitle] = useState('');
    const [newComponentImage, setNewComponentImage] = useState('https://www.nfthost.app/assets/logo.png');
    const [newComponentDescription, setNewComponentDescription] = useState('');
    const [newComponentEmbed, setNewComponentEmbed] = useState('');
    const [newComponentScript, setNewComponentScript] = useState('');
    const [newMetaRobot, setNewMetaRobot] = useState('if');
    const [newMetaFavicon, setNewMetaFavicon] = useState('https://www.nfthost.app/favicon.ico');
    const [newMetaLanguage, setNewMetaLanguage] = useState('EN');
    const [newErrors, setNewErrors] = useState();
    const [isCreating, setIsCreating] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditWebsite, setIsEditWebsite] = useState(false);
    const [isDeletingWebsite, setIsDeletingWebsite] = useState(false);
    const [isCreateWebsiteModal, setIsCreateWebsiteModal] = useState(false);
    const [currentEditWebsite, setCurrentEditWebsite] = useState();
    const [currentTemplate, setCurrentTemplate] = useState();
    const [newBackgroundImage, setNewBackgroundImage] = useState('');
    const [newBackgroundColor, setNewBackgroundColor] = useState('');
    const [newRevealDate, setNewRevealDate] = useState('');

    const controllers = {
        userWebsite,
        setUserWebsite,
        websites,
        setWebsites,
        currentDashboard,//
        setCurrentDashboard,//
        newSubcription,
        setNewSubscription,
        newComponentTitle,
        setNewComponentTitle,
        newComponentImage,
        setNewComponentImage,
        newComponentDescription,
        setNewComponentDescription,
        newComponentEmbed,
        setNewComponentEmbed,
        newComponentScript,
        setNewComponentScript,
        newMetaRobot,
        setNewMetaRobot,
        newMetaFavicon,
        setNewMetaFavicon,
        newMetaLanguage,
        setNewMetaLanguage,
        newErrors,
        setNewErrors,
        isCreating,
        setIsCreating,
        isRefreshing,
        setIsRefreshing,
        isUpdating,
        setIsUpdating,
        isEditWebsite,
        setIsEditWebsite,
        currentEditWebsite,
        setCurrentEditWebsite,
        isDeletingWebsite,
        setIsDeletingWebsite,
        newBackgroundImage,
        setNewBackgroundImage,
        newBackgroundColor,
        setNewBackgroundColor,
        currentTemplate,
        setCurrentTemplate,
        newRevealDate,
        setNewRevealDate,
        isCreateWebsiteModal,
        setIsCreateWebsiteModal,
    }

    return (
		<WebsiteContext.Provider
			value={controllers}
		>
			{ children }
		</WebsiteContext.Provider>
	)
}