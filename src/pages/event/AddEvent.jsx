import { useRef } from "react";
import Container from "../../components/ui/Container";
import { createEvent } from "../../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { useAuth } from "../../store/auth-context.jsx";
import { useEvent } from "../../store/event-context.jsx";
import { useNavigate } from "react-router-dom";
const client = generateClient();

export default function AddEvent() {
  const navigate = useNavigate();
  const name = useRef();
  const start = useRef();
  const description = useRef();
  const { authUser } = useAuth();
  const { addEvent } = useEvent();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const eventObj = {
        name: name.current.value,
        description: description.current.value,
        start: start.current.value,
        author: `${authUser.name} ${authUser.family_name}`,
        authorId: authUser.sub,
      };

      const res = await client.graphql({
        query: createEvent,
        variables: {
          input: eventObj,
        },
      });

      addEvent(res.data.createEvent);
      navigate("/events/my");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new event
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Name
                </label>
                <input
                  ref={name}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type event name"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start date
                </label>
                <input
                  ref={start}
                  type="date"
                  id="start"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  ref={description}
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-gray-900 hover:bg-gray-800"
            >
              Add event
            </button>
          </form>
        </div>
      </section>
    </Container>
  );
}
