import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  DatePicker,
  TimePicker,
  Modal,
  message,
  Select,
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import "./styles.css";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/action";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";
import { debug } from "util";

export const AddTodoForm: React.FC<any> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [priorityColor, setPriorityColor] = useState("orange"); // Встановлення за замовчуванням середньої пріоритетності (оранжевий)

  useEffect(() => {
    // Встановлення за замовчуванням середньої пріоритетності
    form.setFieldsValue({
      priority: "medium",
    });
  }, []);

  const handleFormSubmit = (todo: any): void => {
    addDoc(collection(db, "todos"), {
      data: todo["data"].format(),
      completed: false,
      name: todo["name"],
      text: todo["text"],
      startTime: todo["startTime"]?.format(),
      endTime: todo["endTime"]?.format(),
      priority: todo["priority"],
    }).then((res) => {
      dispatch(addTodo({ ...todo, id: res.id }));
      message.success("Завдання додано!");
    });
  };

  const onFinish = () => {
    let data = {
      name: form.getFieldValue("name"),
      text: form.getFieldValue("text"),
      data: form.getFieldValue("data"),
      time: form.getFieldValue("time"),
      startTime: form.getFieldValue("startTime"),
      endTime: form.getFieldValue("endTime"),
      priority: form.getFieldValue("priority"),
    };

    handleFormSubmit(data);
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Зміст модального слова");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Натиснув кнопку скасування");
    setOpen(false);
  };

  const handlePriorityChange = (value: string) => {
    const priorityClasses: any = {
      low: "priority-low",
      medium: "priority-medium",
      high: "priority-high",
    };
    setPriorityColor(priorityClasses[value]);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Modal
            // title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"Заголовок"}
            name={"name"}
            rules={[
              { required: true, message: "Це поле обов'язкове для заповнення" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"Текст"}
            name={"text"}
            rules={[
              { required: true, message: "Це поле обов'язкове для заповнення" },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"День"}
            name={"data"}
            rules={[
              { required: true, message: "Це поле обов'язкове для заповнення" },
            ]}
          >
            <DatePicker placeholder="Ведіть дату" />
          </Form.Item>
        </Col>

        {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"Час"}
            name={"time"}
            rules={[
              { required: true, message: "Це поле обов'язкове для заповнення" },
            ]}
          >
            <TimePicker />
          </Form.Item>
        </Col> */}
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"Час початку"}
            name={"startTime"}
            rules={[{ required: true, message: "Вкажіть час початку" }]}
          >
            <TimePicker
              use12Hours
              format="h:mm a"
              onChange={(time) => {
                // Встановіть час закінчення на 1 годину після вибору часу початку
                const endTime = time && time.clone().add(1, "hour");
                form.setFieldsValue({ endTime });
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"Час закінчення"}
            name={"endTime"}
            rules={[{ required: true, message: "Вкажіть час закінчення" }]}
          >
            <TimePicker use12Hours format="h:mm a" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            label={"Пріоритетність"}
            name={"priority"}
            rules={[
              { required: true, message: "Оберіть пріоритетність завдання" },
            ]}
          >
            <Select
              placeholder="Оберіть пріоритет"
              onChange={handlePriorityChange}
              className={priorityColor}
            >
              <Select.Option value="low" style={{ color: "green" }}>
                Низька
              </Select.Option>
              <Select.Option value="medium" style={{ color: "orange" }}>
                Середня
              </Select.Option>
              <Select.Option value="high" style={{ color: "red" }}>
                Висока
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Додати завдання
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
