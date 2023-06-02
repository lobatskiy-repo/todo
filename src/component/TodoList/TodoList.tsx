import React from "react";

import { Card, List, message } from "antd";
import { TodoItem } from "../TodoItem/TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodo } from "../../store/selectore";
import { removeTodo } from "../../store/action";

export const TodoLis = () => {
  const todos = useSelector(getAllTodo);

  const dispatch = useDispatch();

  const handleRemoveTodo = (todo: any): void => {
    dispatch(removeTodo(todo));
    // message.warn("Todo removed!");
  };

  const handleToggleTodoStatus = (): void => {
    message.info("Завдання оновлено");
  };

  return (
    <Card title="Список усіх завдань">
      <List
        locale={{
          emptyText: "Завдань немає :(",
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
};
