import { Box, HStack, Text, Flex, Textarea, Modal, ModalOverlay, 
    ModalContent, ModalHeader, ModalFooter, ModalBody,
    Progress, useColorModeValue
} from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const GenerateModal = () => {
    const { 
        canvasRef,
        imageDimension,
        isGenerateModal, 
        setIsGenerateModal,
        curMetadata,
        renderIndex,
        collectionSize,
        isDownloading,
        autoSavePercentage
    } = useGenerator();

    const dropContainerColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    return (
        <Modal 
            onClose={() => setIsGenerateModal(false)} 
            isOpen={isGenerateModal} 
            isCentered 
            size='4xl'
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Generating...
                    <HStack fontSize='11pt'>
                        <AiOutlineInfoCircle />
                        <Text fontWeight='normal'>
                            This may take awhile. Please do not refresh the page.
                        </Text>
                    </HStack>
                </ModalHeader>
                <ModalBody>
                    <Flex justifyContent='space-evenly'>
                        <Box p='1em' bg={dropContainerColor} borderRadius='10px' mt='2em' w='385px' h='385px'>
                            <canvas ref={canvasRef} width={imageDimension?.width} height={imageDimension?.height} style={{ width: '350px', height: '350px' }}>
                                Canvas is not supported. Please change your browser.
                            </canvas>
                        </Box>
                        <Box p='1em' bg={dropContainerColor} borderRadius='10px' mt='2em' w='385px' h='385px'>
                            <Textarea rows={15} value={curMetadata} readOnly />
                        </Box>
                    </Flex>
                    <Text textAlign='left' mt='2em' fontSize='14pt'>
                        Rendering Images ({renderIndex}/{collectionSize})
                    </Text>
                    <Text textAlign='left' fontSize='10pt'>
                        The generation progress of the NFT collection.
                    </Text>
                    <HStack w='full'>
                        <Progress flex='1' hasStripe value={Math.floor((renderIndex / collectionSize) * 100)} />
                        <Text fontSize='11pt'>
                            {((renderIndex / collectionSize) * 100).toFixed(2)} %
                        </Text>
                    </HStack>
                    {isDownloading && (
                        <>
                            <Text textAlign='left' mt='1em' fontSize='14pt'>
                                Auto Download
                            </Text>
                            <Text textAlign='left' fontSize='10pt'>
                                Collection size greater than 100 will auto download every 1000th render index.
                            </Text>
                            <HStack w='full'>
                                <Progress flex='1' hasStripe value={autoSavePercentage} colorScheme='red' />
                                <Text fontSize='11pt'>
                                    {autoSavePercentage.toFixed(2)} %
                                </Text>
                            </HStack>
                        </>
                    )}
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default GenerateModal