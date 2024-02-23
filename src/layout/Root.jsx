import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { initFlowbite } from "flowbite";
import { useAuth } from "../store/auth-context.jsx";
import EventContextProvider from "../store/event-context.jsx";
import Navbar from "../components/navigaions/Navbar.jsx";

export default function Root() {
  const { setAuthUser } = useAuth();

  useEffect(() => {
    initFlowbite();
  }, []);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const data = await fetchUserAttributes();
        setAuthUser(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCurrentUser();
  }, [setAuthUser]);

  return (
    <EventContextProvider>
      <Navbar />
      <Outlet />
    </EventContextProvider>
  );
}
