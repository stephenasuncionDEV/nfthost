import Head from 'next/head'
import NextLink from 'next/link'
import { Box, HStack, Text, Flex, Button, VStack, Avatar,
    SlideFade, Link, useColorModeValue, Input, Divider,
    Image
} from '@chakra-ui/react'
import { useLanding } from '@/hooks/useLanding'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useWeb3 } from '@/hooks/useWeb3'
import { useCore } from '@/providers/CoreProvider'
import { useUser } from '@/providers/UserProvider'
import { usePayment } from '@/hooks/usePayment'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceModal from '@/components/ServiceModal'
import CookieModal from '@/components/CookieModal'
import ConnectWalletTag from '@/components/ConnectWalletTag'
import CardInput from '@/components/CardInput'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { FiMail } from 'react-icons/fi'
import { FaWallet, FaEthereum } from 'react-icons/fa'
import { HiChevronRight } from 'react-icons/hi'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import config from '@/config/index'

const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const stripePromise = loadStripe(config.stripe.publicKey);

const Payment = () => {
    const { 
        paymentData, 
        paymentMethodStep, 
        setPaymentMethodStep,
        paymentName,
        setPaymentName,
        paymentEmail,
        setPaymentEmail,
        paymentAddress,
        setPaymentAddress,
        paymentCity,
        setPaymentCity,
        paymentState,
        setPaymentState,
        paymentZip,
        setPaymentZip,
        isPaying
    } = useCore();
    const { address } = useUser();
    const { PayWithCrypto } = usePayment();
    useReAuthenticate(true);

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
            <Flex minH='100vh' justifyContent='center' alignItems='center' py='4em'>
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
                                <Flex alignItems='flex-end'>
                                    <Text variant='content_title'>
                                        ${parseInt(paymentData?.price).toFixed(2)}
                                    </Text>
                                    <Text fontSize='8pt' ml='.5em'>
                                        USD
                                    </Text>
                                </Flex>
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
                                <Text>Product</Text>
                            </VStack>
                            <VStack spacing='.5em' alignItems='flex-start'>
                                <Text>{address}</Text>
                                <Text>{paymentData?.service}</Text>
                                <Text fontStyle='italic'>{paymentData?.product}</Text>
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
                        <HStack my='1em'>
                            <Button h='60px' w='120px' justifyContent='flex-start' onClick={() => setPaymentMethodStep('metamask')}>
                                <Flex flexDir='column' w='full'>
                                    <FaEthereum />
                                    <Text fontSize='10pt' textAlign='start'>
                                        Metamask
                                    </Text>
                                </Flex>
                            </Button>
                            <Button h='60px' w='120px' justifyContent='flex-start' onClick={() => setPaymentMethodStep('card')}>
                                <Flex flexDir='column' w='full'>
                                    <FaWallet />
                                    <Text fontSize='10pt' textAlign='start'>
                                        Card
                                    </Text>
                                </Flex>
                            </Button>
                        </HStack>
                        <Box mt='1em'>
                            {paymentMethodStep === 'metamask' && (
                                <Button w='full' bg='orange.500' onClick={PayWithCrypto}>
                                    Pay 0.014 ETH
                                </Button>
                            )}
                            {paymentMethodStep === 'card' && (
                                <VStack spacing='1em'>
                                    <VStack alignItems='flex-start' w='full'>
                                        <Text fontSize='10pt' mb='.25em'>
                                            Customer Information
                                        </Text>
                                        <Input placeholder='name' name='name' id='name' value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
                                        <Input type='email' placeholder='email' name='email' id='email' value={paymentEmail} onChange={(e) => setPaymentEmail(e.target.value)}/>
                                        <Input placeholder='address' name='address' id='address' value={paymentAddress} onChange={(e) => setPaymentAddress(e.target.value)}/>
                                        <HStack>
                                            <Input placeholder='city' name='city' id='city' value={paymentCity} onChange={(e) => setPaymentCity(e.target.value)}/>
                                            <Input placeholder='state' name='state' id='state' value={paymentState} onChange={(e) => setPaymentState(e.target.value)}/>
                                            <Input placeholder='zip' name='zip' id='zip' value={paymentZip} onChange={(e) => setPaymentZip(e.target.value)}/>
                                        </HStack>
                                    </VStack>
                                    <VStack alignItems='flex-start' w='full'>
                                        <Text fontSize='10pt' mb='.25em'>
                                            Card Information
                                        </Text>
                                        <Elements stripe={stripePromise}>
                                            <CardInput />
                                        </Elements>
                                    </VStack>
                                </VStack>
                            )}
                        </Box>
                    </Flex>
                    <HStack justifyContent='center' mt='2em' spacing='1em' opacity='.3'>
                        <Link href='/about/terms' color='white' isExternal>
                            <Text fontSize='10pt'>
                                Terms
                            </Text>
                        </Link>
                        <Link href='/about/privacy-policy' color='white' isExternal>
                            <Text fontSize='10pt'>
                                Privacy
                            </Text>
                        </Link>
                    </HStack>
                </Flex>
            </Flex>
        </main>
    )
}

export default Payment