import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useGenerator } from '@/providers/GeneratorProvider'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import posthog from 'posthog-js'

const zip = new JSZip();

export const useUtils = () => {
    const toast = useToast();
    const { jsonFiles, setJsonFiles } = useGenerator();
    const [newImageStorage, setNewImageStorage] = useState('');
    const [selectedRemoveKey, setSelectedRemoveKey] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

    const UploadJSON = async (files) => {
        try {
            const data = await filesToData(files);
            setJsonFiles(data);
        }
        catch (err) {
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
        }   
    }

    const filesToData = (files) => {
        return Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        try {
                            const jsonData = JSON.parse(fileReader.result);
                            resolve(jsonData);
                        }
                        catch (err) {
                            reject(err);
                        }   
                    }
                    fileReader.readAsText(file);
                })
            })
        )
    }

    const DownloadImageStorage = async () => {
        try {
            if (!jsonFiles) throw new Error('Drag and drop your metadata folder first');
            if (!newImageStorage.length) throw new Error('Enter an Image Storage Url');

            zip.remove('Metadata');

            setIsDownloading(true);

            const externalStorage = newImageStorage.trim().charAt(newImageStorage.length - 1) === '/' ? newImageStorage.substring(0, newImageStorage.length - 1) : newImageStorage;

            jsonFiles.forEach((json) => {
                if (!Array.isArray(json)) { // Json Files
                    const nftNumber = json.image.slice(json.image.charAt(0) === '/' ? 1 : 0, json.image.indexOf('.'));
                    const newImage = externalStorage + (json.image.charAt(0) === '/' ? json.image : ('/' + json.image));
                    let newJson = { ...json, image: newImage };
                    zip.folder("Metadata").file(`${nftNumber}.json`, JSON.stringify(newJson, null, 2));
                }
                else { // Metadata
                    const newMetadata = json.map((jsonData) => {
                        const newImage_metadata = externalStorage + (jsonData.image.charAt(0) === '/' ? jsonData.image : ('/' + jsonData.image));
                        return {
                            ...jsonData,
                            image: newImage_metadata
                        }
                    })

                    zip.folder("Metadata").file('metadata.json', JSON.stringify(newMetadata, null, 2));
                }
            })

            const content = await zip.generateAsync({
				type: "blob",
				streamFiles: true
			})

			saveAs(content, "NFTHost Updated Metadata.zip");
            setIsDownloading(false);

            posthog.capture('User updated image storage');

        }
        catch (err) {
            setIsDownloading(false);
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const DownloadRemoveKey = async () => {
        try {
            if (!jsonFiles) throw new Error('Drag and drop your metadata folder first');
            if (!selectedRemoveKey.length) throw new Error('Select a metadata key to remove first')

            zip.remove('Metadata');

            setIsDownloading(true);

            jsonFiles.forEach((json) => {
                if (!Array.isArray(json)) { // Json Files
                    const nftNumber = json.image.slice(json.image.charAt(0) === '/' ? 1 : 0, json.image.indexOf('.'));
                    let newJson = { ...json };
                    delete newJson[selectedRemoveKey]
                    zip.folder("Metadata").file(`${nftNumber}.json`, JSON.stringify(newJson, null, 2));
                }
                else { // Metadata
                    const newMetadata = json.map((jsonData) => {
                        let newJsonData = { ...jsonData };
                        delete newJsonData[selectedRemoveKey]
                        return newJsonData
                    })
                    zip.folder("Metadata").file('metadata.json', JSON.stringify(newMetadata, null, 2));
                }
            })

            const content = await zip.generateAsync({
				type: "blob",
				streamFiles: true
			})

			saveAs(content, "NFTHost Updated Metadata.zip");
            setIsDownloading(false);

            posthog.capture('User removed metadata key', { key: selectedRemoveKey });
        }
        catch (err) {
            setIsDownloading(false);
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        UploadJSON,
        newImageStorage,
        setNewImageStorage,
        DownloadImageStorage,
        isDownloading,
        jsonFiles,
        setJsonFiles,
        DownloadRemoveKey,
        selectedRemoveKey,
        setSelectedRemoveKey
    }
}