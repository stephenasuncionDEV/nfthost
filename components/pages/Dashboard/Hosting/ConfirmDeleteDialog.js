import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button } from '@chakra-ui/react'

const ConfirmDeleteDialog = (props, ref) => {
    const { onDelete } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [websiteData, setWebsiteData] = useState({});

    useImperativeHandle(ref, () => ({
        show(data) {
            setWebsiteData(data);
            onOpen();
        }
    }), [])

    const handleConfirm = () => {
        onDelete(websiteData);
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Do you want to delete this website?
                </ModalBody>
                <ModalFooter>
                    <Button 
                        variant='solid' 
                        colorScheme='gray' 
                        borderWidth='1px' 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        ml='2' 
                        variant='solid' 
                        colorScheme='red' 
                        onClick={handleConfirm}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(ConfirmDeleteDialog)