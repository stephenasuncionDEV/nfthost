import { useState, useContext, createContext } from 'react'

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [isServiceModal, setIsServiceModal] = useState(false);
    const [isCookieModal, setIsCookieModal] = useState();
    const [isSidebar, setIsSidebar] = useState(false);
    const [paymentData, setPaymentData] = useState({
        service: 'Generator',
        price: '25.00',
        product: '1 NFT collection generation',
        due: new Date()
    });
    const [paymentMethodStep, setPaymentMethodStep] = useState('metamask');

    const controllers = {
        isServiceModal,
        setIsServiceModal,
        isCookieModal,
        setIsCookieModal,
        isSidebar,
        setIsSidebar,
        paymentData,
        setPaymentData,
        paymentMethodStep,
        setPaymentMethodStep
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}