import { addHours } from "date-fns";
import React from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";
import "../../styles.css";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "Escribe tu título",
      start: new Date(),
      end: addHours(new Date(), 2),
      notes: "Agrega tus notas",
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Usuario",
      },
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
