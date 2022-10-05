import { useState } from 'react'
import { Text, Flex, VStack, Image, HStack, Heading, Wrap } from '@chakra-ui/react'
import { useMediaQuery } from 'react-responsive'

const Features = () => {
    const [featureImage, setFeatureImage] = useState('/assets/generator-mockup.png');
    const isCollapse = useMediaQuery({ query: '(max-width: 980px)' });
    const isHideOrbit = useMediaQuery({ query: '(max-width: 400px)' });
    
    return (
        <Flex
            id='features'
            as='section'
            flexDir='column'
            minH='90vh'
            bg='url(/assets/landing-bg-2.png) no-repeat center'
            bgSize='cover'
            alignItems='center'
            p='2em'
            overflow='hidden'
        >
            <HStack position='relative'>
                <Heading as='h2' className='gradientPurple' fontSize='32pt'>
                    No-Code Tools
                </Heading>
                <Image 
                    position='absolute'
                    left='105%'
                    src='/assets/landing-effect-4.png' 
                    alt='Landing Effect - Bar' 
                />
            </HStack>
            <Text fontSize='18pt' mt='.75em'>
                Powerful tools that will ensure your NFTs success.
            </Text>
            <Image src='/assets/landing-effect-5.png' alt='Landing Effect - Arc' my='1.5em' />
            <Flex w='full' justifyContent={!isCollapse ? 'space-between' : 'center'}>
                <VStack spacing='1.5em' flex='1' alignItems='center' maxW='550px'>
                    <Flex maxW='380px' flexDir='column' flex='1' border='1px solid #6135ba' borderRadius='5px' p='1em' cursor='pointer' onClick={() => setFeatureImage('/assets/generator-mockup.png')}>
                        <Flex alignItems='flex-start' gap='1.5em'>
                            <Image 
                                src='/assets/landing-icon-1.png' 
                                alt='Landing Icon - Generator' 
                                w='35px'
                            />
                            <Text fontWeight='semibold' fontSize='16pt'>
                                Collection Generator
                            </Text>
                        </Flex>
                        <Text fontSize='10pt' mt='1em'>
                            We provide the fastest NFT generator in the market. You can generate 100 unique images for free. We charge with a fixed price of $25 per generation for collections above 100.
                        </Text>
                    </Flex>
                    <Flex maxW='380px' flexDir='column' flex='1' border='1px solid #6135ba' borderRadius='5px' p='1em' cursor='pointer' onClick={() => setFeatureImage('/assets/website-mockup.png')}>
                        <Flex alignItems='flex-start' gap='1.5em'>
                            <Image 
                                src='/assets/landing-icon-2.png' 
                                alt='Landing Icon - Generator' 
                                w='35px'
                            />
                            <Text fontWeight='semibold' fontSize='16pt'>
                                Minting Website Hosting
                            </Text>
                        </Flex>
                        <Text fontSize='10pt' mt='1em'>
                            Create a minting website by a click of a button. You can host your own minting website for free. Features including prebuilt templates, addons, domain, and more. Unlock special features by upgrading to premium for $15 USD.
                        </Text>
                    </Flex>
                    <Flex maxW='380px' flexDir='column' flex='1' border='1px solid #6135ba' borderRadius='5px' p='1em' cursor='pointer' onClick={() => setFeatureImage('/assets/metadata-mockup.png')}>
                        <Flex alignItems='flex-start' gap='1.5em'>
                            <Image 
                                src='/assets/landing-icon-3.png' 
                                alt='Landing Icon - Generator' 
                                w='35px'
                            />
                            <Text fontWeight='semibold' fontSize='16pt'>
                                Metadata Utilities
                            </Text>
                        </Flex>
                        <Text fontSize='10pt' mt='1em'>
                            Create a minting website by a click of a button. You can host your own minting website for free. Features including prebuilt templates, addons, domain, and more. Unlock special features by upgrading to premium for $15 USD.
                        </Text>
                    </Flex>
                </VStack>
                {!isCollapse && (
                    <Flex flex='1' position='relative' flexDir='column' justifyContent='center' alignItems='center'>
                        <Image 
                            position='absolute' 
                            className='rotateAnimation' 
                            src='/assets/landing-effect-6.png' 
                            alt='Landing Animation - Ball' 
                            left='5%'
                        />
                        <Image 
                            position='absolute' 
                            className='rotateAnimation2' 
                            src='/assets/landing-effect-7.png' 
                            alt='Landing Animation - Ball' 
                        />
                        <Image 
                            src={featureImage}
                            alt='Generator Mockup' 
                            opacity='.5'
                            border='1px solid #6135ba'
                            boxShadow='2xl'
                            maxW='1100px'
                            w='full'
                        />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default Features