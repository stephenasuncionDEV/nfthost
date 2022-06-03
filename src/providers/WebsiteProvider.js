import { useState, useContext, createContext } from 'react'

export const WebsiteContext = createContext({})
export const useWebsite = () => useContext(WebsiteContext)

export const WebsiteProvider = ({ children }) => {

    const controllers = {
        
    }

    return (
		<WebsiteContext.Provider
			value={controllers}
		>
			{ children }
		</WebsiteContext.Provider>
	)
}