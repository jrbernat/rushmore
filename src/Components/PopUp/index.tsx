import ExitButton from "../ExitButton";
import "./index.css";

interface PopupProps {
  open: boolean;
  content: JSX.Element | string;
  onClose?: () => void;
}

const Popup = (props: PopupProps) => {
  const { open, content, onClose } = props;
  if (!open) return <div style={{ display: "none" }} />;
  return (
    <div className="popup-box">
      <div className="box">
        {onClose && <ExitButton onExit={onClose} />}
        {content}
      </div>
    </div>
  );
};

export default Popup;
