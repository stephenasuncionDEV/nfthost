import { useState, useContext, createContext } from 'react'

export const WebsiteContext = createContext({})
export const useWebsite = () => useContext(WebsiteContext)

export const WebsiteProvider = ({ children }) => {
    const [websites, setWebsites] = useState();
    const [currentDashboard, setCurrentDashboard] = useState('sites');

    const controllers = {
        websites,
        setWebsites,
        currentDashboard,
        setCurrentDashboard
    }

    return (
		<WebsiteContext.Provider
			value={controllers}
		>
			{ children }
		</WebsiteContext.Provider>
	)
}