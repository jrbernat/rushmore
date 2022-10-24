import { useEffect, useState } from "react";
import { RushmoreProps } from ".";
import { app } from "../../App";
import Friend from "../Friends/Friend";
import "./index.css";

const Inviter = (props: RushmoreProps) => {
  const { rushmore, id } = props;
  const [userInfo, setUserInfo] = useState<any>(undefined);

  useEffect(() => {
    app.currentUser?.functions.getUser().then((res) => setUserInfo(res));
  }, []);

  if (userInfo === undefined) return <span>loading</span>;

  return (
    <div className="inviter">
      <div className="invite-friends">
        {userInfo.friends.map((f: string) => (
          <div className="friend-invite">
            <Friend id={f} />
            <button
              onClick={() => {
                app.currentUser?.functions.inviteUser(id, f).then((res) => {
                  console.log(res);
                });
              }}
            >
              Invite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inviter;
