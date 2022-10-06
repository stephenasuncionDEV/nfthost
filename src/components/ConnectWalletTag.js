import NextLink from 'next/link'
import { HStack, Menu, MenuButton, Tag,
    MenuList, MenuItem, useColorModeValue, TagLabel,
    TagRightIcon, MenuDivider, Text, Image, Avatar, VStack
} from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useMemberControls } from '@/hooks/useMemberControls'
import { useCopy } from '@/hooks/useCopy'
import { HiOutlineChevronDown, HiLogout } from 'react-icons/hi'
import { MdOutlineContentCopy, MdPayment } from 'react-icons/md'

const ConnectWalletTag = ({ isCopyAddress, isUserProfile, isPayments, ...styles }) => {
    const { address, isLoggedIn, user } = useUser();
    const { connect, logout } = useMemberControls();
    const { onCopy: onCopyAddress } = useCopy({
        text: address
    })

    const toolbarNavColor = useColorModeValue('rgba(0,0,0,.8)', 'white');
    const toolbarBorderColor = useColorModeValue('rgba(0,0,0,.1)', 'white');

    return (
        <Menu>
            <MenuButton as={Tag} borderWidth='1px' size='md' cursor='pointer' bg='transparent' borderColor={toolbarBorderColor} {...styles}>
                <HStack>
                    <Text as={TagLabel} noOfLines='1' maxW='200px' color={toolbarNavColor}>
                        {isLoggedIn ? address : 'Connect Your Wallet'}
                    </Text>
                    <TagRightIcon as={HiOutlineChevronDown} color={toolbarNavColor} />
                </HStack>
            </MenuButton>
            <MenuList>
                {isLoggedIn ? (
                    <>
                    {isUserProfile && (
                        <MenuItem>
                            <HStack alignItems='flex-start'>
                                <Avatar src={user?.picture} name={address} />
                                <VStack alignItems='flex-start' spacing='0'>
                                    <Text fontSize='10pt' noOfLines='1' maxW='150px'>
                                        {address}
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        {user?.services?.generator?.units || 0} Generation Units
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        {user?.services?.website?.units || 0} Website Units
                                    </Text>
                                    <Text fontSize='8pt' noOfLines='1'>
                                        {user?.services?.utils?.units || 0} Utils Units
                                    </Text>
                                </VStack>
                            </HStack>
                        </MenuItem>
                    )}
                    {isCopyAddress && (
                        <>
                            <MenuDivider />
                            <MenuItem icon={<MdOutlineContentCopy />} onClick={onCopyAddress}>Copy Address</MenuItem>
                        </>
                    )}
                    {isPayments && (
                        <NextLink href='/dashboard/payments' shallow passHref>
                            <MenuItem icon={<MdPayment />}>
                                Payments
                            </MenuItem>
                        </NextLink>
                    )}
                    {isUserProfile && <MenuDivider />}
                    <MenuItem icon={<HiLogout />} onClick={() => logout(false)}>Logout</MenuItem>
                    </>
                ) : (
                    <>
                    <MenuItem onClick={() => connect('metamask')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='/assets/metamask.png'
                            alt='MetaMask Wallet Logo'
                            mr='12px'
                        />
                        <span>Metamask</span>
                    </MenuItem>
                    <MenuItem onClick={() => connect('phantom')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='/assets/phantom.png'
                            alt='Phantom Wallet Logo'
                            mr='12px'
                        />
                        <span>Phantom</span>
                    </MenuItem>
                    <MenuItem onClick={() => connect('coinbase')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='/assets/coinbasewallet.png'
                            alt='Coinbase Wallet Logo'
                            mr='12px'
                        />
                        <span>Coinbase Wallet</span>
                    </MenuItem>
                    <MenuItem onClick={() => connect('walletconnect')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='/assets/walletconnect.svg'
                            alt='WalletConnect Logo'
                            mr='12px'
                        />
                        <span>WalletConnect</span>
                    </MenuItem>
                    </>
                )}
            </MenuList>
        </Menu>
    )
}

export default ConnectWalletTag