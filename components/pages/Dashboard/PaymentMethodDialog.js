import { forwardRef, useImperativeHandle } from "react";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, List, ListItem, Text, HStack } from '@chakra-ui/react'
import { GrStripe } from "react-icons/gr"
import MetamaskIcon from "../../icons/MetamaskIcon"

const methodList = [
    {name: "Metamask", icon: 0},
    {name: "Stripe", icon: 1}
];

const PaymentMethodDialog = (props, ref) => {
    const { onChange } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    useImperativeHandle(ref, () => ({
        show() {
            onOpen();
        }
    }), [])

    const handleSubmit = (methodName) => {
        onChange(methodName);
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose a Payment Method</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <List>
                        {methodList.map((method, idx) => (
                            <ListItem 
                                key={idx} 
                                bg='black' 
                                color='white'
                                mt='2' 
                                p='2'
                                borderRadius='10px'
                                _hover={{
                                    bg: 'rgb(50,50,50)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleSubmit(method.name.toLowerCase())}
                            >
                                <HStack justifyContent='center'>
                                    {method.icon === 0 && <MetamaskIcon size={24}/>}
                                    {method.icon === 1 && <GrStripe size={24}/>}
                                    <Text>{method.name}</Text>
                                </HStack>
                            </ListItem>
                        ))}
                    </List>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(PaymentMethodDialog)