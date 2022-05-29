import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Text, HStack, Avatar, 
    Button, IconButton, Tag, Menu,
    MenuButton, MenuList, MenuItem,
    MenuItemOption, MenuGroup, MenuOptionGroup,
    MenuDivider, Image, Drawer, DrawerContent,
    TagRightIcon, TagLabel, Flex
} from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import { FaHeart, FaTiktok, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useNavbar } from '@/hooks/useNavbar'
import { MdOutlineContentCopy } from 'react-icons/md'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { useUser } from '@/providers/UserProvider'
import { useWeb3 } from '@/hooks/useWeb3'
import { useGenerator } from '@/providers/GeneratorProvider'

const Pagination = ({ children }) => {
    const { step, setStep } = useGenerator();

    return (
        <HStack alignItems='flex-end' spacing='5em'>
            {children[step]}
            <HStack>
                <Button 
                    bg='transparent' 
                    leftIcon={<AiOutlineArrowLeft />} 
                    fontWeight='bold' 
                    onClick={() => setStep(step - 1)}
                    size='sm'
                    disabled={step === 0}
                >
                    Previous
                </Button>
                <Text fontWeight='bold' color='rgba(0,0,0,0.1)'>
                    |
                </Text>
                <Button 
                    bg='transparent' 
                    rightIcon={<AiOutlineArrowRight />} 
                    fontWeight='bold' 
                    onClick={() => setStep(step + 1)}
                    size='sm'
                    disabled={step === 1}
                >
                    Next
                </Button>
            </HStack>
        </HStack>
    )
}

export default Pagination