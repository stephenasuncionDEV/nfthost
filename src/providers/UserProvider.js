import { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import Web3 from 'web3'
import axios from 'axios'
import { parseJwt } from '@/utils/tools'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();
    const [address, setAddress] = useState('');
    const [isLoggedin, setIsLoggedIn] = useState(false);

    const controllers = {
        
    }

    return (
		<UserContext.Provider
			value={controllers}
		>
			{ children }
		</UserContext.Provider>
	)
}