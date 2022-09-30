import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../App";
import ExitButton from "../../Components/ExitButton";
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
}

const Rushmore = () => {
  const { rushmoreId } = useParams();

  const [view, setView] = useState<ViewMode>("loading");
  const [rushmore, setRushmore] = useState<any>(undefined);

  const [refreshRate, setRefreshRate] = useState(0);

  const autoRefresh = () => {
    console.log("refresh")
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
  };

  // triggers the initial change to refreshRate for useEffect below
  useEffect(() => {
    autoRefresh();
    setRefreshRate(20000);
  }, []);

  useEffect(() => {
    if (refreshRate > 0) setInterval(autoRefresh, refreshRate);
    return () => setRefreshRate(0);
  }, [refreshRate]);

  useEffect(() => {
    if (!rushmore) {
      return;
    }
    if (rushmore.finished) {
      return setView("finished");
    }
    if (rushmore.started) {
      if (rushmore.members.include(app.currentUser?.id)) {
        return setView("edit");
      } else {
        return setView("none");
      }
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
        return <div>Make your pick!</div>;
      case "not started":
        return <PreStart id={rushmoreId!} rushmore={rushmore} />;
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
