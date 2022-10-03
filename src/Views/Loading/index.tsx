import { useContext, useEffect } from "react";
import { CommonProps, UserContext } from "../../App";

const Loading = (props: CommonProps) => {
  const { setView } = props;

  const user = useContext(UserContext)
  useEffect(() => {
    if (user?.isLoggedIn) {
      setView("landing");
    } else {
      setView("log-in");
    }
  }, [user]);

  return <div>Loading</div>;
};

export default Loading;
