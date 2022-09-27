import { useEffect, useState } from "react";
import "./App.css";
import Landing from "./Views/Landing";
import History from "./Views/History";
import Join from "./Views/Join";
import Rushmore from "./Views/Rushmore";
import Create from "./Views/Create";
import { ParseCookie } from "./parse-cookie";
import LogIn from "./Views/LogIn";

export type View =
  | "landing"
  | "join"
  | "rushmore"
  | "history"
  | "create"
  | "log-in";

export interface CommonProps {
  setView: (view: View) => void;
}

function App() {
  const [view, setView] = useState<View>("log-in");

  const renderView = (view: View) => {
    if (ParseCookie(document.cookie, "username")) {
      if (view === "log-in") {
        setView("landing");
      }
      switch (view) {
        case "log-in":
        case "landing":
          return <Landing setView={setView} />;
        case "join":
          return <Join setView={setView} />;
        case "rushmore":
          return <Rushmore setView={setView} id={0} />;
        case "history":
          return <History setView={setView} />;
        case "create":
          return <Create setView={setView} />;
      }
    } else {
      return <LogIn setView={setView} />;
    }
  };

  const renderFooter = () => {
    if (view === "log-in") return <></>;
    return (
      <footer>
        <span
          onClick={() => {
            document.cookie = "username=";
            setView("log-in");
            console.log("ojadsf");
          }}
        >
          log out
        </span>
        <span>{ParseCookie(document.cookie, "username")}</span>
      </footer>
    );
  };
  return (
    <div className="App">
      <body>{renderView(view)}</body>
      {renderFooter()}
    </div>
  );
}

export default App;
