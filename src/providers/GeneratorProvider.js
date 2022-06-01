import { useState, useContext, createContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

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
    const [creators, setCreators] = useState([]);
    const [layers, setLayers] = useState([{ name: 'Background', images: [] }]);
    const [currentLayer, setCurrentLayer] = useState(0);
    const [isMetadataModal, setIsMetadataModal] = useState(false);
    const [isRarityModal, setIsRarityModal] = useState(false);
    const [isGenerateModal, setIsGenerateModal] = useState(false);
    const [imageDimension, setImageDimension] = useState();
    const [isConfetti, setIsConfetti] = useState(false);
    const [isAutoSave, setIsAutoSave] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [autoSavePercentage, setAutoSavePercentage] = useState(0);
    const [downloadPercentage, setDownloadPercentage] = useState(0);
    const [metadata, setMetadata] = useState();
    const [curMetadata, setCurMetadata] = useState('');
    const [renderIndex, setRenderIndex] = useState(1);
    const [generateSpeed, setGenerateSpeed] = useState(0);
    const canvasRef = useRef();

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
        layers,
        setLayers,
        currentLayer,
        setCurrentLayer,
        isMetadataModal,
        setIsMetadataModal,
        imageDimension,
        setImageDimension,
        isRarityModal,
        setIsRarityModal,
        isGenerateModal,
        setIsGenerateModal,
        isAutoSave,
        setIsAutoSave,
        isGenerating,
        setIsGenerating,
        isGenerated,
        setIsGenerated,
        isDownloading,
        setIsDownloading,
        autoSavePercentage,
        setAutoSavePercentage,
        downloadPercentage,
        setDownloadPercentage,
        metadata,
        setMetadata,
        curMetadata,
        setCurMetadata,
        renderIndex,
        setRenderIndex,
        generateSpeed,
        setGenerateSpeed,
        canvasRef,
        isConfetti,
        setIsConfetti
    }

    return (
		<GeneratorContext.Provider
			value={controllers}
		>
			{ children }
		</GeneratorContext.Provider>
	)
}