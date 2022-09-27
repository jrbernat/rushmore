import { useState } from "react";
import { CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput from "../../Components/TextInput";
import "./index.css";

type State = "username" | "password";

const checkPassword = (user: string, pass: string) => {
  return user !== "";
};

const LogIn = (props: CommonProps) => {
  const { setView } = props;
  const [state, setState] = useState<State>("username");
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const onUsername = (text: string | undefined) => {
    if (text !== undefined && text != "") {
      setState("password");
      setUserName(text);
      console.log(text);
    }
  };

  const onPassword = (password: string) => {
    if (userName === undefined) return;
    if (checkPassword(userName, password)) {
      document.cookie = "username=" + userName;
      setView("landing");
    }
  };

  return (
    <div className="log-in">
      {state === "password" && (
        <ExitButton
          onExit={() => {
            setState("username");
            setUserName(undefined);
          }}
        />
      )}
      {state === "username" && (
        <TextInput description="Enter Username" onSubmit={onUsername} />
      )}
      {state === "password" && (
        <TextInput description="Enter Password" onSubmit={onPassword} />
      )}
    </div>
  );
};

export default LogIn;
