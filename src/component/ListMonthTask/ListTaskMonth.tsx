import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodoCalendar } from "../../store/selectore";
import { useParams } from "react-router-dom";
import { TodoItem } from "../TodoItem/TodoItem";
import { Card, List, message } from "antd";
import { removeTodo } from "../../store/action";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import uk from "dayjs/locale/uk";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.locale(uk);

export const ListTaskMonth = () => {
  let { month } = useParams();

  let allobjectData: any = useSelector(getAllTodoCalendar);
  const dispatch = useDispatch();

  if (month === undefined) return <></>;

  const handleRemoveTodo = (todo: any): void => {
    dispatch(removeTodo(todo));
    // message.warn("Todo removed!");
  };

  const handleToggleTodoStatus = (): void => {
    message.info("Todo state updated!");
  };
  if (allobjectData && allobjectData[month]) {
    let keyDay: any = Object.keys(allobjectData[month]);

    return keyDay.map((day: string) => {
      //@ts-ignore
      let todos = allobjectData[month][day];

      const date = dayjs()
        .month(Number(month) - 1)
        .date(Number(day));
      const formattedDate = date.format("DD MMMM");

      return (
        <Card title={`Завдання ${formattedDate} `}>
          <List
            locale={{
              emptyText: "Задач немає",
            }}
            dataSource={todos}
            renderItem={(todo) => (
              <TodoItem
                todo={todo}
                onTodoToggle={handleToggleTodoStatus}
                onTodoRemoval={handleRemoveTodo}
              />
            )}
            pagination={{
              position: "bottom",
              pageSize: 3,
            }}
          />
        </Card>
      );
    });
  }

  return <></>;
};
