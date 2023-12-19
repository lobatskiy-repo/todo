import { type } from "@testing-library/user-event/dist/type";

export const transformObject = (obj: any) => {
  const transformedObject: any = {};

  for (const todo of obj) {
    const date = new Date(todo.data);
    const month = date.getMonth() + 1; // Додаємо 1, оскільки getMonth() повертає значення від 0 до 11
    const day = date.getDate();

    if (!transformedObject[month]) {
      transformedObject[month] = {};
    }

    if (!transformedObject[month][day]) {
      transformedObject[month][day] = [];
    }

    transformedObject[month][day].push(todo);
  }

  // Сортуємо задачі за часом
  for (const month in transformedObject) {
    for (const day in transformedObject[month]) {
      if (transformedObject[month][day].length > 0) {
        transformedObject[month][day].sort((task1: any, task2: any) => {
          if (typeof task1.time === "object") {
            debugger;
          }
          const task1Time =
            typeof task1.time === "object" ? task1.time.format() : task1.time;
          const task2Time =
            typeof task2.time === "object" ? task2.time.format() : task2.time;

          return task1Time.localeCompare(task2Time);
        });
      }
    }
  }

  return transformedObject;
};
