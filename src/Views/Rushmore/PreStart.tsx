import { RushmoreProps } from "."
import { CapitalizeFirst } from "../../Utils/String";



const PreStart = (props: RushmoreProps) => {
    const {rushmore} = props;
    console.log(rushmore.members)
    return <div>
    <div className="subtitle">Rushmore of</div>
    <div className="topic">{CapitalizeFirst(rushmore.title)}</div>
    <div className="description">
      Description: {rushmore.description}
    </div>
    <div>This Rushmore hasn't started yet... Invite friends and start!</div>
    <div>Current Members:{rushmore.members}</div>
  </div>
}

export default PreStart;