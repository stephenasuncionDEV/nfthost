import { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import Web3 from 'web3'
import axios from 'axios'
import { parseJwt } from '@/utils/tools'

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();
    const [isServiceModal, setIsServiceModal] = useState(false);
    const [isCookieModal, setIsCookieModal] = useState();
    const [isSidebar, setIsSidebar] = useState(true);

    const controllers = {
        isServiceModal,
        setIsServiceModal,
        isCookieModal,
        setIsCookieModal,
        isSidebar,
        setIsSidebar
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}