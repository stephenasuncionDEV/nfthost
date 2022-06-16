import { Wrap } from '@chakra-ui/react'
import CurrentTemplate from './CurrentTemplate'
import TemplateList from './TemplateList'

const Template = () => {
    return (
        <Wrap spacing='1em' direction='column'>
            <CurrentTemplate />
            <TemplateList />
        </Wrap>
    )
}

export default Template