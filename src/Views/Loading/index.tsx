import { useEffect } from "react";
import { CommonProps } from "../../App";
import { ParseCookie } from "../../parse-cookie";

const Loading = (props: CommonProps) => {
  const { setView } = props;
  useEffect(() => {
    if (ParseCookie(document.cookie, "username")) {
      setView("landing");
    } else {
      setView("log-in");
    }
  });

  return <div>Loading</div>;
};

export default Loading;
