import { useContext } from "react";
import { RushmoreProps } from ".";
import { app, UserContext } from "../../App";
import TextInput from "../../Components/TextInput";
import {
  getPickerIndex,
  getPickIndex,
  getValidPicks,
} from "../../Utils/Snakedraft";
import Pick from "./Pick";

const COLORS = ["#C724B1", "#4D4DFF", "#E0E722", "#44D62C"];

const Active = (props: RushmoreProps) => {
  const { rushmore, id, forceRefresh } = props;

  const user = useContext(UserContext);

  const makePick = (pick: string) => {
    app.currentUser?.functions
      .makePick(id, pick)
      .then(forceRefresh)
      .catch((err) => console.log(err));
  };

  const pickerIndex = getPickerIndex(rushmore.picks);

  let whosPick = rushmore.members[pickerIndex];

  const usersPick = user?.username === whosPick;
  if (usersPick) {
    whosPick = "YOU";
  }

  const picks: any[] = rushmore.picks;

  const lastPickConfirmed = picks.at(-1).confirms?.length > 1;
  const lastPickVetoed = picks.at(-1).vetos?.length > 1;

  return (
    <div className="active">
      <div>
        <div>Rushmore of</div>
        <div className="subtitle">{rushmore.title}</div>
      </div>
      <div className="board">
        {picks.map((p, i) => (
          <Pick
            pick={p}
            i_literal={i}
            i_snake={getValidPicks(rushmore.picks.slice(0, i)).length}
            picker={
              rushmore.members[getPickerIndex(rushmore?.picks?.slice(0, i))]
            }
            key={i}
            color={COLORS[getPickerIndex(rushmore?.picks?.slice(0, i))]}
            needsConfirmation={
              i === rushmore.picks?.length - 1 && !lastPickConfirmed
            }
            rushmoreId={id}
            refresh={forceRefresh}
          />
        ))}
      </div>
      {lastPickConfirmed && (
        <div className="flex-horizontal-gap center-align">
          On the clock: <span className="subtitle">{whosPick}!</span>
        </div>
      )}
      {lastPickVetoed && (
        <div className="flex-horizontal-gap center-align">
          Veto!<span className="subtitle">{whosPick}</span>{" "}
          {usersPick ? "are " : "is "}
          on the clock again.
        </div>
      )}
      {!lastPickConfirmed && !lastPickVetoed && (
        <div className="flex-horizontal-gap center-align">
          Waiting for the previous pick to be confirmed.
          <br /> Up next: {whosPick}!
        </div>
      )}
      {usersPick && (lastPickConfirmed || lastPickVetoed) && (
        <div className="picker">
          <TextInput
            onSubmit={makePick}
            description={`Pick ${getPickIndex(
              getValidPicks(rushmore.picks).length
            )}`}
          />
        </div>
      )}
    </div>
  );
};

export default Active;
