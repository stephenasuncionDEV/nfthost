import { Text } from '@chakra-ui/react'
import style from "../../../styles/Log.module.scss"

const Log = ({index, hash, date, author, body}) => {
    return (
        <div className={style.container}>
            <Text fontSize='19pt'>
                Update Log #{index}
            </Text>
            <Text fontSize='10pt'>
                Hash: {hash}
            </Text>
            <Text sx={{ fontSize: 14, mb: 0 }} color=''>
                {date} 
            </Text>
            <Text sx={{ mb: 1.5, fontSize: 12 }} color=''>
                Published by: {author}
            </Text>
            {body.map((content, idx) => (
                <Text key={idx}>
                    - {content}
                </Text>
            ))}
        </div>
    )
}

export default Log