import { useEffect } from "react";
import { Navigate, useRoutes, useNavigate } from "react-router-dom";

import { useAppSelector } from "hooks/reduxHooks";
import Home from "pages/Home";
import Main from "layouts/Main";
import Tweet from "pages/Tweet";

export default function Router() {
  const loggedIn = useAppSelector(({ auth }) => auth.loggedIn);

  return useRoutes([
    {
      path: "/",
      element: <Main />,
      children: [
        { element: <Navigate to="/home" replace /> },
        { path: "/home", element: <Home /> },
        { path: "/status/:id", element: <Tweet /> }
      ]
    },
    // {
    //   path: "/home",
    //   element: loggedIn ? <Home /> : <Navigate to="/login" replace />,
    //   children: [
    //     { path: "", element: <Navigate to="/home/messages" replace /> },
    //     { path: "messages", element: <MessageList /> },
    //     { path: "settings", element: <Settings /> }
    //   ]
    // },
    // {
    //   path: "/",
    //   children: [
    //     { path: "/", element: <Navigate to="/home" /> },
    //     {
    //       path: "login",
    //       element: !loggedIn ? <Login /> : <Navigate to="/" replace />,
    //     },
    //     {
    //       path: "signup",
    //       element: <Signup />,
    //     },
    //     {
    //       path: "m/:username",
    //       element: <SendMessage />
    //     },
    //     {
    //       path: "set-email",
    //       element: <SetEmail />
    //     },
    //     {
    //       path: "verify",
    //       element: <VerifyEmail />
    //     }
    //   ],
    // },
  ]);
}
