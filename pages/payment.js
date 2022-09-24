import NextLink from 'next/link'
import { Box, HStack, Text, Flex, Button, VStack, Link, 
    useColorModeValue, Input, Divider, Image, Wrap, useColorMode
} from '@chakra-ui/react'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { useCore } from '@/providers/CoreProvider'
import { useUser } from '@/providers/UserProvider'
import { usePayment } from '@/hooks/usePayment'
import Meta from '@/components/Meta'
import CardInput from '@/components/CardInput'
import KeepWorkingModal from '@/components/KeepWorkingModal'
import { AiOutlineArrowLeft, AiOutlineWarning } from 'react-icons/ai'
import { FaWallet, FaEthereum } from 'react-icons/fa'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import config from '@/config/index'
import { getCurrencyFromWallet, getPriceFromService } from '@/utils/tools'
import { webColor } from '@/theme/index'

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
    const { address, wallet } = useUser();
    const { PayWithCrypto } = usePayment();
    const { colorMode } = useColorMode();
    const cryptoCurrency = getCurrencyFromWallet(wallet || 'metamask');
    const cryptoPrice = getPriceFromService(paymentData?.service?.toLowerCase() || 'generator', cryptoCurrency || 'eth');
    useReAuthenticate(true);

    const containerColor = useColorModeValue('whiteAlpha.500', 'blackAlpha.500');
    const buttonDefaultColor = useColorModeValue('gray.100', 'whiteAlpha.200');

    return (
        <main>
            <Meta title='Payment | NFT Host' />
            <KeepWorkingModal />
            <Flex minH='100vh' justifyContent='center' alignItems='center' py='4em'>
                {paymentData ? (
                    <Flex flexDir='column'>
                        <Flex justifyContent='space-between' alignItems='center'>
                            <NextLink href='/' shallow passHref>
                                <HStack spacing='1em' cursor='pointer'>
                                    <Image src={colorMode === 'dark' ? '/assets/logo_full_white.png' : '/assets/logo_full_black.png'} alt='NFT Host Logo' width='170px' />
                                </HStack>
                            </NextLink>
                            <NextLink href={paymentData?.redirect?.origin} shallow passHref>
                                <Button bg='transparent' leftIcon={<AiOutlineArrowLeft />} size='sm'>
                                    Go back to {paymentData?.redirect?.title}
                                </Button>
                            </NextLink>
                        </Flex>
                        <Flex flexDir='column' p='2em' mt='1.5em' bg={containerColor} borderRadius='10px' minW='470px'>
                            <Flex justifyContent='space-between'>
                                <Flex flexDir='column'>
                                    <Flex alignItems='flex-end'>
                                        <Text variant='content_title'>
                                            ${paymentData?.price?.toFixed(2)}
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
                        </Flex>
                        <Flex flexDir='column' p='2em' mt='1em' bg={containerColor} borderRadius='10px'>
                            <Text>
                                Select a payment method
                            </Text>
                            <Wrap my='1em' spacing='.5em'>
                                <Button 
                                    h='60px' 
                                    minW='120px' 
                                    justifyContent='flex-start' 
                                    onClick={() => setPaymentMethodStep('cryptowallet')}
                                    borderColor={paymentMethodStep === 'cryptowallet' ? 'rgb(52,140,212)' : buttonDefaultColor}
                                    borderBottomWidth='3px'
                                >
                                    <Flex flexDir='column' w='full'>
                                        <FaEthereum />
                                        <Text fontSize='10pt' textAlign='start'>
                                            Crypto Wallet
                                        </Text>
                                    </Flex>
                                </Button>
                                <Button 
                                    h='60px' 
                                    minW='120px' 
                                    justifyContent='flex-start' 
                                    onClick={() => setPaymentMethodStep('bankcard')}
                                    borderColor={paymentMethodStep === 'bankcard' ? 'rgb(52,140,212)' : buttonDefaultColor}
                                    borderBottomWidth='3px'
                                >
                                    <Flex flexDir='column' w='full'>
                                        <FaWallet />
                                        <Text fontSize='10pt' textAlign='start'>
                                            Bank Card
                                        </Text>
                                    </Flex>
                                </Button>
                            </Wrap>
                            <Box mt='1em'>
                                {(paymentMethodStep === 'cryptowallet') && (
                                    <Button 
                                        w='full' 
                                        variant='primary' 
                                        onClick={PayWithCrypto} 
                                        isLoading={isPaying} 
                                        loadingText='Paying' 
                                    >
                                        Pay&nbsp;
                                        {cryptoPrice}&nbsp;
                                        {cryptoCurrency?.toUpperCase()}
                                    </Button>
                                )}
                                {paymentMethodStep === 'bankcard' && (
                                    <VStack spacing='1em'>
                                        <VStack alignItems='flex-start' w='full'>
                                            <Text fontSize='10pt' mb='.25em'>
                                                Customer Information
                                            </Text>
                                            <Input placeholder='Name' name='name' id='name' value={paymentName} onChange={(e) => setPaymentName(e.target.value)} />
                                            <Input placeholder='Email' type='email' name='email' id='email' value={paymentEmail} onChange={(e) => setPaymentEmail(e.target.value)}/>
                                            <Input placeholder='Billing Address' name='address' id='address' value={paymentAddress} onChange={(e) => setPaymentAddress(e.target.value)}/>
                                            <HStack>
                                                <Input placeholder='City' name='city' id='city' value={paymentCity} onChange={(e) => setPaymentCity(e.target.value)}/>
                                                <Input placeholder='State' name='state' id='state' value={paymentState} onChange={(e) => setPaymentState(e.target.value)}/>
                                                <Input placeholder='Zip/Postal code' name='zip' id='zip' value={paymentZip} onChange={(e) => setPaymentZip(e.target.value)}/>
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
                ) : (
                    <Flex flexDir='column' justifyContent='center' alignItems='center' w='full' flex='1' mb='4em'>
                        <AiOutlineWarning fontSize='28pt' />
                        <Flex flexDir='column' alignItems='center' mt='.5em'>
                            <Text fontWeight='bold' fontSize='10pt'>
                                Error
                            </Text>
                            <Text fontSize='10pt' mb='1em'>
                                Something wrong occured.
                            </Text>
                            <NextLink href='/dashboard/getStarted' passHref shallow>
                                <Button leftIcon={<AiOutlineArrowLeft />} size='sm' variant='primary'>
                                    Go back to dashboard
                                </Button>
                            </NextLink>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </main>
    )
}

export default Payment