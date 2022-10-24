import { useContext, useEffect, useState } from "react";
import { app, CommonProps, UserContext } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput from "../../Components/TextInput";
import * as Realm from "realm-web";
import "./index.css";

type State =
  | "username"
  | "password"
  | "createEmail"
  | "createPass"
  | "createUsername"
  | "enterPhoneNumber";

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

const validatePhoneNumber = (s: string | undefined) => {
  if (!s?.startsWith("+1")) {
    return false;
  }
  if (s?.length !== 12) {
    return false;
  }
  return true;
};

interface LoginProps {
  refreshUser: () => Promise<any>;
}

const LogIn = (props: LoginProps) => {
  const { refreshUser } = props;
  const [state, setState] = useState<State>("username");
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  const onUsername = (text: string | undefined) => {
    if (validateEmail(text)) {
      setState("password");
      setEmail(text);
    }
  };

  const onPassword = async (password: string) => {
    if (email === undefined) return;
    if (await checkPassword(email, password)) {
      refreshUser().then((res) => {
        if (!res?.username) {
          setState("createUsername");
        }
      });
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
        .then(() => {
          checkPassword(email!, password!).then((res) => {
            if (res) setState("createUsername");
          });
        })
        .catch((err) => {
          console.log(err); // todo notify
        });
    }
  };

  const onNewUsername = (username: string | undefined) => {
    if (validateUsername(username)) {
      setUsername(username);
      setState("enterPhoneNumber");
    } else {
      console.log("invalid username"); // todo
    }
  };

  const onPhoneNumber = (phoneNumber: string | undefined) => {
    if (validatePhoneNumber(phoneNumber)) {
      app.currentUser?.functions
        .addUser(username, phoneNumber)
        .then((res) => {
          if (res.error) {
            throw Error("Username Taken");
          }
          refreshUser();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="log-in">
      <div className="title-container">
        <div className="log-in-title">Welcome to Rushmore!</div>
        Please log in or create an account
      </div>
      <div className="log-in-body">
        {state !== "username" && (
          <ExitButton
            onExit={() => {
              setState("username");
              setEmail(undefined);
            }}
          />
        )}
        {state === "username" && (
          <TextInput description="Email" onSubmit={onUsername} type="email" />
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
          <TextInput
            description="Password"
            onSubmit={onPassword}
            type="password"
          />
        )}
        {state === "createEmail" && (
          <div>
            <TextInput
              description="Please enter your email"
              onSubmit={onNewEmail}
              type="email"
            />
          </div>
        )}
        {state === "createPass" && (
          <div>
            <TextInput
              description="Create a password"
              onSubmit={onNewPassword}
              type="password"
            />
          </div>
        )}
        {state === "createUsername" && (
          <div>
            <TextInput
              description="Create a username"
              onSubmit={onNewUsername}
            />
          </div>
        )}
        {state === "enterPhoneNumber" && (
          <div>
            <TextInput
              description="Enter phone number"
              onSubmit={onPhoneNumber}
              type="tel"
              defaultText="+1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
