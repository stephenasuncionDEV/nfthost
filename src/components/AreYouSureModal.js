import {  Button,Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, HStack, Text, VStack
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaTrash } from 'react-icons/fa'
import { AiOutlineWarning } from 'react-icons/ai'

const AreYouSureModal = () => {
    const { isAreYouSureModal, setIsAreYouSureModal, areYouSureData } = useCore();

    return (
        <Modal isOpen={isAreYouSureModal} onClose={() => setIsAreYouSureModal(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack p='1em' px='2em'>
                        <AiOutlineWarning fontSize='28pt' />
                        <Text fontSize='10pt'>
                            This action cannot be undone. Click {areYouSureData?.action} if you want to {areYouSureData?.action?.toLowerCase()} this {areYouSureData?.item}.
                        </Text>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button size='sm' onClick={() => setIsAreYouSureModal(false)}>
                            Cancel
                        </Button>
                        <Button size='sm' onClick={() => {
                            {areYouSureData?.callback()}
                            setIsAreYouSureModal(false);
                        }} variant={areYouSureData?.button || 'danger'} leftIcon={<FaTrash />}>
                            {areYouSureData?.action}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AreYouSureModal