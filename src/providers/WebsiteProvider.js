import { useState, useContext, createContext, useRef } from 'react'

export const WebsiteContext = createContext({})
export const useWebsite = () => useContext(WebsiteContext)

export const WebsiteProvider = ({ children }) => {
    const [userWebsite, setUserWebsite] = useState();
    const [websites, setWebsites] = useState();
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
    const [editErrors, setEditErrors] = useState();
    const [isCreating, setIsCreating] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditWebsite, setIsEditWebsite] = useState(false);
    const [isDeletingWebsite, setIsDeletingWebsite] = useState(false);
    const [isCreateWebsiteModal, setIsCreateWebsiteModal] = useState(false);
    const [isChangingAlias, setIsChangingAlias] = useState(false);
    const [isChangingDomain, setIsChangingDomain] = useState(false);
    const [currentEditWebsite, setCurrentEditWebsite] = useState();
    const [userWebsiteError, setUserWebsiteError] = useState([]);
    const [newRevealDate, setNewRevealDate] = useState('');
    const [createWebsiteStep, setCreateWebsiteStep] = useState('information'); // information, settings
    const [featuredWebsites, setFeaturedWebsites] = useState();
    const [newAlias, setNewAlias] = useState('');
    const [newDomain, setNewDomain] = useState('');
    const [editor, setEditor] = useState();
    const editWebsiteFormRef = useRef();
    const recaptchaRef = useRef();

    const controllers = {
        editor,
        setEditor,
        userWebsite,
        setUserWebsite,
        websites,
        setWebsites,
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
        newRevealDate,
        setNewRevealDate,
        isCreateWebsiteModal,
        setIsCreateWebsiteModal,
        createWebsiteStep,
        setCreateWebsiteStep,
        editWebsiteFormRef,
        editErrors,
        setEditErrors,
        featuredWebsites,
        setFeaturedWebsites,
        newAlias,
        setNewAlias,
        newDomain,
        setNewDomain,
        isChangingAlias,
        setIsChangingAlias,
        isChangingDomain,
        setIsChangingDomain,
        recaptchaRef,
        userWebsiteError,
        setUserWebsiteError
    }

    return (
		<WebsiteContext.Provider
			value={controllers}
		>
			{ children }
		</WebsiteContext.Provider>
	)
}