import { useContext, useEffect, useState } from "react";
import { app, UserContext, View } from "../App";
import Create from "../Views/Create";
import History from "../Views/History";
import Join from "../Views/Join";
import Landing from "../Views/Landing";
import LogIn from "../Views/LogIn";
import Popup from "./PopUp";

const Home = (props: { refreshUser: () => Promise<any> }) => {
  const { refreshUser } = props;
  const [view, setView] = useState<View>("landing");

  const user = useContext(UserContext);

  const renderView = (view: View) => {
    if (!user?.isLoggedIn) return <LogIn refreshUser={refreshUser} />;
    switch (view) {
      case "landing":
        return <Landing setView={setView} />;
      case "join":
        return <Join setView={setView} />;
      case "history":
        return <History setView={setView} />;
      case "create":
        return <Create setView={setView} />;
    }
  };

  const renderFooter = () => {
    if (!user?.isLoggedIn) return <div className="footer" />;
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
