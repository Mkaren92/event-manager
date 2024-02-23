import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";

export default function Auth() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return <Outlet />;
}
