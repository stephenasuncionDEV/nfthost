import { HStack, Menu, MenuButton, Tag,
    MenuList, MenuItem, useColorModeValue, TagLabel,
    TagRightIcon, MenuDivider, Text, Image
} from '@chakra-ui/react'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useNavbar } from '@/hooks/useNavbar'
import { HiOutlineChevronDown, HiLogout } from 'react-icons/hi'
import { MdOutlineContentCopy } from 'react-icons/md'

const ConnectWalletTag = ({ isCopyAddress }) => {
    const { address, isLoggedIn } = useUser();
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
                    {isCopyAddress && (
                        <>
                        <MenuItem icon={<MdOutlineContentCopy />} onClick={CopyAddress}>Copy Address</MenuItem>
                        <MenuDivider />
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
                            src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png'
                            alt='Metamask Wallet Logo from wikimedia.org'
                            mr='12px'
                        />
                        <span>Metamask</span>
                    </MenuItem>
                    <MenuItem onClick={() => Connect('phantom')}>
                        <Image
                            boxSize='2rem'
                            borderRadius='full'
                            src='https://www.yadawallets.com/wp-content/uploads/2021/06/Phantom-wallet-logo.png'
                            alt='Phantom Wallet Logo from yadawallets.org'
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