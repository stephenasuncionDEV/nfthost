import { Box, Wrap } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import Confetti from 'react-confetti'
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
        <Box p='1em'>
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
            <RarityModal />
            <GenerateModal />
            <DownloadModal />
            <Toolbar />
            <Wrap spacing='1em' mt='1em'>
                <Layers />
                <Traits />
                <Preview />
            </Wrap>
        </Box>
    )
}

export default Generator