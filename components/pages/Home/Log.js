import { Box, Text } from '@chakra-ui/react'

const Log = ({index, hash, date, author, body}) => {
    return (
        <Box
            mt='1em'
            bg='rgb(240, 240, 240)'
            borderRadius='10px 10px'
            p='1em'
        >
            <Text fontSize='19pt'>
                Update Log #{index}
            </Text>
            <Text fontSize='10pt'>
                Hash: {hash}
            </Text>
            <Text sx={{ fontSize: 14, mb: 0 }} color=''>
                {date} 
            </Text>
            <Text sx={{ mb: 1.5, fontSize: 12 }} color=''>
                Published by: {author}
            </Text>
            {body.map((content, idx) => (
                <Text key={idx}>
                    - {content}
                </Text>
            ))}
        </Box>
    )
}

export default Log