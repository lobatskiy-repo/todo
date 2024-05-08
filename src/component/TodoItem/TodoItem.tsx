import React from "react";
import {
  Tooltip,
  Tag,
  List,
  Button,
  Popconfirm,
  Switch,
  Typography,
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

interface ITodoItemProps {
  todo: any;
  onTodoRemoval: (todo: any) => void;
  onTodoToggle: (todo: any) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  onTodoRemoval,
  onTodoToggle,
}) => {
  let endTime = undefined;
  let startTime = undefined;
  if (todo.endTime) {
    endTime = new Date(todo.endTime).toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    // Форматування часу за новими полями
    startTime = new Date(todo.startTime).toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const finishedDate = new Date(todo.data).toLocaleDateString("pl-PL");

  // Кольори для пріоритету
  const priorityColor: any = {
    low: "green",
    medium: "orange",
    high: "red",
  };

  return (
    <List.Item
      actions={[
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => onTodoRemoval(todo)}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Typography.Title level={3} style={{ margin: 0 }}>
          {todo.name}
        </Typography.Title>
        <Typography.Paragraph style={{ margin: 0 }}>
          {todo.text}
        </Typography.Paragraph>
        <div style={{ marginTop: 8 }}>
          {todo.priority && (
            <Tag color={priorityColor[todo.priority]}>
              {todo.priority.toUpperCase()}
            </Tag>
          )}

          <Tag color="purple">{`Дата: ${finishedDate}`}</Tag>
          {startTime && (
            <Tag color="blue">{`Час: ${startTime} - ${endTime}`}</Tag>
          )}
        </div>
      </div>
    </List.Item>
  );
};
