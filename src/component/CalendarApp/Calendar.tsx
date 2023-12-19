import React, { Children, useEffect } from "react";

import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import type { GenerateConfig } from "rc-picker/lib/generate";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";

import type { BadgeProps } from "antd";
import { Badge, Calendar } from "antd";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useSelector } from "react-redux";
import { getAllTodoCalendar } from "../../store/selectore";
import { useNavigate } from "react-router-dom";

const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};
export const CalendarApp = () => {
  const wrapperStyle: React.CSSProperties = {
    // width: 300,
    // border: `1px solid ${token.colorBorderSecondary}`,
    // borderRadius: token.borderRadiusLG,
  };
  const navigate = useNavigate();

  let allobjectData: any = useSelector(getAllTodoCalendar);
  const cellRender =
    (allobjectData: any) =>
    (data: any): any => {
      let today = new Date(data);
      console.log("today", today);
      console.log("today", today.getMonth());

      let dey = data.date();
      let moze = today.getMonth() + 1;
      debugger;
      console.log("moze", moze);
      console.log("dey", dey);

      console.log("allobjectData", allobjectData);

      if (allobjectData && allobjectData[moze] && allobjectData[moze][dey]) {
        return (
          <Badge count={allobjectData[moze][dey].length}>
            <div
              className="ant-picker-cell-inner ant-picker-calendar-date"
              onClick={() => navigate(`/calendar/${moze}/${dey}`)}
            >
              <div className="ant-picker-calendar-date-value">{dey}</div>
            </div>
          </Badge>
        );
      }
      return (
        <div className="ant-picker-cell-inner ant-picker-calendar-date">
          <div className="ant-picker-calendar-date-value">{dey}</div>
        </div>
      );
    };

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        dateFullCellRender={(prop: any) => cellRender(allobjectData)(prop)}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};
