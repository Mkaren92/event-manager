import { useRef } from "react";
import Container from "../../components/ui/Container";
import { fetchUserAttributes } from "aws-amplify/auth";
import { useAuth } from "../../store/auth-context.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../../hooks/useAuthActions.js";
import { useGeneral } from "../../store/general-context.jsx";

export default function SignIn() {
  const { setLoading } = useGeneral();
  const email = useRef();
  const password = useRef();
  const { setAuthUser, setIsSignedIn } = useAuth();
  const navigate = useNavigate();
  const signIn = useSignIn();

  async function handleSubmit(event) {
    event.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    setLoading(true)
    const isSignedIn = await signIn(emailValue, passwordValue);
    if (isSignedIn) {
      const currentUser = await fetchUserAttributes();
      setAuthUser(currentUser);
      setIsSignedIn(true);
      setLoading(false)
      navigate("/");
    }
  }

  return (
    <Container>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    ref={email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    ref={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                    to="/auth/signup"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
