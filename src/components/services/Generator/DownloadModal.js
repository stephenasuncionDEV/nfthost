import { HStack, Text, Button, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Progress, Box, Flex, VStack, Checkbox
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { BiInfoCircle } from 'react-icons/bi'
import { FaDownload } from 'react-icons/fa'
import { AiOutlineArrowRight } from 'react-icons/ai'

const DownloadModal = () => {
    const { 
        isDownloadModal,
        setIsDownloadModal,
        setIsConfetti,
        isGenerated,
        generateSpeed,
        isAutoSave,
        isDownloading,
        downloadPercentage,
        isRandomizedMetadata,
        setIsRandomizedMetadata
    } = useGenerator();

    const {  
        DownloadCollection,
        DownloadMetadata
    } = useGenerate();

    return isGenerated && (
        <Modal 
            onClose={() => {
                setIsConfetti(false);
                setIsDownloadModal(false);
            }} 
            isOpen={isDownloadModal} 
            isCentered 
            size='4xl'
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Download
                    <Text fontWeight='normal' fontSize='10pt'>
                        Download your entire collection or metadata.
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent='center' alignItems='center' my='3em'>
                        <HStack spacing='4em'>
                            <VStack alignItems='flex-start'>
                                <Text variant='content_subtitle'>
                                    {!isAutoSave ? 'NFT Collection' : 'Collection Metadata'}
                                </Text>
                                <Text fontSize='10pt' fontWeight='normal' mt='.5em'>
                                    {!isAutoSave ? 'Download your NFT Collection' : 'Download your NFT Collection Metadata'}
                                </Text>
                                {!isAutoSave ? (
                                    <Button isLoading={isDownloading} loadingText='Downloading' onClick={DownloadCollection} rightIcon={<FaDownload />} size='sm' variant='primary'>
                                        Download Collection
                                    </Button>
                                ) : (
                                    <Button isLoading={isDownloading} loadingText='Downloading' onClick={DownloadMetadata} rightIcon={<FaDownload />} size='sm' variant='primary'>
                                        Download Metadata
                                    </Button>
                                )}
                            </VStack>
                            <VStack alignItems='flex-start'>
                                <Text fontSize='10pt'>
                                    Options
                                </Text>
                                <Checkbox value={isRandomizedMetadata} onChange={(e) => setIsRandomizedMetadata(e.target.value)}>
                                    <Text fontSize='10pt'>
                                        Shuffled (Randomized) metadata.json
                                    </Text>
                                </Checkbox>
                            </VStack>
                        </HStack>
                    </Flex>
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
                </ModalBody>
                <ModalFooter justifyContent='space-between'>
                    <Box mt='1em' opacity='.8'>
                        <Text fontSize='10pt'>
                            Generation Speed
                        </Text>
                        <Text fontSize='8pt'>
                            Generation speed in hours, minutes, seconds, and milliseconds
                        </Text>
                        <Text fontSize='8pt'>
                            It took <span style={{ color: 'rgb(52,140,212)' }}>{(generateSpeed / 3600000).toFixed(2)} hours</span> or &nbsp;
                            <span style={{ color: 'rgb(52,140,212)' }}>{(generateSpeed / 60000).toFixed(2)} minutes</span> or &nbsp;
                            <span style={{ color: 'rgb(52,140,212)' }}>{(generateSpeed * 0.001).toFixed(2)} seconds</span> or &nbsp;
                            <span style={{ color: 'rgb(52,140,212)' }}>{generateSpeed.toFixed(2)} milliseconds</span> to generate your collection.
                        </Text>
                    </Box>
                    <Button size='sm' rightIcon={<AiOutlineArrowRight />} onClick={() => {
                        setIsConfetti(false);
                        setIsDownloadModal(false);
                    }}>
                        Finish
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DownloadModal