import { useState, useContext, createContext } from 'react'

export const WebsiteContext = createContext({})
export const useWebsite = () => useContext(WebsiteContext)

export const WebsiteProvider = ({ children }) => {
    const [userWebsite, setUserWebsite] = useState(null);
    const [editingWebsite, setEditingWebsite] = useState(null);
    const [websites, setWebsites] = useState([]);

    const controllers = {
        websites,
        setWebsites,
        userWebsite,
        setUserWebsite,
        editingWebsite,
        setEditingWebsite
    }

    return (
		<WebsiteContext.Provider
			value={controllers}
		>
			{ children }
		</WebsiteContext.Provider>
	)
}