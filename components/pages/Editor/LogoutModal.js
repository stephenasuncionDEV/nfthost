import { forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Input } from '@chakra-ui/react'

const LogoutModal = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
        show() {
            onOpen();
        }
    }), [])

    const handleConfirm = () => {
        location.href='/console?page=dashboard';
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Session Ended</ModalHeader>
                <ModalBody>
                    Please return to NFT Host's console
                </ModalBody>
                <ModalFooter>
                    <Button ml='2' variant='solid' colorScheme='gray' onClick={handleConfirm}>
                        Go back to console
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(LogoutModal)