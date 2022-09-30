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

const InviteBox = (props: RushmoreProps) => {
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

const PreStart = (props: RushmoreProps) => {
  const { rushmore, id } = props;
  return (
    <div className="pre-start">
      <div className="pre-start-body">
        <div className="subtitle">Rushmore of</div>
        <div className="topic">{CapitalizeFirst(rushmore.title)}</div>
        <div className="description">Description: {rushmore.description}</div>
        <Members members={rushmore.members} />
        {rushmore.members.length < 4 && (
          <InviteBox rushmore={rushmore} id={id} />
        )}
      </div>
      <div className="pre-start-footer">
        <div>This Rushmore hasn't started yet... Invite friends and start!</div>
      </div>
    </div>
  );
};

export default PreStart;
