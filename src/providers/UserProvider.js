import { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();
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