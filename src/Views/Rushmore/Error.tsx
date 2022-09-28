import { useNavigate } from "react-router-dom";
import ExitButton from "../../Components/ExitButton";

const Error = () => {
  const nav = useNavigate();
  return (
    <div>
      Oh no! Something went wrong. Exit to return to the home page
      <ExitButton onExit={() => nav("/")} />
    </div>
  );
};

export default Error;
