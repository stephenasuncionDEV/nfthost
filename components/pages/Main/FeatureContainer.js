import { Box, Text, HStack, VStack } from '@chakra-ui/react'
import { FaServer, FaCheck } from 'react-icons/fa'
import { GoCircuitBoard } from 'react-icons/go'
import style from '../../../styles/Main.module.scss'

const FeatureContainer = ({icon, features}) => {

    return (
        <Box className={style.featureBox}>
            <HStack justifyContent='center'>
                <Box
                    p='1em'
                    bg='linear-gradient(45deg, #78eff3, #4268af)'
                    borderRadius='10px'
                >
                    {icon === 0 && <FaServer size='3em'/>}
                    {icon === 1 && <GoCircuitBoard size='3em'/>}
                </Box>
            </HStack>
            <VStack spacing='4' className={style.featureBoxStack}>
                {features && features.map((feature, idx) => (
                    <HStack key={idx} w='full' pl='1em'>
                        <FaCheck />
                        <Text>{feature}</Text>
                    </HStack>
                ))}
            </VStack>
        </Box>
    )
}

export default FeatureContainer