import { configureStore, createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { fromLS, toLS, genID } from '../helpers/helper';

const initialCalendarState = {
  currentDate: DateTime.now(),
  events: fromLS('events') ?? {},
  confirmData: null,
  notificationData: null,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialCalendarState,
  reducers: {
    setDate: (state, action) => void (state.currentDate = action.payload),
    confirm: (state, action) => void (state.confirmData = action.payload),
    notify: (state, action) => void (state.notificationData = action.payload),
    addEvent: (state, action) => {
      const { day, inputs } = action.payload;
      if (!state.events[day]) state.events[day] = [];
      state.events[day].push({ ...inputs, id: genID() });
      toLS('events', state.events);
    },
    updateEvent: (state, action) => {
      const { day, inputs, id } = action.payload;
      state.events[day] = state.events[day].map((e) => (e.id !== id ? e : { ...inputs, id }));
      toLS('events', state.events);
    },
    removeEvent: (state, action) => {
      const { day, id } = action.payload;
      state.events[day] = state.events[day].filter((e) => e.id !== id);
      toLS('events', state.events);
    },
    markAsRead: (state, action) => {
      const { day, id } = action.payload;
      state.events[day] = state.events[day].map((e) => (e.id !== id ? e : { ...e, read: true }));
      toLS('events', state.events);
    },
  },
});

export const { setDate, confirm, notify, addEvent, updateEvent, removeEvent, markAsRead } = calendarSlice.actions;

// prettier-ignore
export const store = configureStore({
  reducer: { calendar: calendarSlice.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
