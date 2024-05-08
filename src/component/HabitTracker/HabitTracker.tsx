import React, { useState } from "react";
import {
  Calendar,
  Modal,
  Form,
  Input,
  Button,
  List,
  Checkbox,
  DatePicker,
  Row,
  Col,
  Statistic,
  Popconfirm,
  Card,
  Tabs,
} from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

// Реєстрація плагінів
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const { TabPane } = Tabs;

export const HabitTracker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [habits, setHabits] = useState<any>([]);
  const [defaultDates, setDefaultDates] = useState([]);
  const [editingHabit, setEditingHabit] = useState<any>(null);

  const showModal = (habit = null) => {
    // setDefaultDates([moment(), moment().add(14, "days")]);
    setIsModalVisible(true);
    setEditingHabit(habit);
  };

  const handleOk = (values: any) => {
    const { habit, dates } = values;
    const datesCompleted = new Set();
    if (editingHabit) {
      const updatedHabits = habits.map((h: any) => {
        if (h.id === editingHabit.id) {
          return { ...h, title: habit, startDate: dates[0], endDate: dates[1] };
        }
        return h;
      });
      setHabits(updatedHabits);
    } else {
      const newHabit = {
        id: habits.length + 1,
        title: habit,
        datesCompleted,
        startDate: dates[0],
        endDate: dates[1],
      };
      setHabits([...habits, newHabit]);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDateChange = (value: any, habitIndex: any) => {
    const dateKey = value.format("YYYY-MM-DD");
    const updatedHabits = [...habits];
    const datesCompleted = new Set(updatedHabits[habitIndex].datesCompleted);

    if (datesCompleted.has(dateKey)) {
      datesCompleted.delete(dateKey);
    } else {
      datesCompleted.add(dateKey);
    }

    updatedHabits[habitIndex].datesCompleted = datesCompleted;
    setHabits(updatedHabits);
  };

  const calculateCompletionRate = (habit: any) => {
    const start = dayjs(habit.startDate);
    const end = dayjs(habit.endDate);
    const totalDays = end.diff(start, "day") + 1;
    const completedDays = habit.datesCompleted.size;
    return Math.round((completedDays / totalDays) * 100);
  };

  const activeHabits = () => {
    return habits.filter((habit: any) => dayjs().isBefore(dayjs(habit.endDate)))
      .length;
  };

  const dateCellRender = (value: any) => {
    const day = dayjs(value);
    const dayHabits = habits
      .filter((habit: any) => {
        const start = dayjs(habit.startDate);
        const end = dayjs(habit.endDate);
        return (
          day.isSameOrAfter(start, "day") && day.isSameOrBefore(end, "day")
        );
      })
      .map((habit: any, index: any) => (
        <div key={index}>
          <Checkbox
            checked={habit.datesCompleted.has(day.format("YYYY-MM-DD"))}
            onChange={() => handleDateChange(day, index)}
          >
            {habit.title}
          </Checkbox>
        </div>
      ));
    return <div>{dayHabits}</div>;
  };

  const handleDelete = (id: any) => {
    setHabits(habits.filter((h: any) => h.id !== id));
  };

  return (
    <Card
      style={{
        maxHeight: "calc(100vh - 170px)",
        width: "450px",
        position: "relative",
      }}
      title="Звички"
    >
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Календар" key="1">
          <Calendar dateCellRender={dateCellRender} />
        </TabPane>
        <TabPane tab="Список звичок" key="2">
          <Button onClick={() => showModal()} style={{ marginBottom: 16 }}>
            Додати звичку
          </Button>
          <Modal
            title={`${editingHabit ? "Edit" : "Add a New"} Habit`}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              onFinish={handleOk}
              initialValues={{
                habit: editingHabit ? editingHabit.title : "",
                dates: editingHabit
                  ? [dayjs(editingHabit.startDate), dayjs(editingHabit.endDate)]
                  : [dayjs(), dayjs().add(14, "days")],
              }}
            >
              <Form.Item
                name="habit"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, введіть свою звичку!",
                  },
                ]}
              >
                <Input placeholder="Введіть свою звичку" />
              </Form.Item>
              <Form.Item
                name="dates"
                rules={[
                  {
                    required: true,
                    message: "Будь ласка, оберіть діапазон дат!",
                  },
                ]}
              >
                <DatePicker.RangePicker />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingHabit ? "Оновити" : "Додати"} звичку
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <List
            itemLayout="horizontal"
            dataSource={habits}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => showModal(item)}>
                    Edit
                  </Button>,
                  <Popconfirm
                    title="Ви впевнені, що хочете позбутися цієї звички?"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type="link">Видалити</Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={item.title}
                  description={`Починаючи з: ${dayjs(item.startDate).format(
                    "YYYY-MM-DD"
                  )} До: ${dayjs(item.endDate).format("YYYY-MM-DD")}`}
                />
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane tab="Statistics" key="3">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Активні звички"
                value={
                  habits.filter((habit: any) =>
                    dayjs().isBefore(dayjs(habit.endDate))
                  ).length
                }
              />
            </Col>
            <Col span={12}>
              {habits.map((habit: any, index: any) => (
                <Statistic
                  key={index}
                  title={`Відсоток завершення для ${habit.title}`}
                  value={`${Math.round(
                    (Array.from(habit.datesCompleted).length /
                      dayjs(habit.endDate).diff(dayjs(habit.startDate), "day") +
                      1) *
                      100 -100
                  )}%`}
                />
              ))}
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  );
};
