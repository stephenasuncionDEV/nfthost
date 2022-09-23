import { useEffect } from 'react'
import { Text, Flex, VStack, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
import { useUser } from '@/providers/UserProvider'
import { useWeb } from '@/hooks/services/website/useWeb'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { webColor } from '@/theme/index'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const EmbedClicks = ({ analytics }) => {
    const { title, description, dataset, dataKey, style: { border, bg } } = analytics;

    const { websites } = useWebsite();
    const { isLoggedIn } = useUser();
    const { GetWebsites } = useWeb();

    const containerColor = useColorModeValue(webColor.containerBg[0], webColor.containerBg[1]);
    const componentColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)');

    useEffect(() => {
        if (!isLoggedIn) return;
        GetWebsites();
    }, [isLoggedIn])

    const data = {
        labels: websites?.map((website) => website.components.title),
        datasets: [
            {
                label: dataset,
                data: websites?.map((website) => website.analytics[dataKey]),
                borderColor: border,
                backgroundColor: bg,
            }
        ],
    }

    return (
        <VStack   
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
            flex='1'
            maxH='600px'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    {title}
                </Text>
                <Text fontSize='10pt'>
                    {description}
                </Text>
            </VStack>
            <Flex 
                w='full' 
                bg={componentColor} 
                borderRadius='10px' 
                p='2em'
                justifyContent='center'
                alignItems='center'
            >
                <Line options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: title,
                        },
                    },
                }} data={data} />
            </Flex>
        </VStack>
    )
}

export default EmbedClicks