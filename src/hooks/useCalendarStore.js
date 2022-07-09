import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers/conertEventsToDate";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
} from "../redux/slices/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
      } else {
        const { data } = await calendarApi.post("/events", calendarEvent);
        //console.log(data);
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      //console.log(data);
      const events = convertEventsToDate(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
