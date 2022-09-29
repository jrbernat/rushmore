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
}

const Rushmore = () => {
  const { rushmoreId } = useParams();

  const [view, setView] = useState<ViewMode>("loading");
  const [rushmore, setRushmore] = useState<any>(undefined);

  useEffect(() => {
    // load the id
    app.currentUser?.functions
      .loadRushmore(rushmoreId)
      .then((res) => {
        console.log(res)
        if (res) {
          setRushmore(res);
        } else {
          setView("dne");
        }
      })
      .catch(() => {
        setView("dne");
      });

    // if found, check if user is a viewer or participant
    // and set view
  }, [rushmoreId]);

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
        return <PreStart rushmore={rushmore} />;
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
