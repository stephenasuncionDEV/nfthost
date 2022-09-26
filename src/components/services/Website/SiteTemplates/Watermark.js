import { Link, Button } from '@chakra-ui/react'
import { GiCutDiamond } from 'react-icons/gi'
import { useWebsite } from '@/providers/WebsiteProvider'

const Watermark = (styles) => {
    const { userWebsite } = useWebsite();

    return (
        <>
        {!userWebsite?.isPremium && (
            <Link href='https://www.nfthost.app/'>
                <Button variant='primary' {...styles}>
                    Hosted by NFTHost.app 🚀
                </Button>
            </Link>
        )}
        </>
    )
}

export default Watermark