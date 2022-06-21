import { Wrap } from '@chakra-ui/react'
import UniqueUsers from './UniqueUsers'
import EmbedClicks from './EmbedClicks'

const Analytics = () => {

    return (
        <Wrap spacing='2em'>
            <UniqueUsers />
            <EmbedClicks />
        </Wrap>
    )
}

export default Analytics