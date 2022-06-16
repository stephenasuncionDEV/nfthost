import { Box, Text, useColorModeValue, Wrap, Flex } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import Confetti from 'react-confetti'
import MetadataModal from './MetadataModal'
import Layers from './Layers'
import Toolbar from './Toolbar'
import Traits from './Traits'
import Preview from './Preview'
import RarityModal from './RarityModal'
import GenerateModal from './GenerateModal'
import useWindowSize from 'react-use/lib/useWindowSize'
import DownloadModal from './DownloadModal'

const Generator = () => {
    const { width, height } = useWindowSize();
    const { isConfetti } = useGenerator();

    return (
        <Box
            p='1em'
        >
            <Confetti
                numberOfPieces={200}
                width={width - 25}
                height={height - 25}
                run={isConfetti}
                recycle={isConfetti}
                onConfettiComplete={(confetti) => {
                    confetti.reset();
                    confetti.context.clearRect(0, 0, confetti.canvas.width, confetti.canvas.height);
                }}
            />
            <MetadataModal />
            <RarityModal />
            <GenerateModal />
            <DownloadModal />
            <Toolbar />
            <Wrap spacing='1em' mt='1em'>
                <Layers />
                <Traits />
                <Preview />
            </Wrap>
            <Box position='absolute' bottom='0' right='0' p='1em' opacity='.2'>
                <Flex flexDir='column' alignItems='flex-end'>
                    <Text fontSize='10pt'>
                        Powered by NFT Host
                    </Text>
                    <Text fontSize='10pt'>
                        Version 2.0 BETA
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
}

export default Generator