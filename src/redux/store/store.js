import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/auth/authSlice";
import { calendarSlice } from "../slices/calendar/calendarSlice";
import { uiSlice } from "../slices/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  // corrige el warning del problema de fecha serializable en el navegador
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
