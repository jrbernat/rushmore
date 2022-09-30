import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import "./index.css";

const RushmorePreview = (props: {
  rushmoreId: string;
  onClick: () => void;
}) => {
  const { rushmoreId, onClick } = props;
  const [creator, setCreator] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    app.currentUser?.functions.loadRushmore(rushmoreId).then(async (res) => {
      app.currentUser?.functions
        .getUserFromId(res.creator)
        .then((res: any) => setCreator(res.username));

      setTitle(res.title);
    });
  }, [rushmoreId]);

  return (
    <div className="invite" onClick={onClick}>
      <div className="invite-title">{title ?? "Loading..."}</div>
      {creator && <div className="inviter">owner: {creator}</div>}
    </div>
  );
};

const Invite = (props: { rushmoreId: string }) => {
  const nav = useNavigate();
  const onClick = () => {
    if (window.confirm("Join this Rushmore?")) {
      app.currentUser?.functions
        .acceptInvite(props.rushmoreId)
        .then(() => nav(`rushmore/${props.rushmoreId}`, { replace: true }));
    }
  };
  return <RushmorePreview rushmoreId={props.rushmoreId} onClick={onClick} />;
};

const Current = (props: { rushmoreId: string }) => {
  const nav = useNavigate();
  const onClick = () => {
    nav(`rushmore/${props.rushmoreId}`, { replace: true });
  };
  return <RushmorePreview rushmoreId={props.rushmoreId} onClick={onClick} />;
};

const Join = (props: CommonProps) => {
  const { setView } = props;

  const [userInfo, setUserInfo] = useState<any>({});

  useEffect(() => {
    app.currentUser?.functions.getUser().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const invites = userInfo?.rushmores?.filter((r: any) => r.accepted === false);
  const currents = userInfo?.rushmores?.filter((r: any) => r.accepted);

  return (
    <div className="join">
      <ExitButton onExit={() => setView("landing")} />
      <div className="subtitle">Your Rushmores</div>
      <div className="invites">
        <div className="flex-vertical-gap">
          {currents?.map((i: any) => (
            <Current rushmoreId={i.id} key={i.id} />
          ))}
        </div>
      </div>
      
      <div className="subtitle">Invites</div>
      <div className="invites">
        <div className="flex-vertical-gap">
          {invites?.map((i: any) => (
            <Invite rushmoreId={i.id} key={i.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Join;
