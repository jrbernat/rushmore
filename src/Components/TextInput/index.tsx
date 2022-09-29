import { useRef } from "react";
import "./index.css";

interface TextInputProps {
  onSubmit: (text: string) => void;
  description: string;
  defaultText?: string;
  maxLength?: number;
}

export const LargeTextInput = (props: TextInputProps) => {
  const { onSubmit, description, maxLength = 128, defaultText = "" } = props;

  const handleSubmit = (t: string | undefined) => {
    if (t !== undefined) {
      return onSubmit(t);
    }
  };

  const text = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="text-input">
      <span>{description}</span>
      <div className="text-area-input-container">
        <textarea
          ref={text}
          defaultValue={defaultText}
          className="text-area-input"
          maxLength={maxLength}
        />
        <button onClick={() => handleSubmit(text.current?.value)}>
          Confirm
        </button>
      </div>
    </div>
  );
};
const TextInput = (props: TextInputProps) => {
  const { onSubmit, description, maxLength = 24, defaultText = "" } = props;

  const handleSubmit = (t: string | undefined) => {
    if (t !== undefined) {
      return onSubmit(t);
    }
  };

  const text = useRef<HTMLInputElement>(null);

  return (
    <div className="text-input">
      <span>{description}</span>
      <div>
        <input ref={text} maxLength={maxLength} defaultValue={defaultText} />
        <button onClick={() => handleSubmit(text.current?.value)}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TextInput;
