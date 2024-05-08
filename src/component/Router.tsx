import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

import { CalendarApp } from "./CalendarApp/Calendar";
import { TodoLis } from "./TodoList/TodoList";
import { ListTaskMonth } from "./ListMonthTask/ListTaskMonth";
import { ListTaskMonthDay } from "./ListTaskMonthDay/ListTaskMonthDay";
import { Notes } from "./Notes/Notes";
import { Schedule } from "./Schedule/Schedule";
import { TimerPage } from "./TimerPage/TimerPage";

export const ROUTES = {
  home: "/",
  calendar: "/calendar",
  notes: "/notes",
  timer: "/timer",
  schulder: "/schulder",
  calendar_month: "/calendar/:month/",
  calendar_month_day: "/calendar/:month/:day",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <TodoLis />,
  },
  {
    path: ROUTES.notes,
    element: <Notes />,
  },
  {
    path: ROUTES.home,
    element: <TodoLis />,
  },
  {
    path: ROUTES.calendar,
    element: <CalendarApp />,
  },
  {
    path: ROUTES.schulder,
    element: <Schedule />,
  },
]);

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.calendar} element={<CalendarApp />} />
      <Route path={ROUTES.calendar_month} element={<ListTaskMonth />} />
      <Route path={ROUTES.calendar_month_day} element={<ListTaskMonthDay />} />
      <Route path={ROUTES.notes} element={<Notes />} />
      <Route path={ROUTES.schulder} element={<Schedule />} />
      <Route path={ROUTES.timer} element={<TimerPage />} />
      <Route path={ROUTES.home} element={<TodoLis />} />
    </Routes>
  );
};
