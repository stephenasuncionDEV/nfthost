import { Wrap } from '@chakra-ui/react'
import CurrentTemplate from './CurrentTemplate'
import TemplateList from './TemplateList'
import Addons from './Addons'

const Template = () => {
    return (
        <Wrap spacing='1em' direction='column'>
            <CurrentTemplate />
            <TemplateList />
            <Addons />
        </Wrap>
    )
}

export default Template