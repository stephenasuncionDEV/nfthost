import { HStack, Text, Button, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Progress, Box, Flex, VStack,
    useColorModeValue
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useGenerate } from '@/hooks/useGenerate'
import { BiInfoCircle } from 'react-icons/bi'
import { FaDownload } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineInfoCircle } from 'react-icons/ai'

const DownloadModal = () => {
    const { 
        isDownloadModal,
        setIsDownloadModal,
        setIsConfetti,
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

    const dropContainerColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)');

    return isGenerated && (
        <Modal 
            onClose={() => {
                setIsConfetti(false);
                setIsDownloadModal(false);
            }} 
            isOpen={isDownloadModal} 
            isCentered 
            size='4xl'
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Download
                    <HStack fontSize='11pt'>
                        <AiOutlineInfoCircle />
                        <Text fontWeight='normal'>
                            Download your entire collection or metadata.
                        </Text>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex justifyContent='center' alignItems='center'>
                        <HStack spacing='2em'>
                            <Box 
                                h='170px'
                                w='2px'
                                bg={dropContainerColor}
                            />
                            <VStack alignItems='flex-start'>
                                <Text variant='content_subtitle'>
                                    {!isAutoSave ? 'NFT Collection' : 'Collection Metadata'}
                                </Text>
                                <Text fontSize='10pt' fontWeight='normal' mt='.5em'>
                                    {!isAutoSave ? 'Download your NFT Collection' : 'Download your NFT Collection Metadata'}
                                </Text>
                                {!isAutoSave ? (
                                    <Button disabled={isDownloading} onClick={DownloadCollection} rightIcon={<FaDownload />} size='sm'>
                                        Download Collection
                                    </Button>
                                ) : (
                                    <Button disabled={isDownloading} onClick={DownloadMetadata} rightIcon={<FaDownload />} size='sm'>
                                        Download Metadata
                                    </Button>
                                )}
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
                        <HStack mt='.25em'>
                            <BiInfoCircle fontSize='8pt' />
                            <Text fontSize='8pt'>
                                It took <span style={{ color: 'rgb(40, 252, 3)' }}>{(generateSpeed / 3600000).toFixed(2)} hours</span> or &nbsp;
                                <span style={{ color: 'rgb(40, 252, 3)' }}>{(generateSpeed / 60000).toFixed(2)} minutes</span> or &nbsp;
                                <span style={{ color: 'rgb(40, 252, 3)' }}>{(generateSpeed * 0.001).toFixed(2)} seconds</span> or &nbsp;
                                <span style={{ color: 'rgb(40, 252, 3)' }}>{generateSpeed.toFixed(2)} milliseconds</span> to generate your collection.
                            </Text>
                        </HStack>
                    </Box>
                    <Button rightIcon={<AiOutlineArrowRight />} onClick={() => {
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