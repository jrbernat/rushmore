import { createContext, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Realm from "realm-web";
import "./App.css";
import Home from "./Views/Landing/Home";
import { User } from "./protocol";
import Rushmore from "./Views/Rushmore";
import Error from "./Views/Rushmore/Error";

export type View = "landing" | "join" | "history" | "create" | "friends";

export const app = new Realm.App({ id: "rushmore-mlahn" });

export const UserContext = createContext<User | undefined>(undefined);

export interface CommonProps {
  setView: (view: View) => void;
}

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  const updateUser = async () => {
    if (app.currentUser?.isLoggedIn) {
      return app.currentUser.functions.getUser().then((res) => {
        if (app.currentUser) {
          const u = {
            id: String(app.currentUser.id),
            username: res.username,
            isLoggedIn: app.currentUser.isLoggedIn,
          };

          setUser(u);
          return u;
        } else setUser(undefined);
      });
    } else {
      setUser(undefined);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home refreshUser={updateUser} />,
      errorElement: <Error />,
    },
    {
      path: "/rushmore/:rushmoreId",
      element: <Rushmore />,
      errorElement: <Error />,
    },
    {
      path: "/rushmore/",
      element: <Error />,
    },
  ]);

  return (
    <UserContext.Provider value={user}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
