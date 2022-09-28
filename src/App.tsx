import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Error from "./Views/Rushmore/Error";
import Home from "./Components/Home";
import Rushmore from "./Views/Rushmore";
import * as Realm from "realm-web"

export type View = "landing" | "join" | "history" | "create" | "log-in";

export const app = new Realm.App({id: "rushmore-mlahn"})

export interface CommonProps {
  setView: (view: View) => void;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error/>
  },
  {
    path: "/rushmore/:rushmoreId",
    element: <Rushmore />,
    errorElement: <Error/>
  },
  {
    path: "/rushmore/",
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
