import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesES } from "../../helpers/getMessagesES";
import { CalendarEvent } from "../components/CalendarEvent";
import { CalendarModal } from "../components/CalendarModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {

  const {user} = useAuthStore();

  const {openDateModal} = useUiStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (event.user._id === user.uid) || (event.user.uid === user.uid);

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleclick = (e) => {
    //console.log({ doubleClick: e });
    openDateModal();
  };

  const onSelect = (e) => {
    //console.log({ click: e });
    setActiveEvent(e);
  };

  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);
  

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleclick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
