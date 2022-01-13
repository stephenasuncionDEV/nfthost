import { Box, Text, Image, Button, HStack, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { FaHeart, FaTiktok, FaDiscord, FaGithub } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { useRouter } from 'next/router'
import style from '../../../styles/Main.module.scss'

const MenuBar = () => {
    const router = useRouter();

    const handleTiktok = () => {
        window.open("https://www.tiktok.com/@nfthostofficial");
    }

    const handleDiscord = () => {
        window.open("https://discord.gg/BMZZXZMnmv");
    }

    const handleGithub = () => {
        window.open("https://github.com/stephenasuncionDEV/nfthost");
    }

    const handleConsole = () => {
        router.push('/console');
    }

    const handleSponsor = () => {
        window.open("https://www.buymeacoffee.com/stephenasuncion");
    }

    const handleFeatures = () => {
        router.push("/#features");
    }

    const handlePricing = () => {
        router.push("/#pricing");
    }

    return (
        <Box 
            p='1em'
            px='3em'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            bg='white'
            width='full'
            position='fixed'
            zIndex='2147483647'
            className={style.menuBar}
        >
            <Link 
                href='/' 
                className={style.logo} 
                _hover={{ textDecoration: "none" }}
            >
                <Box
                    display='flex'
                    alignItems='center'
                >
                    <Image 
                        src='/logo.png' 
                        alt='NFT Host Logo' 
                        boxSize='60px'
                        objectFit='scale-down'
                    />
                    <Text
                        ml='4'
                        fontSize='24pt'
                        fontWeight='500'
                        fontFamily='sans-serif'
                        className={style.logoTitle}
                    >
                        NFT Host
                    </Text>
                </Box>
            </Link>
            <HStack spacing='2em'>
                <Box className={style.menuButtons}>
                <HStack>
                    <HStack>
                        <Button 
                            variant='solid'
                            bg='white'
                            onClick={handleFeatures}
                        >
                            Features
                        </Button>
                        <Button 
                            variant='solid' 
                            bg='white'
                            onClick={handlePricing}
                        >
                            Pricing
                        </Button>
                    </HStack>
                    <HStack>
                        <IconButton 
                            aria-label='NFT Host Tiktok'
                            icon={<FaTiktok />}
                            borderRadius='50%'
                            size='sm'
                            onClick={handleTiktok}
                        />
                        <IconButton 
                            aria-label='NFT Host Discord'
                            icon={<FaDiscord />}
                            borderRadius='50%'
                            size='sm'
                            onClick={handleDiscord}
                        />
                        <IconButton 
                            aria-label='NFT Host Github'
                            icon={<FaGithub />}
                            borderRadius='50%'
                            size='sm'
                            onClick={handleGithub}
                        />
                    </HStack>
                </HStack>
                </Box>
                <HStack>
                    <Box className={style.menuButtons}>
                        <HStack>
                            <Button 
                                variant='solid'
                                bg='black'
                                color='white'
                                _hover={{
                                    bg: 'rgb(50,50,50)'
                                }}
                                onClick={handleConsole}
                            >
                                Go to console
                            </Button>
                            <Button 
                                variant='outline'
                                leftIcon={<FaHeart color='rgb(229,62,62)'/>}
                                onClick={handleSponsor}
                            >
                                Sponsor Me
                            </Button>
                        </HStack>
                    </Box>
                    <Box className={style.menuToggle}>
                        <Menu>
                            <MenuButton 
                                as={IconButton} 
                                icon={<HiMenu />} 
                            />
                            <MenuList>
                                <MenuItem onClick={handleFeatures}>Features ✨</MenuItem>
                                <MenuItem onClick={handlePricing}>Pricing 💲</MenuItem>
                                <MenuItem onClick={handleConsole}>Console 💻</MenuItem>
                                <MenuItem onClick={handleSponsor}>Support Me 👨‍💻</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </HStack>
            </HStack>
        </Box>
    )
}

export default MenuBar