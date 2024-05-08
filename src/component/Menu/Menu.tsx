import React, { useState } from "react";
import {
  EditOutlined,
  UnorderedListOutlined,
  ProfileOutlined,
  FundOutlined,
  FieldTimeOutlined,
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
  {
    label: "Hотатки",
    key: "notes",
    icon: <ProfileOutlined />,
  },
  {
    label: "День",
    key: "schulder",
    icon: <FundOutlined />,
  },
  {
    label: "Таймер",
    key: "timer",
    icon: <FieldTimeOutlined />,
  },
  {
    label: "Звички",
    key: "habit",
    icon: <FundOutlined />,
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
