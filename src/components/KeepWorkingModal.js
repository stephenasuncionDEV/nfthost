import NextLink from 'next/link'
import { Text, Flex, Button,
    Modal, ModalOverlay, Image,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton, Link
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const KeepWorkingModal = () => {
    const { isKeepWorkingModal, setIsKeepWorkingModal, paymentData } = useCore();

    return (
        <Modal isOpen={isKeepWorkingModal} onClose={() => setIsKeepWorkingModal(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Keep working...</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex flexDir='column' justifyContent='center' alignItems='center'>
                        <Image src='/assets/worker.png' alt='Worker' w='100px' />
                        <Text mt='.5em'>
                            Looks like you're still working on the {paymentData?.redirect?.title}
                        </Text>
                        <Text fontSize='8pt' opacity='.8'>
                            If you want to keep working on your&nbsp;
                            {paymentData?.service === 'Generator' && 'nft collection'}
                            &nbsp;{paymentData?.service === 'Website' && 'mint website'}
                            &nbsp;press the button below:
                        </Text>
                    </Flex>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    {paymentData?.service === 'Website' ? (
                        <Link href={paymentData?.redirect?.origin}>
                            <Button leftIcon={<AiOutlineArrowLeft />} size='sm' onClick={() => setIsKeepWorkingModal(false)}>
                                Go back to {paymentData?.redirect?.title}
                            </Button>
                        </Link>
                    ) : (
                        <NextLink href={paymentData?.redirect?.origin} shallow passHref>
                            <Button leftIcon={<AiOutlineArrowLeft />} size='sm' onClick={() => setIsKeepWorkingModal(false)}>
                                Go back to {paymentData?.redirect?.title}
                            </Button>
                        </NextLink>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default KeepWorkingModal