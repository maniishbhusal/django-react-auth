import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

const AppRouter = () => {
  const { access_token } = useSelector((state) => state.auth);
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
          element: !access_token ? <LoginReg /> : <Navigate to="/dashboard" />,
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
      element: access_token ? <Dashboard /> : <Navigate to="/login" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
