import { Box, HStack, Menu, MenuButton, Tag,
    MenuList, MenuItem, useColorModeValue, TagLabel,
    TagRightIcon, MenuDivider, Text, Image, Avatar, VStack
} from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useNavbar } from '@/hooks/useNavbar'
import { HiOutlineChevronDown, HiLogout } from 'react-icons/hi'
import { MdOutlineContentCopy } from 'react-icons/md'

const ConnectWalletTag = ({ isCopyAddress, isUserProfile }) => {
    const { address, isLoggedIn, user } = useUser();
    const { CopyAddress } = useNavbar();
    const { Connect, Logout } = useWeb3();

    const tagBGColor = useColorModeValue('gray.100', 'transparent');

    return (
        <Menu>
            <MenuButton as={Tag} borderWidth='1px' size='md' cursor='pointer' bg={tagBGColor}>
                <HStack>
                    <Text as={TagLabel} noOfLines='1'>
                        {isLoggedIn ? address : 'Connect Your Wallet'}
                    </Text>
                    <TagRightIcon as={HiOutlineChevronDown} />
                </HStack>
            </MenuButton>
            <MenuList>
                {isLoggedIn ? (
                    <>
                    {isUserProfile && (
                        <MenuItem>
                            <HStack>
                                <Avatar src={user?.picture} name={address} />
                                <VStack alignItems='flex-start' spacing='0'>
                                    <Text fontSize='10pt' noOfLines='1' maxW='150px'>
                                        {address}
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        {user?.services?.generator?.freeGeneration} Generation Available
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        {user?.services?.generator?.generationCount} Generations
                                    </Text>
                                </VStack>
                            </HStack>
                        </MenuItem>
                    )}
                    {isCopyAddress && (
                        <>
                        {isUserProfile && <MenuDivider />}
                        <MenuItem icon={<MdOutlineContentCopy />} onClick={CopyAddress}>Copy Address</MenuItem>
                        </>
                    )}
                    <MenuItem icon={<HiLogout />} onClick={Logout}>Logout</MenuItem>
                    </>
                ) : (
                    <>
                    <MenuItem onClick={() => Connect('metamask')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='/assets/metamask.png'
                            alt='Metamask Wallet Logo'
                            mr='12px'
                        />
                        <span>Metamask</span>
                    </MenuItem>
                    <MenuItem onClick={() => Connect('phantom')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='/assets/phantom.png'
                            alt='Phantom Wallet Logo'
                            mr='12px'
                        />
                        <span>Phantom</span>
                    </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    )
}

export default ConnectWalletTag