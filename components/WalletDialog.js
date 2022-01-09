import { forwardRef, useImperativeHandle } from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, List, ListItem, Button } from '@chakra-ui/react'
import MetamaskIcon from "./icons/MetamaskIcon"

const walletList = [{name: "Metamask", icon: 0}];

const WalletDialog = (props, ref) => {
    const { onChange } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    useImperativeHandle(ref, () => ({
        show() {
            onOpen();
        }
    }), [])

    const handleChoose = (index) => {
        onChange(index);
        onClose();
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Connect to a wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <List>
                        {walletList.map((wallet, idx) => (
                            <ListItem key={idx}>
                                <Button variant='solid' rightIcon={<MetamaskIcon size={24}/>} colorScheme='blue' isFullWidth onClick={() => handleChoose(idx)}>               
                                    {wallet.name}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(WalletDialog);