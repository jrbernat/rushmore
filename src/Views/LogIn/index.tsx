import { useState } from "react";
import { app, CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput from "../../Components/TextInput";
import * as Realm from "realm-web";
import "./index.css";
import { request } from "https";

const GET_USER =
  "https://us-east-1.aws.data.mongodb-api.com/app/rushmore-mlahn/endpoint/getUser";

type State = "username" | "password";

const checkPassword = async (user: string, pass: string) => {
  const credentials = Realm.Credentials.emailPassword(user, pass);
  try {
    const user = await app.logIn(credentials);
    const currentUser = app.currentUser;
    console.assert(user.id === currentUser?.id);
    return true;
  } catch {
    return false;
  }
};

const LogIn = (props: CommonProps) => {
  const { setView } = props;
  const [state, setState] = useState<State>("username");
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const onUsername = (text: string | undefined) => {
    if (text !== undefined && text !== "") {
      setState("password");
      setUserName(text);
      console.log(text);
    }
  };

  const onPassword = async (password: string) => {
    if (userName === undefined) return;
    if (await checkPassword(userName, password)) {

      app.currentUser?.functions.getUser().then((res) => {
        console.log(res)
      });

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
        <TextInput description="Enter Email" onSubmit={onUsername} />
      )}
      {state === "password" && (
        <TextInput description="Enter Password" onSubmit={onPassword} />
      )}
    </div>
  );
};

export default LogIn;
