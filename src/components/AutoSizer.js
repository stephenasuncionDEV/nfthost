import { useState, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'

const AutoSizer = ({ children, className, style }) => {
    const [childParams, setChildParams] = useState({ width: 0, height: 0 });
    const parentRef = useRef();

    useEffect(() => {
        if (!parentRef) return;
        setChildParams({
            width: parentRef.current.clientWidth,
            height: parentRef.current.clientHeight
        })
    }, [parentRef])

    return (
        <Box
            ref={parentRef}
            className={className}
            style={{...style}}
            h='full'
        >
            {children(childParams)}
        </Box>
    )
}

export default AutoSizer