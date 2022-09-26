import { useEffect, useState } from 'react'
import { Tag, TagLabel } from '@chakra-ui/react'
import { useMemberControls } from '@/hooks/useMemberControls'

const Address = (styles) => {
    const { getConnectedAddress } = useMemberControls();
    const [address, setAddress] = useState();

    useEffect(() => {
        const getAddress = async () => {
            const addressTemp = await getConnectedAddress();
            setAddress(addressTemp);
        }
        getAddress();
    }, [])

    return (
        <Tag {...styles}>
            <TagLabel noOfLines={1}>
                {address}
            </TagLabel>
        </Tag>
    )
}

export default Address