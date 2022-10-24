import { useEffect, useState } from "react";
import { app, CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput from "../../Components/TextInput";
import Friend from "./Friend";
import FriendRequest from "./FriendRequest";

interface FriendsProps extends CommonProps {}

const Friends = (props: FriendsProps) => {
  const { setView } = props;

  const [userInfo, setUserInfo] = useState<any>({});

  const load = () =>
    app.currentUser?.functions.getUser().then((res) => {
      setUserInfo(res);
    });

  useEffect(() => {
    load();
  }, []);

  const friends = userInfo.friends;
  const friendRequests = userInfo.friendRequests;

  const addFriend = (usr: string) => {
    app.currentUser?.functions.addFriend(usr).then((res) => {
      console.log(res);
    });
  };

  const acceptRequest = (usr: string) => {
    app.currentUser?.functions.acceptFriendRequest(usr).then((res) => {
      load();
      console.log(res);
    });
  };

  return (
    <div className="join">
      <ExitButton onExit={() => setView("landing")} />
      <div className="subtitle">Your Friends</div>
      <div className="invites">
        <div className="flex-vertical-gap">
          {friends?.map((i: any) => (
            <Friend id={i} />
          ))}
        </div>
      </div>

      <div className="subtitle">Requests</div>
      <div className="invites">
        <div className="flex-vertical-gap">
          {friendRequests?.map((i: any) => (
            <FriendRequest id={i} onAccept={acceptRequest} onDeny={() => {}} />
          ))}
        </div>
      </div>
      <TextInput onSubmit={addFriend} description={"Add a Friend"} />
    </div>
  );
};

export default Friends;
