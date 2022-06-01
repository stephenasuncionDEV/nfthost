import { HStack, Text, Button, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Progress, 
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { BiInfoCircle } from 'react-icons/bi'
import { FaDownload } from 'react-icons/fa'

const DownloadModal = () => {
    const { 
        isDownloadModal,
        setIsDownloadModal,
        isGenerated,
        generateSpeed,
        isAutoSave,
        isDownloading,
        downloadPercentage
    } = useGenerator();

    const {  
        DownloadCollection,
        DownloadMetadata
    } = useGenerate();

    return isGenerated && (
        <Modal onClose={() => setIsDownloadModal(false)} isOpen={isDownloadModal} isCentered size='4xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Download
                    <Text fontSize='10pt' fontWeight='normal' mt='.5em'>
                        {!isAutoSave ? 'Download your NFT Collection' : 'Download your NFT Collection Metadata'}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {!isAutoSave ? (
                        <Button disabled={isDownloading} onClick={DownloadCollection} rightIcon={<FaDownload />}>
                            Download Collection
                        </Button>
                    ) : (
                        <Button disabled={isDownloading} onClick={DownloadMetadata} rightIcon={<FaDownload />}>
                            Download Metadata
                        </Button>
                    )}
                    {isDownloading && (
                        <>
                            <Text textAlign='left' mt='1em' fontSize='14pt'>
                                Downloading
                            </Text>
                            <Text textAlign='left' fontSize='10pt'>
                                This may take awhile. Please do not refresh the page.
                            </Text>
                            <HStack w='full'>
                                <Progress flex='1' hasStripe value={downloadPercentage} />
                                <Text fontSize='11pt'>
                                    {downloadPercentage.toFixed(2)} %
                                </Text>
                            </HStack>
                        </>
                    )}
                    <Text fontSize='14pt' mt='2em'>
                        Generation Speed
                    </Text>
                    <Text fontSize='10pt'>
                        Generation speed in hours, minutes, seconds, and milliseconds
                    </Text>
                    <HStack mt='1em'>
                        <BiInfoCircle />
                        <Text fontSize='10pt'>
                            It took <span style={{ color: 'rgb(40, 252, 3)' }}>{(generateSpeed / 3600000).toFixed(2)} hours</span> or &nbsp;
                            <span style={{ color: 'rgb(40, 252, 3)' }}>{(generateSpeed / 60000).toFixed(2)} minutes</span> or &nbsp;
                            <span style={{ color: 'rgb(40, 252, 3)' }}>{(generateSpeed * 0.001).toFixed(2)} seconds</span> or &nbsp;
                            <span style={{ color: 'rgb(40, 252, 3)' }}>{generateSpeed.toFixed(2)} milliseconds</span> to generate your collection.
                        </Text>
                    </HStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default DownloadModal