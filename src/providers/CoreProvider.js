import { useState, useContext, createContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [provider, setProvider] = useState();
    const [isServiceModal, setIsServiceModal] = useState(false);
    const [isCookieModal, setIsCookieModal] = useState(false);
    const [isKeepWorkingModal, setIsKeepWorkingModal] = useState(false);
    const [isAreYouSureModal, setIsAreYouSureModal] = useState(false);
    const [isSidebar, setIsSidebar] = useState(true);
    const [paymentData, setPaymentData] = useState();
    const [paymentMethodStep, setPaymentMethodStep] = useState('cryptowallet');
    const [paymentName, setPaymentName] = useState('');
    const [paymentEmail, setPaymentEmail] = useState('');
    const [paymentAddress, setPaymentAddress] = useState('');
    const [paymentCity, setPaymentCity] = useState('');
    const [paymentState, setPaymentState] = useState('');
    const [paymentZip, setPaymentZip] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [paymentPageNumber, setPaymentPageNumber] = useState(0);
    const [areYouSureData, setAreYouSureData] = useState({
        item: 'website',
        action: 'Delete',
        button: 'danger',
        callback: () => {
            console.log('No Data');
        }
    });
    const [transactions, setTransactions] = useState();
    const [isGettingTransactions, setIsGettingTransactions] = useState(false);
    const [referrer, setReferrer] = useState('');
    const { isOpen: isProfileOpen, onClose: onProfileClose, onOpen: onProfileOpen } = useDisclosure();

    const controllers = {
        provider,
        setProvider,
        isServiceModal,
        setIsServiceModal,
        isCookieModal,
        setIsCookieModal,
        isSidebar,
        setIsSidebar,
        paymentData,
        setPaymentData,
        paymentMethodStep,
        setPaymentMethodStep,
        paymentName,
        setPaymentName,
        paymentEmail,
        setPaymentEmail,
        paymentAddress,
        setPaymentAddress,
        paymentCity,
        setPaymentCity,
        paymentState,
        setPaymentState,
        paymentZip,
        setPaymentZip,
        isPaying,
        setIsPaying,
        isKeepWorkingModal,
        setIsKeepWorkingModal,
        isAreYouSureModal,
        setIsAreYouSureModal,
        areYouSureData,
        setAreYouSureData,
        transactions,
        setTransactions,
        isGettingTransactions,
        setIsGettingTransactions,
        paymentPageNumber,
        setPaymentPageNumber,
        referrer,
        setReferrer,
        isProfileOpen,
        onProfileClose,
        onProfileOpen
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}