import {  Button,Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, HStack, Text, VStack, Input,
    FormControl, FormHelperText, InputGroup, InputLeftElement 
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { useAddonSettings } from '@/hooks/useAddonSettings'
import { MdSave } from 'react-icons/md'
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaReddit, FaFacebook } from 'react-icons/fa'

const AddonSettingsModal = () => {
    const { isAddonSettingsModal, setIsAddonSettingsModal, addonSettingsData } = useCore();
    const { 
        twitter,
        setTwitter,
        discord,
        setDiscord,
        instagram,
        setInstagram,
        facebook, 
        setFacebook,
        youtube,
        setYoutube,
        reddit,
        setReddit,
        tiktok,
        setTiktok
    } = useAddonSettings();
    return (
        <Modal isOpen={isAddonSettingsModal} onClose={() => setIsAddonSettingsModal(false)} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Addon Settings &#40;{addonSettingsData?.item}&#41;</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack p='1em' px='1em'>
                        {{
                            socials: (
                                <VStack w='full'>
                                    <FormControl flex='1'>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaTwitter color='gray.300' />} />
                                            <Input id='twitter' name='twitter' placeholder='Twitter Link' value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Facebook</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaDiscord color='gray.300' />} />
                                            <Input id='discord' name='discord' placeholder='Discord Link' value={discord} onChange={(e) => setDiscord(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Discord</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaInstagram color='gray.300' />} />
                                            <Input id='instagram' name='instagram' placeholder='Instagram Link' value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Instagram</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaFacebook color='gray.300' />} />
                                            <Input id='facebook' name='facebook' placeholder='Facebook Link' value={facebook} onChange={(e) => setTwitter(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Facebook</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaYoutube color='gray.300' />} />
                                            <Input id='youtube' name='youtube' placeholder='Youtube Link' value={youtube} onChange={(e) => setYoutube(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Youtube</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaReddit color='gray.300' />} />
                                            <Input id='reddit' name='reddit' placeholder='Reddit Link' value={reddit} onChange={(e) => setReddit(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Reddit</FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none' children={<FaTiktok color='gray.300' />} />
                                            <Input id='tiktok' name='tiktok' placeholder='Tiktok Link' value={tiktok} onChange={(e) => setTiktok(e.target.value)} />
                                        </InputGroup>
                                        <FormHelperText fontSize='9pt'>External link of your NFT collection's Tiktok</FormHelperText>
                                    </FormControl>
                                </VStack>
                            )
                        }[addonSettingsData?.item]}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button size='sm' onClick={() => setIsAddonSettingsModal(false)}>
                            Cancel
                        </Button>
                        <Button size='sm' onClick={() => {
                            {addonSettingsData?.callback()}
                            setIsAreYouSureModal(false);
                        }} variant='primary' leftIcon={<MdSave />}>
                            Save
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddonSettingsModal