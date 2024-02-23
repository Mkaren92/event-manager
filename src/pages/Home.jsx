import { useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { sortedEvents } from "../utility/helpers";
import { useEvent } from "../store/event-context";
import { listEvents } from "../graphql/queries";
import Container from "../components/ui/Container";
import FloatingButton from "../components/ui/FloatingButton";
import PlusIcon from "../components/icons/PlusIcon";
import Event from "../components/events/Event";

const client = generateClient();

export default function Home() {
  const { events, setEvents } = useEvent();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await client.graphql({
          query: listEvents,
          authMode: "apiKey",
        });

        setEvents(sortedEvents(res.data.listEvents.items));
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchData();
  }, [setEvents]);

  return (
    <Container>
      <FloatingButton path="/events/add" icon={PlusIcon}></FloatingButton>
      <section className="bg-white dark:bg-gray-900">
        <div className="p-4 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Events
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {events.map((event) => (
              <Event key={event.id} data={event}></Event>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
