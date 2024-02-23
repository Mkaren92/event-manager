import Container from "../../components/ui/Container";
import FloatingButton from "../../components/ui/FloatingButton";
import PlusIcon from "../../components/icons/PlusIcon";
import MyEvent from "../../components/events/MyEvent";
import { useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listEvents } from "../../graphql/queries";
import { sortedEvents } from "../../utility/helpers";
import { useEvent } from "../../store/event-context";
import { getCurrentUser } from "aws-amplify/auth";
const client = generateClient();

export default function MyEvents() {
  const { myEvents, setMyEvents } = useEvent();

  useEffect(() => {
    async function fetchData() {
      try {
        const currentuser = await getCurrentUser();
        const res = await client.graphql({
          query: listEvents,
          variables: {
            filter: { authorId: { eq: currentuser.userId } },
          },
        });
        setMyEvents(sortedEvents(res.data.listEvents.items));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setMyEvents]);

  return (
    <Container>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Event name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Start
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myEvents.map((event) => (
                    <MyEvent key={event.id} data={event}></MyEvent>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <FloatingButton path="/events/add" icon={PlusIcon}></FloatingButton>
    </Container>
  );
}
