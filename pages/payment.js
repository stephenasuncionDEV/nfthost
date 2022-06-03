import Head from 'next/head'
import NextLink from 'next/link'
import { HStack, Text, Flex, Button, VStack, Avatar,
    SlideFade, Link, useColorModeValue, Input, Divider,
    Image
} from '@chakra-ui/react'
import { useLanding } from '@/hooks/useLanding'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceModal from '@/components/ServiceModal'
import CookieModal from '@/components/CookieModal'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FiMail } from 'react-icons/fi'
import { HiChevronRight } from 'react-icons/hi'
import { useCore } from '@/providers/CoreProvider'

const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

const Payment = () => {
    const { paymentData } = useCore();

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');

    return (
        <main>
            <Head>
                <title>Payment | NFT Host</title>
                <meta name="title" content='NFT Host' />
                <meta name="description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta name="keywords" content='NFT Host, Host NFT, Mint Website, Mint NFT Website Hosting, Mint NFT, NFT, Mint, Crypto Currency, Crypto, Ethereum' />
                <meta name="robots" content='index, follow' />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content='en' />

                <meta property="og:type" content='website' />
                <meta property="og:url" content='https://www.nfthost.app/' />
                <meta property="og:title" content='NFT Host' />
                <meta property="og:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="og:image" content='https://www.nfthost.app/assets/logo.png' />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content='https://www.nfthost.app/' />
                <meta property="twitter:title" content='NFT Host' />
                <meta property="twitter:description" content='NFT Host is a website where you can generate NFT collections and create NFT minting website.' />
                <meta property="twitter:image" content='https://www.nfthost.app/assets/logo.png' />
            </Head>
            <Flex minH='100vh' justifyContent='center' alignItems='center'>
                <Flex flexDir='column'>
                    <NextLink href='/' shallow passHref>
                        <HStack spacing='1em' cursor='pointer'>
                            <Avatar 
                                size='md'
                                src='/assets/logo.png' 
                                name='NFT Host Logo' 
                                bg='transparent'
                            />
                            <Text fontWeight='bold' fontSize='14pt'>
                                NFT Host
                            </Text>
                        </HStack>
                    </NextLink>
                    <Flex flexDir='column' p='2em' mt='1.5em' bg={containerColor} borderRadius='10px' minW='470px'>
                        <Flex justifyContent='space-between'>
                            <Flex flexDir='column'>
                                <Text variant='content_title'>
                                    ${paymentData?.price}
                                </Text>
                                <Text fontSize='10pt' mt='.75em' opacity='.6'>
                                    Due {`${month[paymentData?.due.getMonth()]} ${paymentData?.due.getDate()}, ${paymentData?.due.getFullYear()}`}
                                </Text>
                            </Flex>
                            <Image src='/assets/payment-logo.png' alt='Payment Logo' w='80px' opacity='.6' />
                        </Flex>
                        <HStack fontSize='10pt' mt='2em'>
                            <VStack spacing='.5em' alignItems='flex-start' opacity='.6'>
                                <Text>Address</Text>
                                <Text>Service</Text>
                            </VStack>
                            <VStack spacing='.5em' alignItems='flex-start'>
                                <Text>0x8C866ac477EE770bDCe228E1B5DE92BCCf365D06</Text>
                                <Text>{paymentData?.service}</Text>
                            </VStack>
                        </HStack>
                        <Divider mt='2em' />
                        <Button size='sm' bg='transparent' rightIcon={<HiChevronRight />} mt='1em'>
                            View invoice details
                        </Button>
                    </Flex>
                    <Flex flexDir='column' p='2em' mt='1em' bg={containerColor} borderRadius='10px'>
                        <Text>
                            Select a payment method
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </main>
    )
}

export default Payment