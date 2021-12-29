import style from "../styles/MintContainer.module.scss"

const MintContainer = ({iframe}) => {
    return (
        <div className={style.container}>
            { <div dangerouslySetInnerHTML={{ __html: iframe.replace(/\n/g, '<br />')}} /> }
        </div>
    )
}

export default MintContainer