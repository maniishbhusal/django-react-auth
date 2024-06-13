import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import Layout from "./components/pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginReg from "./components/pages/auth/LoginReg";
import SendPasswordResetEmail from "./components/pages/auth/SendPasswordResetEmail";
import ResetPassword from "./components/pages/auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <LoginReg />,
      },
      {
        path: "sendpasswordresetemail",
        element: <SendPasswordResetEmail />,
      },
      {
        path: "reset/:uid/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
