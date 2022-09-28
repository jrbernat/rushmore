import { useState } from "react";
import { app, View } from "../App";
import { ParseCookie } from "../parse-cookie";
import Create from "../Views/Create";
import Join from "../Views/Join";
import Landing from "../Views/Landing";
import LogIn from "../Views/LogIn";
import History from "../Views/History";

const Home = () => {
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
    if (view === "log-in") return <div style={{ height: "5vh" /*TODO*/ }} />;
    return (
      <footer>
        <span
          onClick={() => {
            if (app.currentUser) app.removeUser(app.currentUser);
            document.cookie = "username=";
            setView("log-in");
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
};

export default Home;
