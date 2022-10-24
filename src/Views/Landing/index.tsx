import { CommonProps } from "../../App";
import FullWidthButton from "../../Components/FullWidthButton";
import "./index.css";

const Landing = (props: CommonProps) => {
    const {setView} = props;
  return (
    <div className="landing-page">
      <div className="title">RUSHMORE</div>
      <FullWidthButton text={"Join Current"} onClick={() => setView("join")} />
      <FullWidthButton text={"Create New"} onClick={() => setView("create")} />
      <FullWidthButton text={"View History"} onClick={() => setView("history")} />
      <FullWidthButton text={"Friends"} onClick={() => setView("friends")}/>
    </div>
  );
};

export default Landing;
