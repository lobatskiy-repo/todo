import React, { useState } from "react";
import {
  EditOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../Router";

const items: MenuProps["items"] = [
  {
    label: "Головна",
    key: "home",
    icon: <EditOutlined />,
  },
  // {
  //   label: "todo",
  //   key: "todo",
  //   icon: <UnorderedListOutlined />,
  // },
  {
    label: "Календар",
    key: "calendar",
    icon: <CalendarOutlined />,
  },
];

export const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    let key: any = e.key;
    //@ts-ignore
    navigate(ROUTES[key]);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
