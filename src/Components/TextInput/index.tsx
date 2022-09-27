import { useRef } from "react";
import "./index.css";

interface TextInputProps {
  onSubmit: (text: string) => void;
  description: string;
}

const TextInput = (props: TextInputProps) => {
  const { onSubmit, description } = props;

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
        <input ref={text} />
        <button onClick={() => handleSubmit(text.current?.value)}>
            Confirm
        </button>
      </div>
    </div>
  );
};

export default TextInput;
