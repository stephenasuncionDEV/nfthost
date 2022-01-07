import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Input } from '@chakra-ui/react'

const ConfirmationDialog = (props, ref) => {
    const { onConfirm } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dialogData, setDialogData] = useState({});

    useImperativeHandle(ref, () => ({
        show(data) {
            setDialogData(data);
            onOpen();
        }
    }), [])

    const handleConfirm = () => {
        if (dialogData.data != null) {
            onConfirm(dialogData.data);
        } else {
            onConfirm();
        }
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {dialogData.description}
                </ModalBody>
                <ModalFooter>
                    <Button variant='solid' colorScheme='gray' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button ml='2' variant='solid' colorScheme={dialogData.buttonColor} onClick={handleConfirm}>
                        {dialogData.button}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(ConfirmationDialog)