import { Text, Flex, Button, VStack, useColorModeValue, Wrap, Image, Link } from '@chakra-ui/react'

const PartnersArr = [
    {
        company: 'Flair',
        image: '/assets/partners/flair.png',
        link: 'https://flair.finance/',
        description: 'Open-source Smart Contracts, React Components & REST APIs'
    },
    {
        company: 'Ambition',
        image: '/assets/partners/ambition.png',
        link: 'https://ambition.so/',
        description: 'End-to-end tools to help creators build their NFT collection'
    }
]

const Partners = () => {

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <Wrap spacing='2em'>
            {PartnersArr?.map((partner, idx) => (
                <Link href={partner.link} isExternal style={{ textDecoration: 'none' }}>
                    <Wrap 
                        cursor='pointer'
                        spacing='2em' 
                        maxW='340px' 
                        p='1em' 
                        bg={containerColor}
                        borderRadius='.25em'
                        boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                        alignItems='flex-start' 
                        key={idx}
                    >
                        <VStack>
                            <Image src={partner.image} alt='Flair Logo' width='40px' />
                        </VStack>
                        <VStack alignItems='flex-start' flex='1'>
                            <Flex flexDir='column'>
                                <Text>
                                    {partner.company}
                                </Text>
                                <Link href={partner.link} isExternal>
                                    <Text fontSize='8pt'>
                                        {partner.link}
                                    </Text>
                                </Link>
                            </Flex>
                            <Text fontSize='10pt'>
                                {partner.description}
                            </Text>
                        </VStack>
                    </Wrap>
                </Link>
            ))}
            <Link href='mailto: stephenasuncion01@gmail.com' style={{ textDecoration: 'none' }} w='full' maxW='340px' h='120px'>
                <Flex 
                    as={Button}
                    variant='unstyled'
                    w='full'
                    h='full'
                    p='1em' 
                    bg={containerColor}
                    borderRadius='.25em'
                    boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
                    justifyContent='center' 
                    alignItems='center'
                    borderWidth='3px'
                    borderStyle='dashed'
                    opacity='0.4'
                    _hover={{
                        opacity: '1'
                    }}
                >
                    <Text>
                        💖 Your Company
                    </Text>
                </Flex>
            </Link>
        </Wrap>
    )
}

export default Partners