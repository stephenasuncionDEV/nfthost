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
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [externalURL, setExternalURL] = useState('');
    const [standardType, setStandardType] = useState('eth');
    const [collectionSize, setCollectionSize] = useState(100);
    const [symbol, setSymbol] = useState('');
    const [creatorAddress, setCreatorAddress] = useState('');
    const [sellerFee, setSellerFee] = useState(1000);
    const [creatorShare, setCreatorShare] = useState(100);
    const [step, setStep] = useState(0);
    const [creators, setCreators] = useState([]);
    const [layers, setLayers] = useState([{ name: 'Background', images: [] }]);
    const [currentLayer, setCurrentLayer] = useState(0);
    const [isMetadataModal, setIsMetadataModal] = useState(false);

    const controllers = {
        name,
        setName,
        description,
        setDescription,
        externalURL,
        setExternalURL,
        standardType,
        setStandardType,
        collectionSize,
        setCollectionSize,
        symbol,
        setSymbol,
        creatorAddress,
        setCreatorAddress,
        sellerFee,
        setSellerFee,
        creatorShare,
        setCreatorShare,
        creators,
        setCreators,
        step,
        setStep,
        layers,
        setLayers,
        currentLayer,
        setCurrentLayer,
        isMetadataModal,
        setIsMetadataModal
    }

    return (
		<GeneratorContext.Provider
			value={controllers}
		>
			{ children }
		</GeneratorContext.Provider>
	)
}