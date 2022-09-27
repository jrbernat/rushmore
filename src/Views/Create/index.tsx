import { CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";

const Create = (props: CommonProps) => {
  const { setView } = props;
  return (
    <div className="create">
      <ExitButton onExit={() => setView("landing")} />
      Create
    </div>
  );
};

export default Create;
