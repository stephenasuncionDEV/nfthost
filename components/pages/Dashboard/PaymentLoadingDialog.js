import { useState, forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Skeleton, Text } from '@chakra-ui/react'

const PaymentDialog = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [paymentInfo, setPaymentInfo] = useState("");

    useImperativeHandle(ref, () => ({
        show(data) {  
            setPaymentInfo(data);
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
                <ModalHeader>{paymentInfo.title}</ModalHeader>
                <ModalBody>
                    <Text mb='2'>Please do not refresh this page</Text>
                    <Skeleton startColor='pink.500' endColor='orange.500' height='15px' />
                </ModalBody>
                <ModalFooter>
                    <Text>{paymentInfo.footer}</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(PaymentDialog)