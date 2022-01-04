import { useState, forwardRef, useImperativeHandle } from "react"
import { useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button, Input, Textarea } from '@chakra-ui/react'

const ScriptDialog = (props, ref) => {
    const { layerList, setLayerList } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [script, setScript] = useState("");
    const alert = useToast();

    useImperativeHandle(ref, () => ({
        show() {  
            onOpen();
        }
    }), [])

    const determineLayer = () => {
        if (script.indexOf("layers=") != -1) {
            let newLayers = [];
            let retLayers = [];
            const scripts = script.split("\n");
            scripts.forEach((line, idx) => {
                if (line.indexOf("layers=") != -1) {
                    const stringArray = line.substring(line.indexOf("layers=") + 7);
                    newLayers = [...JSON.parse(stringArray)];
                }
            });
            newLayers.forEach((layer, idx) => {
                retLayers.push({
                    name: layer,
                    images: []
                })
            });
            if (layerList.length + retLayers.length > 6) {
                alert({
                    title: 'Error',
                    description: "You cannot have more than 6 layers.",
                    status: 'error',
                    duration: 3000,
                })
                return;
            } else {
                setLayerList([...layerList, ...retLayers]);
            }    
        }
    }

    const handleRunClick = () => {
        determineLayer();
        onClose();
    }

    const onScriptChange = (e) => {
        setScript(e.target.value);
    }

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Run a script</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea 
                        placeholder='Script' 
                        variant='outline' 
                        value={script} 
                        onChange={onScriptChange}
                        isRequired
                    />
                </ModalBody>
                <ModalFooter>
                    <Button variant='solid' colorScheme='gray' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button ml='2' variant='solid' colorScheme='blue' onClick={handleRunClick}>
                        Run
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default forwardRef(ScriptDialog)