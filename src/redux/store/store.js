import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "../slices/calendar/calendarSlice";
import { uiSlice } from "../slices/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  // corrige el warning del problema de fecha serializable en el navegador
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
