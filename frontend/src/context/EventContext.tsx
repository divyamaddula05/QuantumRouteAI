import { createContext, useContext, useState } from "react";

const EventContext = createContext<any>(null);

export function EventProvider({ children }: any) {

  const [events, setEvents] = useState<any[]>([]);

  const addEvent = (message: string) => {

    const time = new Date().toLocaleTimeString();

    setEvents((prev) => [
      {
        time,
        message,
      },
      ...prev,
    ]);

  };

  return (

    <EventContext.Provider
      value={{
        events,
        addEvent,
      }}
    >
      {children}
    </EventContext.Provider>

  );

}

export function useEvents() {
  return useContext(EventContext);
}