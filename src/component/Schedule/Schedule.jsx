import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import {
  Eventcalendar,
  getJson,
  setOptions,
  Toast,
  localeUa,
} from "@mobiscroll/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.scss";

import { Card } from "antd";


setOptions({
  locale: localeUa,
  theme: "ios",
  themeVariant: "light",
});

export const Schedule = () => {
  const [myEvents, setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const myView = useMemo(
    () => ({
      schedule: { type: "day" },
    }),
    []
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    debugger
    setToastMessage(args.event.title);
    setToastOpen(true);
  }, []);

  useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  return (
    <>
      <Card
        style={{
          maxHeight: "calc(100vh - 170px)",
          overflow: "auto",
        }}
        title="Розпорядок дня"
      >
        <Eventcalendar
          clickToCreate={true}
          dragToCreate={true}
          dragToMove={true}
          dragToResize={true}
          eventDelete={true}
          data={myEvents}
          view={myView}
          onEventClick={handleEventClick}
        />
        <Toast
          message={toastMessage}
          isOpen={isToastOpen}
          onClose={handleToastClose}
        />
      </Card>
    </>
  );
};
