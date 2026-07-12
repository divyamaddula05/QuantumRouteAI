import { useEvents } from "../context/EventContext";

function EventLog() {

  const { events } = useEvents();

  return (

    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold mb-4">

        📜 Event Log

      </h2>

      <div className="space-y-3 max-h-72 overflow-auto">

        {events.length === 0 && (

          <p>No events yet.</p>

        )}

        {events.map((event: any, index: number) => (

          <div
            key={index}
            className="border-b pb-2"
          >

            <p className="text-xs text-gray-500">

              {event.time}

            </p>

            <p>

              {event.message}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default EventLog;