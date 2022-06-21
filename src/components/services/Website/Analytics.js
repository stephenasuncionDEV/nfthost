import { Wrap } from '@chakra-ui/react'
import Chart from './Chart'
import { analyticsArr } from '@/utils/json'

const Analytics = () => {

    return (
        <Wrap spacing='2em'>
            {analyticsArr?.map((analytics, idx) => (
                <Chart key={idx} analytics={analytics} />
            ))}
        </Wrap>
    )
}

export default Analytics