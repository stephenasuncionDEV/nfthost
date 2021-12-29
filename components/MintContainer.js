import parse from 'html-react-parser';
import style from "../styles/MintContainer.module.scss"

const MintContainer = ({iframe}) => {
    return (
        <div className={style.container}>
            {parse(iframe)}
        </div>
    )
}

export default MintContainer