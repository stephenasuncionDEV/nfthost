import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Input } from '@chakra-ui/react'

const ImageDialog = (props, ref) => {
    const { onDeleteItem } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageIndex, setImageIndex] = useState(null);

    useImperativeHandle(ref, () => ({
        show(index) {
            setImageIndex(index);
            onOpen();
        }
    }), [])

    const handleDelete = () => {
        onDeleteItem(imageIndex);
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Would you like to delete this image?
                </ModalBody>
                <ModalFooter>
                    <Button variant='solid' colorScheme='gray' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button ml='2' variant='solid' colorScheme='red' onClick={handleDelete}>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(ImageDialog)