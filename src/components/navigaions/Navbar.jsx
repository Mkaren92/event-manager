import { Link } from "react-router-dom";
import { useAuth } from "../../store/auth-context.jsx";
import { useGeneral } from "../../store/general-context.jsx";
import { useSignOut } from "../../hooks/useAuthActions.js";
import logo from "../../assets/events.png";
import avatar from "../../assets/avatar.png";

export default function Navbar() {
  const { setLoading } = useGeneral();
  const { authUser, setSingOut } = useAuth();
  const signOut = useSignOut();

  async function handleSignOut() {
    setLoading(true);
    const done = await signOut();
    if (done) {
      setSingOut();
      setLoading(false);
    }
  }

  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-6 border-b border-gray-20">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <Link className="flex mr-4" to="/">
              <img src={logo} className="mr-3 h-8" alt="FlowBite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Event Manager
              </span>
            </Link>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={avatar}
                alt="user photo"
              />
            </button>
            <div
              className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {authUser.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {authUser.email}
                </span>
              </div>
              <ul
                className="py-1 text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <Link
                    to="/events/my"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    My events
                  </Link>
                </li>
              </ul>
              <ul
                className="py-1 text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <span
                    onClick={handleSignOut}
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    Sign out
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
