import "./index.css"

interface FullWidthButtonProps {
    text: string;
    onClick: () => void;
}

const FullWidthButton = (props: FullWidthButtonProps) => {
    const {text, onClick} = props;
    return <div onClick={onClick} className="full-width-button">
        {text}
    </div>
}

export default FullWidthButton;