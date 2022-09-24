import { useEffect } from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { useWebsiteControls } from '@/hooks/services/website/useWebsiteControls'
import CreateWebsiteModal from './CreateWebsiteModal'
import AreYouSureModal from '@/components/AreYouSureModal'
import List from './List'
import Settings from './Settings'

const Website = () => {
    const { isLoggedIn } = useUser();
    const { editingWebsite } = useWebsite();
    const { getWebsites } = useWebsiteControls();
    const { isOpen: isCreateWebsiteOpen, onClose: onCreateWebsiteClose, onOpen: onCreateWebsiteOpen } = useDisclosure();

    useEffect(() => {
        if (!isLoggedIn) return;
        getWebsites();
    },[isLoggedIn])

    return (
        <Flex flexDir='column' spacing='2em'>
            <AreYouSureModal />
            <CreateWebsiteModal 
                isOpen={isCreateWebsiteOpen}
                onClose={onCreateWebsiteClose}
            />
            <List 
                onCreateWebsiteOpen={onCreateWebsiteOpen} 
            />
            {editingWebsite && <Settings />}
        </Flex>
    )
}

export default Website