import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
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
  {
    path: "dashboard",
    element: <Dashboard />,
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
