import { Box, Text, HStack, VStack, List, ListItem, ListIcon } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'
import style from "../../../styles/Main.module.scss"

const PricingContainer = ({data}) => {
    return (
        <Box
            boxShadow='var(--chakra-shadows-2xl)'
            className={style.pricingBox}
        >
            <Box
                display='flex'
                flexDir='column'
            >
                <Text 
                    mt='1em'
                    px='3'
                    py='1'
                    bg={data.titleColor}
                    borderRadius='30px'
                    className={style.pricingTitle}
                >
                    {data.title}
                </Text>
                <HStack 
                    justifyContent='center'
                    p='1em'
                >
                    <Text fontSize='22pt'>$</Text>
                    <Text
                        fontSize='36pt'
                        fontWeight='700'
                    >
                        {data.price}
                    </Text>
                    <Text color='rgb(160,160,160)'>/{data.per}</Text>
                </HStack>
            </Box>
            <Box
                p='2em'
                w='full'
                h='full'
                bg='rgb(250, 250, 250)'
            >
                <List>
                    {data.items.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListIcon>
                                <FaCheck color='rgb(49,130,206)'/>
                            </ListIcon>
                            {item}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    )
}

export default PricingContainer