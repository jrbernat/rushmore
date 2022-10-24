import { useState } from "react";
import { RushmoreProps } from ".";
import { app } from "../../App";
import Popup from "../../Components/PopUp";
import TextInput from "../../Components/TextInput";
import { CapitalizeFirst } from "../../Utils/String";
import "./index.css";
import Inviter from "./Inviter";

const Members = (props: { members: string[] }) => {
  return (
    <div className="members flex-vertical-gap">
      <div>Current Members:</div>
      {[...props.members].map((n) => (
        <span key={n}>{n}</span>
      ))}
    </div>
  );
};

const StartBox = (props: RushmoreProps) => {
  const { id, rushmore } = props;

  const isOwner = app.currentUser?.id === rushmore.creator;

  const startRushmore = () => {
    app.currentUser?.functions
      .startRushmore(id)
      .then((res) => console.log(res));
  };
  if (isOwner) return <button onClick={startRushmore}>Start Rushmore</button>;

  return <div>Waiting for the owner to start!</div>;
};

const PreStart = (props: RushmoreProps) => {
  const { rushmore, id, forceRefresh } = props;

  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <div className="pre-start">
      <Popup
        open={inviteModalOpen}
        content={<Inviter rushmore={rushmore} id={id} forceRefresh={forceRefresh}/>}
        onClose={() => setInviteModalOpen(false)}
      />
      <div className="pre-start-body">
        <div className="subtitle">Rushmore of</div>
        <div className="topic">{CapitalizeFirst(rushmore.title)}</div>
        <div className="description">Description: {rushmore.description}</div>
        <Members members={rushmore.members} />
        {rushmore.members.length < 4 && (
          <button onClick={() => setInviteModalOpen(true)}>Invite</button>
        )}
        {rushmore.members.length === 4 && (
          <StartBox rushmore={rushmore} id={id} forceRefresh={forceRefresh} />
        )}
      </div>
      <div className="pre-start-footer">
        <div>This Rushmore hasn't started yet... Invite friends and start!</div>
      </div>
    </div>
  );
};

export default PreStart;
