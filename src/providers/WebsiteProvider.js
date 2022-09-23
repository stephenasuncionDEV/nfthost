import { useState, useContext, createContext } from 'react'

export const WebsiteContext = createContext({})
export const useWebsite = () => useContext(WebsiteContext)

export const WebsiteProvider = ({ children }) => {
    const [userWebsite, setUserWebsite] = useState();
    const [websites, setWebsites] = useState();

    const controllers = {
        userWebsite,
        setUserWebsite,
        websites,
        setWebsites,
    }

    return (
		<WebsiteContext.Provider
			value={controllers}
		>
			{ children }
		</WebsiteContext.Provider>
	)
}