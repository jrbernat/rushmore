import { useState } from "react";
import { app, CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput from "../../Components/TextInput";
import * as Realm from "realm-web";
import "./index.css";

type State =
  | "username"
  | "password"
  | "createEmail"
  | "createPass"
  | "createUsername";

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

const validateUsername = (s: string | undefined) => {
  if (s) {
    if (!s.match(/^[0-9a-z]+$/)) {
      return false;
    }
    return true;
  }
  return false;
};

const validateEmail = (email: string | undefined) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (s: string | undefined) => {
  return true; // todo
};

const LogIn = (props: CommonProps) => {
  const { setView } = props;
  const [state, setState] = useState<State>("username");
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onUsername = (text: string | undefined) => {
    if (validateEmail(text)) {
      setState("password");
      setEmail(text);
    }
  };

  const onPassword = async (password: string) => {
    if (email === undefined) return;
    if (await checkPassword(email, password)) {
      app.currentUser?.functions
        .getUser()
        .then((res) => {
          console.log(res)
          if (res && res.username) {
            const { username } = res;
            document.cookie = `username=${username}`;
            setView("landing");
          } else {
            setState("createUsername");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onNewEmail = (text: string | undefined) => {
    if (validateEmail(text)) {
      setEmail(text);
      setState("createPass");
    }
  };

  const onNewPassword = async (password: string | undefined) => {
    if (validatePassword(password)) {
      app.emailPasswordAuth
        .registerUser({ email: email!, password: password! })
        .then(async () => {
          await checkPassword(email!, password!);
          setState("createUsername");
        })
        .catch((err) => {
          console.log(err); // todo notify
        });
    }
  };

  const onNewUsername = (username: string | undefined) => {
    if (validateUsername(username)) {
      app.currentUser?.functions
        .addUser(username)
        .then((res) => {
          console.log(res);
          if (res.error) {
            throw Error("Username Taken");
          }
          document.cookie = `username=${username}`;
          setView("landing")
        })
        .catch((err) => console.log(err))
    }
  };

  return (
    <div className="log-in">
      <div className="title">RUSHMORE</div>
      {state !== "username" && (
        <ExitButton
          onExit={() => {
            setState("username");
            setEmail(undefined);
          }}
        />
      )}
      {state === "username" && (
        <TextInput description="Enter Email" onSubmit={onUsername} />
      )}
      {state === "username" && (
        <div className="login-footer">
          <div
            className="create-account-button"
            onClick={() => setState("createEmail")}
          >
            Create Account
          </div>
        </div>
      )}
      {state === "password" && (
        <TextInput description="Enter Password" onSubmit={onPassword} />
      )}
      {state === "createEmail" && (
        <div>
          <TextInput description="Enter your email" onSubmit={onNewEmail} />
        </div>
      )}
      {state === "createPass" && (
        <div>
          <TextInput description="Create a password" onSubmit={onNewPassword} />
        </div>
      )}
      {state === "createUsername" && (
        <div>
          <TextInput description="Create a username" onSubmit={onNewUsername} />
        </div>
      )}
    </div>
  );
};

export default LogIn;
