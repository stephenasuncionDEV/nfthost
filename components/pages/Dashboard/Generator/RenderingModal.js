import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Skeleton, Text } from '@chakra-ui/react'

const RenderingModal = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
        show() {  
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
                <ModalHeader>Rendering...</ModalHeader>
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

export default forwardRef(RenderingModal)