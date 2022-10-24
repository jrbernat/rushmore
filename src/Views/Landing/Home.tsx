import { useContext, useEffect, useState } from "react";
import { app, UserContext, View } from "../../App";
import Create from "../Create";
import History from "../History";
import Join from "../Join";
import Landing from ".";
import LogIn from "../LogIn";
import Popup from "../../Components/PopUp";
import Friends from "../Friends";

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
      case "friends":
        return <Friends setView={setView}/>
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
