import { useEffect, useState } from "react";
import { app, View } from "../App";
import { ParseCookie } from "../parse-cookie";
import Create from "../Views/Create";
import Join from "../Views/Join";
import Landing from "../Views/Landing";
import LogIn from "../Views/LogIn";
import History from "../Views/History";
import Loading from "../Views/Loading";

const Home = () => {
  const [view, setView] = useState<View>("loading");

  useEffect(() => {
    if (view === "landing") {
      if (ParseCookie(document.cookie, "username") === undefined) {
        setView("log-in");
      }
    }
  }, [view]);

  const renderView = (view: View) => {
    switch (view) {
      case "log-in":
        return <LogIn setView={setView} />;
      case "landing":
        return <Landing setView={setView} />;
      case "join":
        return <Join setView={setView} />;
      case "history":
        return <History setView={setView} />;
      case "create":
        return <Create setView={setView} />;
      case "loading":
        return <Loading setView={setView} />;
    }
  };

  const renderFooter = () => {
    if (view === "log-in") return <div style={{ height: "5vh" /*TODO*/ }} />;
    return (
      <div className="footer">
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
      </div>
    );
  };
  return (
    <div className="App">
      <div className="body">{renderView(view)}</div>
      {renderFooter()}
    </div>
  );
};

export default Home;
