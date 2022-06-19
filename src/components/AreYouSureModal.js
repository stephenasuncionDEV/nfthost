import {  Button,Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, HStack
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaTrash } from 'react-icons/fa'

const AreYouSureModal = () => {
    const { isAreYouSureModal, setIsAreYouSureModal, areYouSureData } = useCore();

    return (
        <Modal isOpen={isAreYouSureModal} onClose={() => setIsAreYouSureModal(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    This action cannot be undone. Click delete if you want to {areYouSureData?.action?.toLowerCase()} this {areYouSureData?.item}.
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button size='sm' onClick={() => setIsAreYouSureModal(false)}>
                            Cancel
                        </Button>
                        <Button size='sm' onClick={() => {
                            {areYouSureData?.callback()}
                            setIsAreYouSureModal(false);
                        }} variant='danger' leftIcon={<FaTrash />}>
                            {areYouSureData?.action}
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AreYouSureModal