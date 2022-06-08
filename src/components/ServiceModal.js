import NextLink from 'next/link'
import { Box, HStack, 
    Text, Flex, Button, VStack, 
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton, Link 
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { GiGears } from 'react-icons/gi'
import { CgWebsite } from 'react-icons/cg'

const ServiceModal = () => {
    const { isServiceModal, setIsServiceModal } = useCore();

    return (
        <Modal isOpen={isServiceModal} onClose={() => setIsServiceModal(false)} isCentered size='lg'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose a service</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Choose a service you want to use:
                    </Text>
                    <HStack mt='2em' justifyContent='center' flexWrap='wrap'>
                        <Box>
                            <NextLink href='/service/generator' shallow passHref>
                                <Button h='120px' onClick={() => setIsServiceModal(false)}>
                                    <Flex flexDir='column' spacing='0' alignItems='center'>
                                        <GiGears fontSize='20pt' />
                                        <Text mt='.25em'>
                                            NFT Collection
                                        </Text>
                                        <Text>
                                            Generator
                                        </Text>
                                    </Flex>
                                </Button>
                            </NextLink>
                        </Box>
                        <Box>
                            <NextLink href='/service/website' shallow passHref>
                                <Button h='120px' onClick={() => setIsServiceModal(false)}>
                                    <Flex flexDir='column' spacing='0' alignItems='center'>
                                        <CgWebsite fontSize='20pt' />
                                        <Text mt='.25em'>
                                            Mint Website
                                        </Text>
                                        <Text>
                                            Hosting
                                        </Text>
                                    </Flex>
                                </Button>
                            </NextLink>
                        </Box>
                    </HStack>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <Text fontSize='10pt' textAlign='center'>
                        By using one of our services you agree to our <Link href='/about/terms' isExternal><Text as='span' variant='link'>Terms of Service</Text></Link> and <Link href='/about/privacy-policy' isExternal><Text as='span' variant='link'>Privacy Policy</Text></Link>.
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ServiceModal