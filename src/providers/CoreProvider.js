import { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();
    const [isServiceModal, setIsServiceModal] = useState(false);
    const [isCookieModal, setIsCookieModal] = useState();
    const [isSidebar, setIsSidebar] = useState(false);
    const [paymentData, setPaymentData] = useState();

    const controllers = {
        isServiceModal,
        setIsServiceModal,
        isCookieModal,
        setIsCookieModal,
        isSidebar,
        setIsSidebar,
        paymentData,
        setPaymentData
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}