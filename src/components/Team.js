import { Text, Flex, VStack, useColorModeValue, 
    Wrap, Link, Avatar, HStack, IconButton
} from '@chakra-ui/react'
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa'
import { teamArr } from '@/utils/json'
import posthog from 'posthog-js';

const Team = () => {

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');

    return (
        <Wrap spacing='2em'>
            {teamArr?.map((member, idx) => (
                <Wrap 
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
                        <Avatar src='/assets/team/stephen.jpg' name='Stephen Asuncion' size='lg' />
                    </VStack>
                    <VStack alignItems='flex-start' flex='1'>
                        <Flex flexDir='column'>
                            <Text>
                                {member.name}
                            </Text>
                            <Text fontSize='8pt'>
                                {member.position}
                            </Text>
                            <HStack spacing='1em' mt='2em'>
                                {member.socials.twitter && <Link href={member.socials.twitter}><IconButton icon={<FaTwitter />} size='sm' onClick={() => posthog?.capture('User visited team twitter', { name: member.name }) }/></Link>}
                                {member.socials.linkedin && <Link href={member.socials.linkedin}><IconButton icon={<FaLinkedin />} size='sm' onClick={() => posthog?.capture('User visited team linkedin', { name: member.name }) }/></Link>}
                                {member.socials.youtube && <Link href={member.socials.youtube}><IconButton icon={<FaYoutube />} size='sm' onClick={() => posthog?.capture('User visited team youtube', { name: member.name }) }/></Link>}
                                {member.socials.facebook && <Link href={member.socials.facebook}><IconButton icon={<FaFacebook />} size='sm' onClick={() => posthog?.capture('User visited team facebook', { name: member.name }) }/></Link>}
                                {member.socials.instagram && <Link href={member.socials.instagram}><IconButton icon={<FaInstagram />} size='sm' onClick={() => posthog?.capture('User visited team instagram', { name: member.name }) }/></Link>}
                            </HStack>
                        </Flex>
                        <Text fontSize='10pt'>
                            
                        </Text>
                    </VStack>
                </Wrap>
            ))}
        </Wrap>
    )
}

export default Team