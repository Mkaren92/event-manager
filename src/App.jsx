import Router from "./router/Router.jsx";
import Loading from "./components/ui/Loading";
import { useGeneral } from "./store/general-context.jsx";

export default function App() {
  const { loading } = useGeneral();
  return (
    <>
      {loading && <Loading />}
      <Router />
    </>
  );
}
