import { app } from "../../App";
import { getPickIndex } from "../../Utils/Snakedraft";

interface PickProps {
  pick: any;
  i: number;
  picker: string;
  color: string;
  isMostRecent: boolean;
}

const Pick = (props: PickProps) => {
  const { pick, i, picker, color, isMostRecent } = props;
  const likes = pick.likes?.length ?? 0;
  const dislikes = pick.dislikes?.length ?? 0;

  const hasVetoed = pick.vetos?.includes(app.currentUser?.id) ?? true;
  const hasConfirmed = pick.confirms?.includes(app.currentUser?.id);

  if (pick.pick === "Twix") pick.vetos = ["one", "two", "three"];

  const veto = pick.vetos?.length > 1;

  return (
    <div>
      <table
        className={"pick" + (veto ? " veto" : "")}
        style={{ outlineColor: color, opacity: veto ? 0.4 : undefined }}
      >
        <tbody>
          <tr>
            <td colSpan={1}>{getPickIndex(i)}</td>
            <td colSpan={3} style={{ color: color }}>
              {picker}
            </td>
            <td colSpan={6}>
              <div>{pick.pick}</div>
            </td>
          </tr>
          {!veto && (
            <tr>
              <td colSpan={4}></td>
              <td colSpan={6} className="flex-horizontal-gap">
                <i className="fa-regular fa-thumbs-up" />
                {likes}
                <i className="fa-regular fa-thumbs-down" />
                {dislikes}
              </td>
            </tr>
          )}
          {isMostRecent && (
            <tr>
              <td colSpan={4}>
                <span className="flex-horizontal-gap">
                  {pick.vetos?.map(() => (
                    <i style={{ color: "red" }} className="fa-solid fa-x"></i>
                  ))}
                </span>
              </td>
              {!veto && (
                <td colSpan={6}>
                  {!hasVetoed && !hasConfirmed && (
                    <span className="flex-horizontal-gap">
                      <button>Allow</button>
                      <button>Veto</button>
                    </span>
                  )}

                  {hasVetoed && (
                    <span className="flex-horizontal-gap vetoed">
                      <span>You vetoed!</span>
                      <button>Undo</button>
                    </span>
                  )}
                  {hasConfirmed && (
                    <span className="flex-horizontal-gap confirmed">
                      <span>You confirmed!</span>
                      <button>Undo</button>
                    </span>
                  )}
                </td>
              )}
              {veto && (
                <td colSpan={6}>
                  <span className="veto-label">VETO</span>
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Pick;
