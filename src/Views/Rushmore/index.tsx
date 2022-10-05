import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../App";
import ExitButton from "../../Components/ExitButton";
import Active from "./Active";
import "./index.css";
import PreStart from "./PreStart";

type ViewMode =
  | "loading"
  | "none"
  | "edit"
  | "view" // todo
  | "dne"
  | "not started"
  | "finished";

export interface RushmoreProps {
  rushmore: any;
  id: string;
  forceRefresh: () => void;
}

const Rushmore = () => {
  const { rushmoreId } = useParams();

  const [view, setView] = useState<ViewMode>("loading");
  const [rushmore, setRushmore] = useState<any>(undefined);

  const autoRefresh = () => {
    if (!document.hidden && rushmoreId) {
      console.log("refresh");
      // load the id
      app.currentUser?.functions
        .loadRushmore(rushmoreId)
        .then((res) => {
          if (res) {
            if (res != rushmore) setRushmore(res);
          } else {
            setView("dne");
          }
        })
        .catch(() => {
          setView("dne");
        });
    }
  };

  // triggers the initial change to refreshRate for useEffect below
  useEffect(() => {
    console.log("mount");
    autoRefresh();
    setInterval(autoRefresh, 20000);
  }, []);

  useEffect(() => {
    if (!rushmore) {
      return;
    }
    if (rushmore.finished) {
      return setView("finished");
    }
    if (rushmore.started) {
      app.currentUser?.functions.getUser().then((userInfo) => {
        if (rushmore.members.includes(userInfo.username)) {
          return setView("edit");
        } else {
          console.log(rushmore.members, app.currentUser?.id);
          return setView("none");
        }
      });
    } else {
      return setView("not started");
    }
  }, [rushmore]);

  const nav = useNavigate();

  const RenderView = () => {
    switch (view) {
      case "loading":
        return <div>Loading...</div>;
      case "none":
        return (
          <div>
            Sorry, you cannot access this rushmore. Please ask the owner to
            invite you.
          </div>
        );
      case "dne":
        return <div>This rushmore does not exist</div>;
      case "view":
        return <div>Rank the participants!</div>;
      case "edit":
        return (
          <Active
            id={rushmoreId!}
            rushmore={rushmore}
            forceRefresh={autoRefresh}
          />
        );
      case "not started":
        return (
          <PreStart
            id={rushmoreId!}
            rushmore={rushmore}
            forceRefresh={autoRefresh}
          />
        );
    }
  };

  return (
    <div className="App">
      <div className="rushmore">
        <ExitButton
          onExit={() => {
            nav("/", { replace: true });
          }}
        />
        {RenderView()}
      </div>
    </div>
  );
};

export default Rushmore;
