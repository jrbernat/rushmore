import "./index.css"

interface ExitButtonProps {
    onExit: () => void;
}

const ExitButton = (props: ExitButtonProps) => {
    const {onExit} = props;
    return <div className="exit-button" onClick={() => onExit()}>
        X
    </div>
}

export default ExitButton;