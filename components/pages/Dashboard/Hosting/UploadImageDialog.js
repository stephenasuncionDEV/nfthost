import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Input } from '@chakra-ui/react'

const UploadImageDialog = (props, ref) => {
    const { hostImage, setHostImage } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageURL, setImageURL] = useState(hostImage);

    useEffect(() => {
        if (hostImage == null) return;
        setImageURL(hostImage)
    }, [hostImage])

    useImperativeHandle(ref, () => ({
        show() {
            onOpen();
        }
    }), [])

    const handleSetImage = () => {
        setHostImage(imageURL);
        onClose();
    };

    const handleImageURLChange = (e) => {
        setImageURL(e.target.value);
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload an Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input variant='outline' placeholder='Image URL' value={imageURL} onChange={handleImageURLChange}/>
                </ModalBody>
                <ModalFooter>
                    <Button variant='solid' colorScheme='gray' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button ml='2' variant='solid' colorScheme='blue' onClick={handleSetImage}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(UploadImageDialog)