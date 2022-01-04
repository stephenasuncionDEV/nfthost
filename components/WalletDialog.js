import { forwardRef, useImperativeHandle } from "react"
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, List, ListItem, Button, Box } from '@chakra-ui/react'
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

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Connect to a wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box w='100%' p={4} color='black' border='1px' borderColor='gray.200' borderRadius='5px' mb={4}>
                        By connecting to a wallet, you agree to NFT Host's Terms of Service and you have read and understand NFT Host's Disclaimer.
                    </Box>
                    <List>
                        {walletList.map((wallet, idx) => (
                            <ListItem key={idx}>
                                <Button variant='solid' rightIcon={<MetamaskIcon size={24}/>} colorScheme='blue' isFullWidth onClick={() => onChange(idx)}>               
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