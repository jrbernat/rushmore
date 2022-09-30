import { RushmoreProps } from ".";
import { app } from "../../App";
import TextInput from "../../Components/TextInput";
import { ParseCookie } from "../../parse-cookie";
import { getPickerIndex, getPickIndex } from "../../Utils/Snakedraft";
import Pick from "./Pick";

const COLORS = ["#C724B1", "#4D4DFF", "#E0E722", "#44D62C"];

const Active = (props: RushmoreProps) => {
  const { rushmore, id, forceRefresh } = props;

  const makePick = (pick: string) => {
    app.currentUser?.functions
      .makePick(id, pick)
      .then(() => forceRefresh())
      .catch((err) => console.log(err));
  };

  const pickerIndex = getPickerIndex(rushmore.picks?.length);
  let whosPick = rushmore.members[pickerIndex];

  const usersPick = ParseCookie(document.cookie, "username") === whosPick;
  if (usersPick) {
    whosPick = "YOU";
  }

  const picks: any[] = rushmore.picks;

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
            i={i}
            picker={rushmore.members[getPickerIndex(i)]}
            key={i}
            color={COLORS[getPickerIndex(i)]}
            isMostRecent={i === rushmore.picks?.length - 1}
          />
        ))}
      </div>
      <div className="flex-horizontal-gap center-align">
        On the clock: <span className="subtitle">{whosPick}!</span>
      </div>
      {usersPick && (
        <div className="picker">
          <TextInput
            onSubmit={makePick}
            description={`Pick ${getPickIndex(rushmore.picks?.length)}`}
          />
        </div>
      )}
    </div>
  );
};

export default Active;
