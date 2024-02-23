import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useGeneral } from "../store/general-context.jsx";
import { useAuth } from "../store/auth-context.jsx";
import RootLayout from "../layout/Root";
import AuthLayout from "../layout/Auth";
import HomePage from "../pages/Home";
import MyEventsPage from "../pages/event/MyEvents";
import AddEventPage from "../pages/event/AddEvent";
import UpdateEventPage from "../pages/event/UpdateEvent";
import SignInPage from "../pages/auth/SignIn";
import SignUpPage from "../pages/auth/SignUp";

export default function AppRouter() {
  const { isSignedIn, setIsSignedIn } = useAuth();
  const { setLoading } = useGeneral();

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        setLoading(true);
        await getCurrentUser();
        setIsSignedIn(true);
      } catch (error) {
        console.log();
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
  }, [setIsSignedIn, setLoading]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isSignedIn ? <RootLayout /> : <Navigate to="/auth/signin" />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/events/my",
          element: <MyEventsPage />,
        },
        { path: "/events/add", element: <AddEventPage /> },
        { path: "/events/update/:id", element: <UpdateEventPage /> },
      ],
    },
    {
      path: "/auth",
      element: !isSignedIn ? <AuthLayout /> : <Navigate to="/" />,
      children: [
        { path: "/auth/signin", element: <SignInPage /> },
        { path: "/auth/signup", element: <SignUpPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
