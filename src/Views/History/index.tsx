import { CommonProps } from "../../App"
import ExitButton from "../../Components/ExitButton";

const History = (props: CommonProps) => {
    const {setView} = props;
    return <div className="history">
        <ExitButton onExit ={() => setView("landing")}/>
        Coming Soon!
    </div>
}

export default History;