import { app } from "../../App";
import { ParseCookie } from "../../parse-cookie";
import { getPickIndex } from "../../Utils/Snakedraft";

interface PickProps {
  pick: any;
  i_literal: number; // actual index in .picks
  i_snake: number; // index not includeing vetoed picks
  picker: string;
  color: string;
  needsConfirmation: boolean;
  rushmoreId: string;
  refresh: () => void;
}

const Pick = (props: PickProps) => {
  const {
    pick,
    i_literal,
    i_snake,
    picker,
    color,
    needsConfirmation,
    rushmoreId,
    refresh,
  } = props;
  const likes = pick.likes?.length ?? 0;
  const dislikes = pick.dislikes?.length ?? 0;

  const hasVetoed = pick.vetos?.includes(app.currentUser?.id);
  const hasConfirmed = pick.confirms?.includes(app.currentUser?.id);

  const hasLiked = pick.likes?.includes(app.currentUser?.id);
  const hasDisliked = pick.dislikes?.includes(app.currentUser?.id);

  const react = (
    reaction: "like" | "dislike" | "veto" | "confirm",
    undo: boolean
  ) => {
    app.currentUser?.functions
      .react(rushmoreId, i_literal, reaction, undo)
      .then(refresh);
  };
  const like = () => {
    react("like", hasLiked);
  };

  const dislike = () => {
    react("dislike", hasDisliked);
  };

  const veto = () => {
    react("veto", hasVetoed);
  };

  const confirm = () => {
    react("confirm", hasConfirmed);
  };

  const wasVetoed = pick.vetos?.length > 1;
  const wasConfirmed = pick.confirms?.length > 1;

  return (
    <div>
      <table
        className={"pick" + (wasVetoed ? " veto" : "")}
        style={{ outlineColor: color, opacity: wasVetoed ? 0.4 : undefined }}
      >
        <tbody>
          <tr>
            <td colSpan={1}>{getPickIndex(i_snake)}</td>
            <td colSpan={3} style={{ color: color }}>
              {picker}
            </td>
            <td colSpan={6}>
              <div>{pick.pick}</div>
            </td>
          </tr>
          {!wasVetoed && (
            <tr>
              <td colSpan={4}></td>
              <td colSpan={2}>
                <span className="flex-horizontal-gap">
                  <i
                    className={`${
                      hasLiked ? "fa-solid" : "fa-regular"
                    } fa-thumbs-up`}
                    style={{ color: hasLiked ? color : undefined }}
                    onClick={like}
                  />
                  {likes}
                </span>
              </td>
              <td colSpan={2}>
                <span className="flex-horizontal-gap">
                  <i
                    className={`${
                      hasDisliked ? "fa-solid" : "fa-regular"
                    } fa-thumbs-down`}
                    style={{ color: hasDisliked ? color : undefined }}
                    onClick={dislike}
                  />
                  {dislikes}
                </span>
              </td>
            </tr>
          )}
          {needsConfirmation && (
            <tr>
              <td colSpan={4}>
                <span className="flex-horizontal-gap">
                  {pick.vetos?.map((_: any, ind: number) => (
                    <i
                      style={{ color: "red" }}
                      className="fa-solid fa-x"
                      key={ind}
                    ></i>
                  ))}
                  {pick.confirms?.map((_: any, ind: number) => (
                    <i
                      style={{ color: "green" }}
                      className="fa-solid fa-circle-check"
                      key={`check_${ind}`}
                    />
                  ))}
                </span>
              </td>
              {!wasVetoed &&
                picker !== ParseCookie(document.cookie, "username") && (
                  <td colSpan={6}>
                    {!hasVetoed && !hasConfirmed && (
                      <span className="flex-horizontal-gap">
                        <button onClick={confirm}>Allow</button>
                        <button onClick={veto}>Veto</button>
                      </span>
                    )}

                    {hasVetoed && (
                      <span className="flex-horizontal-gap vetoed">
                        <span>You vetoed!</span>
                        <button onClick={veto}>Undo</button>
                      </span>
                    )}
                    {hasConfirmed && (
                      <span className="flex-horizontal-gap confirmed">
                        <span>You confirmed!</span>
                        <button onClick={confirm}>Undo</button>
                      </span>
                    )}
                  </td>
                )}
            </tr>
          )}
          {wasVetoed && (
            <tr>
              <td colSpan={6}>
                <span className="veto-label">VETO</span>
              </td>
            </tr>
          )}
          {needsConfirmation && !wasConfirmed && !wasVetoed && (
            <tr>
              <td colSpan={1} />
              <td colSpan={8}>This pick is pending confirmation</td>
              <td colSpan={1} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Pick;
