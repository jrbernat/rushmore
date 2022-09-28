import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExitButton from "../../Components/ExitButton";

type ViewMode = "loading" | "none" | "edit" | "view" | "dne";

const Rushmore = () => {
  const { rushmoreId} = useParams()

  const [view, setView] = useState<ViewMode>("loading");
  

  useEffect(() => {
    // load the id

    // if found, check if user is a viewer or participant
    // and set view
  }, [rushmoreId])

  const nav = useNavigate();

  const RenderView = () => {
    switch(view) {
      case "loading":
        return <div>Loading...</div>
      case "none":
        return <div>Sorry, you cannot access this rushmore. Please ask the owner to invite you.</div>
      case "dne":
        return <div>This rushmore does not exist</div>
      case "view":
        return <div>Rank the participants!</div>
      case "edit":
        return <div>Make your pick!</div>
    }
  }

  return (
    <div>
      <ExitButton onExit={() => {nav("/", {replace: true})}} />
      {RenderView()}
    </div>
  );
};

export default Rushmore;
