import { Button, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, HStack, Text, VStack,
    Image, Tag, TagLabel, TagRightIcon, Flex, Box, Input, Wrap, InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { FaSave } from 'react-icons/fa'
import { MdPerson, MdOutlineContentCopy, MdDelete } from 'react-icons/md'
import { useCore } from '@/providers/CoreProvider'
import { useUser } from '@/providers/UserProvider'
import { useMemberControls } from '@/hooks/useMemberControls'
import { useCopy } from '@/hooks/useCopy' 
import Question from '@/components/Question'

const ProfileModal = () => {
    const { isProfileOpen, onProfileClose, setIsAreYouSureModal, setAreYouSureData } = useCore();
    const { user } = useUser();
    const { onCopy: onUserIdCopy } = useCopy({
        text: user?._id
    })
    const { onCopy: onAddressCopy } = useCopy({
        text: user?.address
    })
    const { onCopy: onWalletCopy } = useCopy({
        text: user?.wallet
    })
    const { onCopy: onEmailCopy } = useCopy({
        text: user?.email
    })
    const { deleteAccount, isDeleting } = useMemberControls();

    return (
        <Modal isOpen={isProfileOpen} onClose={onProfileClose} isCentered size='2xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack>
                        <Text>
                            User Profile
                        </Text>
                        <MdPerson />
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody as='flex' flexDir='column'>
                    <HStack w='full' spacing='2em' alignItems='flex-start'>
                        <Flex flexDir='column' maxW='120px' flex='1'>
                            <Flex borderRadius='5px' border='2px dashed rgb(200,200,200)' p='1em' justifyContent='center' alignItems='center' bg='rgba(200,200,200,.1)'>
                                <Image src={user?.picture} alt='User Picture' />
                            </Flex>
                        </Flex>
                        <Flex flexDir='column' flex='1'>
                            <HStack justifyContent='flex-end'>
                                <Text fontSize='8pt'>
                                    ID
                                </Text>
                                <Tag maxW='135px' size='sm'>
                                    <TagLabel>
                                        {user?._id}
                                    </TagLabel>
                                    <TagRightIcon color='gray.500' _hover={{ color: 'gray.600' }} onClick={onUserIdCopy} cursor='pointer'>
                                        <MdOutlineContentCopy fontSize='18pt' />
                                    </TagRightIcon>
                                </Tag>
                            </HStack>
                            <VStack mt='1em'>
                                <InputGroup>
                                    <Input value={user?.address} size='sm' readOnly disabled/>
                                    <InputRightElement width='3.25rem' alignItems='center' h='32px'>
                                        <Button size='xs' onClick={onAddressCopy} lineHeight='10pt'>
                                            COPY
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup>
                                    <Input value={user?.wallet} size='sm' readOnly disabled/>
                                    <InputRightElement width='3.25rem' alignItems='center' h='32px'>
                                        <Button size='xs' onClick={onWalletCopy} lineHeight='10pt'>
                                            COPY
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup>
                                    <Input value={user?.email} size='sm' readOnly disabled/>
                                    <InputRightElement width='3.25rem' alignItems='center' h='32px'>
                                        <Button size='xs' onClick={onEmailCopy} lineHeight='10pt'>
                                            COPY
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </VStack>
                            <Wrap spacing='2em' mt='1em' justify='center' overflow='visible'>
                                <VStack>
                                    <Question prompt='Number of premium generations you can use.' w='150px'>
                                        <Text fontSize='10pt' color='gray.500'>
                                            GENERATION UNITS
                                        </Text>
                                    </Question>
                                    <Text fontSize='10pt'>
                                        {user?.services?.generator?.units?.toString()}
                                    </Text>
                                </VStack>
                                <VStack>
                                    <Question prompt='Number of premium metadata utilities you can use.' w='150px'>
                                        <Text fontSize='10pt' color='gray.500'>
                                            UTILS UNITS
                                        </Text>
                                    </Question>
                                    <Text fontSize='10pt'>
                                        {user?.services?.utils?.units?.toString()}
                                    </Text>
                                </VStack>
                                <VStack>
                                    <Question prompt='Number of premium minting websites you can create.' w='150px'>
                                        <Text fontSize='10pt' color='gray.500'>
                                            WEBSITE UNITS
                                        </Text>
                                    </Question>
                                    <Text fontSize='10pt'>
                                        {user?.services?.website?.units === 1 ? 'Unlimited' : '0'}
                                    </Text>
                                </VStack>
                            </Wrap>
                        </Flex>
                    </HStack>
                </ModalBody>
                <ModalFooter justifyContent='space-between' mt='1em'>
                    <Button
                        variant='danger'
                        leftIcon={<MdDelete />}
                        onClick={() => {
                            setAreYouSureData({
                                item: 'user',
                                action: 'Delete',
                                button: 'danger',
                                callback: () => {
                                    deleteAccount();
                                }
                            })
                            setIsAreYouSureModal(true);
                        }}
                        disabled={isDeleting}
                        isLoading={isDeleting}
                        loadingText='Deleting'
                    >
                        Delete
                    </Button>
                    <HStack>
                        <Button size='sm' onClick={onProfileClose}>
                            Cancel
                        </Button>
                        <Button
                            variant='primary'
                            leftIcon={<FaSave />}
                            onClick={onProfileClose}
                        >
                            Done
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ProfileModal