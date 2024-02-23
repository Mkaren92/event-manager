import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { deleteEvent } from "../../graphql/mutations";
import { useAuth } from "../../store/auth-context";
import { useEvent } from "../../store/event-context";

const client = generateClient();

export default function MyEvent({ data }) {
  const { authUser } = useAuth();
  const { deleteMyEvent, setActiveEvent } = useEvent();
  const navigate = useNavigate();

  async function handleDeleteMyEvent() {
    try {
      await client.graphql({
        query: deleteEvent,
        variables: {
          input: { id: data.id },
          condition: { authorId: { eq: authUser.sub } },
        },
      });

      deleteMyEvent(data.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateMyEvent() {
    setActiveEvent(data);
    navigate(`/events/update/${data.id}`);
  }

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data.name}
      </th>
      <td className="px-4 py-3"> {data.description}</td>
      <td className="px-4 py-3">{data.start}</td>
      <td className="px-4 py-3">
        <div className="flex justify-end space-x-2 ml-2">
          <button
            onClick={handleDeleteMyEvent}
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 inline"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleUpdateMyEvent}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 inline dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Update
          </button>
        </div>
      </td>
    </tr>
  );
}
