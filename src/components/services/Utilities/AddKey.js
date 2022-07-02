import { Text, Flex, Button, useColorModeValue, Input, HStack, FormControl, FormHelperText, VStack } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { useUtils } from '@/hooks/useUtils'
import { FaDownload } from 'react-icons/fa'
import JsonDropbox from './JsonDropbox'

const AddKey = () => {
    const { jsonFiles } = useGenerator();
    const { 
        DownloadAddKey, 
        isDownloading,
        newKey,
        setNewKey
    } = useUtils();

    const helperColor = useColorModeValue('gray.500', 'whiteAlpha.600');

    return (
        <Flex flexDir='column' w='full'>
            <Text fontWeight='bold' fontSize='10pt'>
                Add/Edit Metadata Key
            </Text>
            <Text fontSize='10pt'>
                Add or Edit a key on your metadata/json files.
            </Text>
            <JsonDropbox mt='1em' />
            {jsonFiles && (
                <VStack mt='1em'>
                    <FormControl>
                        <Input id='newMetadataKey' placeholder='New Metadata Key' w='full' value={Object.keys(newKey)[0]} onChange={(e) => setNewKey({ [`${e.target.value}`]: newKey[Object.keys(newKey)[0]] })} />
                        <FormHelperText fontSize='9pt'>The key you want to add on your metadata files</FormHelperText>
                    </FormControl>
                    <FormControl>
                    <Input id='newMetadataKeyValue' placeholder='New Metadata Key Value' w='full' value={newKey[Object.keys(newKey)[0]]} onChange={(e) => setNewKey({ [`${Object.keys(newKey)[0]}`]: e.target.value })} />
                        <FormHelperText fontSize='9pt'>The value of the key you want to add on your metadata files</FormHelperText>
                    </FormControl>
                    <Text>
                        "{Object.keys(newKey)[0] || ''}": "{newKey[Object.keys(newKey)[0]] || ''}",
                    </Text>
                </VStack>
            )}
            <Flex mt='1em' justifyContent='space-between'>
                <Text fontSize='9pt' color={helperColor}>
                    Your metadata folder must contain all the numbered json files and metadata.json
                </Text>
                <Button size='sm' variant='primary' leftIcon={<FaDownload />} onClick={DownloadAddKey} isLoading={isDownloading} disabled={isDownloading || !jsonFiles} loadingText='Downloading'>
                    Download
                </Button>
            </Flex>
        </Flex>
    )
}

export default AddKey