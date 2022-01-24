import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Skeleton, Text } from '@chakra-ui/react'

const ScreenLockModal = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ title, setTitle ] = useState('');

    useImperativeHandle(ref, () => ({
        show(title = 'Rendering...') {  
            setTitle(title);
            onOpen();
        },
        hide() {
            onClose();
        }
    }), [])

    return (
        <Modal isCentered isOpen={isOpen} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <Text mb='2'>Please do not refresh this page</Text>
                    <Skeleton startColor='blue.500' endColor='green.500' height='15px' />
                </ModalBody>
                <ModalFooter>
                    <Text>Powered by NFT Host</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(ScreenLockModal)