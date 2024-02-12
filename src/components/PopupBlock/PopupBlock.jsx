import "./PopupBlock.css"

const PopupBlock = (props) => {

    const popupBlock = props.state.popupBlock;

    return (
        <div className="popup-block">
            <div className={`popup-block__container`}>
                    {popupBlock.message}
            </div>
        </div>
    )
}

export default PopupBlock