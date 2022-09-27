import { CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";

interface RushmoreProps extends CommonProps {
  id: number;
}

const Rushmore = (props: RushmoreProps) => {
  const { setView } = props;
  return (
    <div>
      <ExitButton onExit={() => setView("landing")} />
        Rushmore
    </div>
  );
};

export default Rushmore;
