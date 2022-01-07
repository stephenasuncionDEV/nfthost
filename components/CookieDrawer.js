import { forwardRef, useImperativeHandle } from "react"
import { useMoralis } from "react-moralis"
import { useDisclosure, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent } from '@chakra-ui/react'

const CookieDrawer = (props, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setUserData } = useMoralis();

    useImperativeHandle(ref, () => ({
        show() {
            onOpen();
        }
    }), [])

    const handleAccept = () => {
        setUserData({
            cookie: true
        })
        onClose();
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement='bottom'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Cookies</DrawerHeader>
                <DrawerBody>
                    This website uses cookies in order to offer you the most relavent information and to enhance the user experience. Please accept cookies for optimal performance.
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='solid' colorScheme='blue' onClick={handleAccept}>
                        Yes, I accept Cookies
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default forwardRef(CookieDrawer)