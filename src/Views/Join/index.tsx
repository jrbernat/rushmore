import { useNavigate } from "react-router-dom";
import { CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput from "../../Components/TextInput";
import "./index.css";

const Join = (props: CommonProps) => {
  const { setView } = props;

  const nav = useNavigate();

  const handleOpenRushmore = (id: string) => {
    // query db for the id

    // if found, display that rushmore
    nav(`rushmore/${id}`, {replace: true});
    
    // otherwise, display "not found" error
  };

  return (
    <div>
      <ExitButton onExit={() => setView("landing")} />
      <div className="join">Join an existing Rushmore</div>
      <div className="input-container">
        <TextInput
          onSubmit={(t) => handleOpenRushmore(t)}
          description={"Please enter Rushmore ID"}
        />
      </div>
    </div>
  );
};

export default Join;
