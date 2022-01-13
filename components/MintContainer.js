import { Box } from '@chakra-ui/react'
import parse from 'html-react-parser';

const MintContainer = ({iframe}) => {
    return (
        <Box>
            {parse(iframe)}
        </Box>
    )
}

export default MintContainer