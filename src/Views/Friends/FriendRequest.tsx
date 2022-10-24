import { useEffect, useState } from "react";
import { app } from "../../App";
import { FriendProps } from "./Friend";
import "./index.css"

interface FriendRequestProps extends FriendProps {
  onAccept: (u: string) => void;
  onDeny: (u: string) => void;
}

const FriendRequest = (props: FriendRequestProps) => {
  const { id, onAccept, onDeny } = props;

  const [username, setUsername] = useState("");

  useEffect(() => {
    app.currentUser?.functions
      .getUserFromId(id)
      .then((res) => setUsername(res.username));
  }, []);

  return (
    <div className="friend-request">
      <span>{username}</span>
      <span>
        <button onClick={() => onAccept(id)}>accept</button>
        <button onClick={() => onDeny(id)}>deny</button>
      </span>
    </div>
  );
};

export default FriendRequest;
