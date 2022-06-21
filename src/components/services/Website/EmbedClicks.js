import { Text, Flex, VStack, useColorModeValue } from '@chakra-ui/react'
import { useWebsite } from '@/providers/WebsiteProvider'
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const EmbedClicks = () => {
    const { websites } = useWebsite();

    const containerColor = useColorModeValue('white', 'rgb(54,64,74)');
    const itemColor = useColorModeValue('blackAlpha.100', 'blackAlpha.400');
    const itemBorderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
    
    const data = {
        labels: websites?.map((website) => website.components.title),
        datasets: [
            {
                label: 'Embed Click Count',
                data: websites?.map((website) => website.analytics.clickedOnEmbed),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }

    return (
        <VStack   
            id='uniqueUsers'
            spacing='1.5em'
            p='1em' 
            bg={containerColor}
            borderRadius='.25em'
            boxShadow='0 0 2px 0 rgb(0 0 0 / 10%)'
            alignItems='flex-start'
        >
            <VStack spacing='0' alignItems='flex-start'>
                <Text fontWeight='bold' fontSize='10pt'>
                    Embed Clicks
                </Text>
                <Text fontSize='10pt'>
                    Amount of embed clicks of your websites
                </Text>
            </VStack>
            <Flex 
                w='full' 
                bg={itemColor} 
                borderColor={itemBorderColor} 
                borderWidth='3px' 
                borderStyle='dashed' 
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
                            text: 'Embed Clicks',
                        },
                    },
                }} data={data} />
            </Flex>
        </VStack>
    )
}

export default EmbedClicks