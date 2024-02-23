import { createContext, useReducer, useContext, useCallback } from "react";
import { actions } from "../utility/data";

const initialState = {
  events: [],
  myEvents: [],
  activeEvent: {},
};

const EventContext = createContext({
  events: [],
  myEvents: [],
  activeEvent: {},
  setEvents: () => {},
  addEvent: () => {},
  updateGenralEvent: () => {},
  setMyEvents: () => {},
  deleteMyEvent: () => {},
  updateMyEvent: () => {},
  setActiveEvent: () => {},
});

function eventReducer(state, action) {
  if (action.type === actions.SET_EVENTS) {
    return {
      ...state,
      events: [...action.payload],
    };
  }

  if (action.type === actions.SET_MY_EVENTS) {
    return {
      ...state,
      myEvents: [...action.payload],
    };
  }

  if (action.type === actions.DELETE_EVENT) {
    const myEventsData = [...state.myEvents];
    const deletedMyIndex = myEventsData.findIndex(
      (item) => item.id === action.payload
    );
    myEventsData.splice(deletedMyIndex, 1);

    const eventsData = [...state.events];
    const deletedIndex = eventsData.findIndex(
      (item) => item.id === action.payload
    );
    eventsData.splice(deletedIndex, 1);

    return {
      ...state,
      events: eventsData,
      myEvents: myEventsData,
    };
  }

  if (action.type === actions.UPDATE_EVENT) {
    const eventsData = [...state.events];
    const updatedItemIndex = eventsData.findIndex(
      (item) => item.id === action.payload.id
    );

    if (updatedItemIndex == "-1") return state;
    const updatedEventData = {
      ...eventsData[updatedItemIndex],
    };
    updatedEventData.name = action.payload.name;
    updatedEventData.description = action.payload.description;
    updatedEventData.start = action.payload.start;
    eventsData[updatedItemIndex] = updatedEventData;

    return {
      ...state,
      events: eventsData,
    };
  }

  if (action.type === actions.UPDATE_MY_EVENT) {
    const myEventsData = [...state.myEvents];
    const updatedItemIndex = myEventsData.findIndex(
      (item) => item.id === action.payload.id
    );

    if (updatedItemIndex == "-1") return state;
    const updatedEventData = {
      ...myEventsData[updatedItemIndex],
    };
    updatedEventData.name = action.payload.name;
    updatedEventData.description = action.payload.description;
    updatedEventData.start = action.payload.start;
    myEventsData[updatedItemIndex] = updatedEventData;

    return {
      ...state,
      myEvents: myEventsData,
    };
  }

  if (action.type === actions.ADD_EVENT) {
    const existingEvents = [...state.events];
    existingEvents.unshift({ ...action.payload });
    const existingMyEvents = [...state.myEvents];
    existingMyEvents.unshift({ ...action.payload });

    return {
      ...state,
      events: existingEvents,
      myEvents: existingMyEvents,
    };
  }

  if (action.type === actions.SET_ACTIVE_EVENT) {
    return {
      ...state,
      activeEvent: { ...action.payload },
    };
  }

  return state;
}

export default function EventContextProvider({ children }) {
  const [eventState, eventDispatch] = useReducer(eventReducer, initialState);

  const handleSetEvents = useCallback((events) => {
    eventDispatch({
      type: actions.SET_EVENTS,
      payload: events,
    });
  }, []);

  const handleAddEvent = useCallback((event) => {
    eventDispatch({
      type: actions.ADD_EVENT,
      payload: event,
    });
  }, []);

  const handleSetMyEvents = useCallback((events) => {
    eventDispatch({
      type: actions.SET_MY_EVENTS,
      payload: events,
    });
  }, []);

  const handleDeleteMyEvent = useCallback((id) => {
    eventDispatch({
      type: actions.DELETE_EVENT,
      payload: id,
    });
  }, []);

  const handleSetActiveEvent = useCallback((id) => {
    eventDispatch({
      type: actions.SET_ACTIVE_EVENT,
      payload: id,
    });
  }, []);

  const handleUpdateMyEvent = useCallback((event) => {
    eventDispatch({
      type: actions.UPDATE_MY_EVENT,
      payload: event,
    });
  }, []);

  const handleUpdateEvent = useCallback((event) => {
    eventDispatch({
      type: actions.UPDATE_EVENT,
      payload: event,
    });
  }, []);

  const values = {
    events: eventState.events,
    myEvents: eventState.myEvents,
    activeEvent: eventState.activeEvent,
    setEvents: handleSetEvents,
    addEvent: handleAddEvent,
    updateGenralEvent: handleUpdateEvent,
    setMyEvents: handleSetMyEvents,
    deleteMyEvent: handleDeleteMyEvent,
    updateMyEvent: handleUpdateMyEvent,
    setActiveEvent: handleSetActiveEvent,
  };

  return (
    <EventContext.Provider value={values}>{children}</EventContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEvent = () => useContext(EventContext);
