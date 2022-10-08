import { Text, Flex, Button, VStack, useColorModeValue, Wrap, Image, Link } from '@chakra-ui/react'
import { partnersArr } from '@/utils/json'
import { webColor } from '@/theme/index'
import posthog from 'posthog-js'

const Partners = () => {
    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);

    return (
        <Wrap spacing='2em'>
            {partnersArr?.map((partner, idx) => (
                <Link href={partner.link} isExternal style={{ textDecoration: 'none' }} key={idx}>
                    <Wrap 
                        cursor='pointer'
                        spacing='2em' 
                        maxW='340px' 
                        p='1em' 
                        bg={containerColor}
                        borderRadius='.25em'
                        alignItems='flex-start' 
                        key={idx}
                        onClick={() => posthog?.capture('User visited partner', { company: partner.company })}
                        border='1px solid rgb(117,63,229)'
                    >
                        <VStack>
                            <Image src={partner.image} alt={`${partner.company}'s Logo`} width='40px' />
                        </VStack>
                        <VStack alignItems='flex-start' flex='1'>
                            <Flex flexDir='column'>
                                <Text>
                                    {partner.company}
                                </Text>
                                <Text fontSize='8pt'>
                                    {partner.link}
                                </Text>
                            </Flex>
                            <Text fontSize='10pt'>
                                {partner.description}
                            </Text>
                        </VStack>
                    </Wrap>
                </Link>
            ))}
            <Link href='mailto: nfthost@outlook.com' style={{ textDecoration: 'none' }} w='full' maxW='340px' h='120px'>
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