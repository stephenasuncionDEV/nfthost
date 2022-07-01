import { Text, Flex, Button, useColorModeValue, Select, HStack } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useUtils } from '@/hooks/useUtils'
import { FaDownload } from 'react-icons/fa'
import JsonDropbox from './JsonDropbox'

const RemoveKey = () => {
    const { jsonFiles } = useGenerator();
    const { 
        DownloadRemoveKey, 
        isDownloading,
        selectedRemoveKey,
        setSelectedRemoveKey
    } = useUtils();

    const helperColor = useColorModeValue('gray.500', 'whiteAlpha.600');

    return (
        <Flex flexDir='column' w='full'>
            <Text fontWeight='bold' fontSize='10pt'>
                Remove Metadata Key
            </Text>
            <Text fontSize='10pt'>
                Remove any key on your metadata files.
            </Text>
            <JsonDropbox mt='1em' />
            {jsonFiles && (
                <HStack mt='1em'>
                    <Select placeholder='Select a Key' value={selectedRemoveKey} onChange={(e) => setSelectedRemoveKey(e.target.value)}>
                        {Object.keys(jsonFiles[0]).map((key, idx) => (
                            <option value={key} key={idx}>{key}</option>
                        ))}
                    </Select>
                </HStack>
            )}
            <Flex mt='1em' justifyContent='space-between'>
                <Text fontSize='9pt' color={helperColor}>
                    Your metadata folder must contain all the numbered json files and metadata.json
                </Text>
                <Button size='sm' variant='primary' leftIcon={<FaDownload />} onClick={DownloadRemoveKey} isLoading={isDownloading} disabled={isDownloading || !jsonFiles} loadingText='Downloading'>
                    Download
                </Button>
            </Flex>
        </Flex>
    )
}

export default RemoveKey