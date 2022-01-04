import { Box } from '@chakra-ui/react'
import parse from 'html-react-parser';

const MintContainer = ({iframe}) => {
    return (
        <Box mt='1em'>
            {parse(iframe)}
        </Box>
    )
}

export default MintContainer