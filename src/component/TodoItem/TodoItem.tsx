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
 
  const createdTime = new Date(todo.time).toLocaleTimeString("pl-PL");
  const finishedDate = todo.data
    ? new Date(todo.data).toLocaleDateString("pl-PL")
    : "";
 
 
  return (
    <List.Item
      actions={[
        // <Tooltip
        //   title={todo.completed ? "Mark as uncompleted" : "Mark as completed"}
        // >
        //   {/* <Switch
        //     checkedChildren={<CheckOutlined />}
        //     unCheckedChildren={<CloseOutlined />}
        //     onChange={() => onTodoToggle(todo)}
        //     defaultChecked={todo.completed}
        //   /> */}
        // </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
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
        <div className="">
          <Typography.Title level={3} style={{ margin: 0 }}>
            {todo.name}
          </Typography.Title>
          <Typography.Paragraph style={{ margin: 0 }}>
            {todo.text}
          </Typography.Paragraph>
          {todo.time && todo.data && (
            <Tag color="purple" className="todo-tag">
              {`Дата: ${finishedDate} / ${createdTime}`}
            </Tag>
          )}
        </div>
      </div>
    </List.Item>
  );
};
