import { useState, useContext, createContext } from 'react'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [address, setAddress] = useState('');
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const controllers = {
        address,
        setAddress,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
		<UserContext.Provider
			value={controllers}
		>
			{ children }
		</UserContext.Provider>
	)
}