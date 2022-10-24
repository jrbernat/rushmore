import { useEffect, useState } from "react";
import { app } from "../../App";
import "./index.css"

export interface FriendProps {
    id: string;
}


const Friend = (props: FriendProps) => {
    const { id } = props;
  
    const [username, setUsername] = useState("");
  
    useEffect(() => {
      app.currentUser?.functions
        .getUserFromId(id)
        .then((res) => setUsername(res.username));
    }, []);
  
    return (
      <div className="friend">
        <span>{username}</span>
      </div>
    );
  };

  export default Friend;