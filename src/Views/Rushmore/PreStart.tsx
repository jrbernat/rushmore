import { RushmoreProps } from ".";
import { app } from "../../App";
import TextInput from "../../Components/TextInput";
import { CapitalizeFirst } from "../../Utils/String";

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

const InviteBox = (props: { id: string }) => {
  const { id } = props;

  return (
    <div className="invite-box">
      <TextInput
        description="invite a player"
        onSubmit={(username) => {
          app.currentUser?.functions
            .inviteUser(id, username)
            .then(() => {
              // notify "invite sent!"
              //
            })
            .catch((err) => console.log(err));
        }}
      />
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
  const { rushmore, id , forceRefresh} = props;
  return (
    <div className="pre-start">
      <div className="pre-start-body">
        <div className="subtitle">Rushmore of</div>
        <div className="topic">{CapitalizeFirst(rushmore.title)}</div>
        <div className="description">Description: {rushmore.description}</div>
        <Members members={rushmore.members} />
        {rushmore.members.length < 4 && (
          <InviteBox id={id} />
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
