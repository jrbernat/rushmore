import { HTMLInputTypeAttribute, useRef } from "react";
import "./index.css";

interface TextInputProps {
  onSubmit: (text: string) => void;
  description: string;
  defaultText?: string;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
}

export const LargeTextInput = (props: TextInputProps) => {
  const { onSubmit, description, maxLength = 128, defaultText = "" } = props;

  const handleSubmit = () => {
    const t = text.current?.value;
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
          onKeyDown={(evt) => {
            if (evt.key === "Enter") handleSubmit();
          }}
        />
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};
const TextInput = (props: TextInputProps) => {
  const {
    onSubmit,
    description,
    maxLength = 24,
    defaultText = "",
    type = "text",
  } = props;

  const handleSubmit = () => {
    const t = text.current?.value;
    if (t !== undefined) {
      return onSubmit(t);
    }
  };

  const text = useRef<HTMLInputElement>(null);

  return (
    <div className="text-input">
      <span>{description}</span>
      <div className="text-area-input-container">
        <input
          ref={text}
          maxLength={maxLength}
          defaultValue={defaultText}
          type={type}
          onKeyDown={(evt) => {
            if (evt.key === "Enter") handleSubmit();
          }}
        />
        <button onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
};

export default TextInput;
