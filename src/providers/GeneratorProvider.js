import { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import config from '@/config/index'
import Web3 from 'web3'
import axios from 'axios'
import { parseJwt } from '@/utils/tools'

export const GeneratorContext = createContext({})
export const useGenerator = () => useContext(GeneratorContext)

export const GeneratorProvider = ({ children }) => {
    const toast = useToast();
    const router = useRouter();
    const [collectionName, setCollectionName] = useState('');
    const [collectionDescription, setCollectionDescription] = useState('');
    const [collectionURL, setCollectionURL] = useState('');
    const [collectionType, setCollectionType] = useState('eth');
    const [collectionSize, setCollectionSize] = useState(1);
    const [collectionSymbol, setCollectionSymbol] = useState('');
    const [collectionCreatorAddress, setCollectionCreatorAddress] = useState('');
    const [collectionSellerFee, setCollectionSellerFee] = useState(1000);
    const [collectionCreatorShare, setCollectionCreatorShare] = useState(100);
    const [creators, setCreators] = useState([]);

    const controllers = {
        collectionName,
        setCollectionName,
        collectionDescription,
        setCollectionDescription,
        collectionURL,
        setCollectionURL,
        collectionType,
        setCollectionType,
        collectionSize,
        setCollectionSize,
        collectionSymbol,
        setCollectionSymbol,
        collectionCreatorAddress,
        setCollectionCreatorAddress,
        collectionSellerFee,
        setCollectionSellerFee,
        collectionCreatorShare,
        setCollectionCreatorShare,
        creators,
        setCreators
    }

    return (
		<GeneratorContext.Provider
			value={controllers}
		>
			{ children }
		</GeneratorContext.Provider>
	)
}