import { useContext, useEffect, useState } from "react";
import { app, UserContext, View } from "../App";
import Create from "../Views/Create";
import History from "../Views/History";
import Join from "../Views/Join";
import Landing from "../Views/Landing";
import Loading from "../Views/Loading";
import LogIn from "../Views/LogIn";

const Home = (props: { refreshUser: () => Promise<any> }) => {
  const { refreshUser } = props;
  const [view, setView] = useState<View>("loading");

  const user = useContext(UserContext);

  useEffect(() => {
    if (!user?.isLoggedIn) {
      setView("log-in");
    }
  }, [user]);

  const renderView = (view: View) => {
    switch (view) {
      case "log-in":
        return <LogIn setView={setView} refreshUser={refreshUser} />;
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
            app.currentUser?.logOut().then(() => refreshUser());
          }}
        >
          log out
        </span>
        <span>{user?.username}</span>
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
