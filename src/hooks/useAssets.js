import { useGenerator } from '@/providers/GeneratorProvider'
import { useToast } from '@chakra-ui/react'

export const useAssets = () => {
    const toast = useToast();
    const { currentLayer, imageDimension, setImageDimension, setLayers } = useGenerator();

    const DeleteTrait = (imageName) => {
        setLayers(prevState => {
			const filteredImages = prevState[currentLayer].images.filter(image => image.name !== imageName);
            prevState[currentLayer].images = filteredImages;
			return [...prevState];
		})
    }

    const UploadAssets = async (files) => {
        try {
            const newImages  = await ConstructImages(files);

            if (!newImages.length) throw new Error('Please try adding your traits again');

            // Update rarity settings
            setLayers(prevLayers => {
                const newImages2 = newImages.map((image, idx, array) => {
                    image.rarity.value = 50;
                    image.rarity.max = array.length * 50;
                    image.rarity.percentage = 100 / array.length;
                    return image;
                })
                prevLayers[currentLayer].images = newImages2;
                return [...prevLayers];
            })
        }
        catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    const ConstructImages = (files) => {
        return Promise.all(
            files.map(async (file) => {
                return await CreateTrait(file);
            })
        )
    }

    const LoadImage = (imageObjUrl) => {
        return new Promise((resolve, reject) => {
            try {
                const img = new Image();
                img.onload = () => {
                    resolve(img);
                }
                img.src = imageObjUrl;
            }
            catch(err) {
                reject(err);
            }
        })
    }

    const CreateTrait = (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const img  = await LoadImage(URL.createObjectURL(file));
                const newFile = {
                    image: img,
                    preview: img.currentSrc,
                    name: file.name.substring(0, file.name.indexOf('.')),
                    type: file.type,
                    rarity: {
                        value: 50,
                        max: -1,
                        percentage: -1,
                    }
                }
                if (img) {
                    if (!imageDimension) {
                        setImageDimension({
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        })
                    }
                    resolve(newFile);
                }
            }
            catch (err) {
                reject(err);
            }
        })
    }

    return {
        DeleteTrait,
        UploadAssets
    }
}