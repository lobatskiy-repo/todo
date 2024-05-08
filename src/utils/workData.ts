import { type } from "@testing-library/user-event/dist/type";
import dayjs from "dayjs";


export const transformObject = (obj: any) => {
  const transformedObject: any = {};

  for (const todo of obj) {
    const date = new Date(todo.data);  // Переконайтеся, що використовуєте поле 'date', якщо це відповідає вашим даним
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

  // Сортуємо задачі за часом початку
  for (const month in transformedObject) {
    for (const day in transformedObject[month]) {
      transformedObject[month][day].sort((task1: any, task2: any) => {
        const task1StartTime = dayjs(task1.startTime);  // використання dayjs для обробки строк часу
        const task2StartTime = dayjs(task2.startTime);

        return task1StartTime.isBefore(task2StartTime) ? -1 : 1;  // dayjs забезпечує більш чистий спосіб порівняння часів
      });
    }
  }

  return transformedObject;
};
// export const transformObject = (obj: any) => {
//   const transformedObject: any = {};

//   for (const todo of obj) {
//     const date = new Date(todo.data);
//     const month = date.getMonth() + 1; // Додаємо 1, оскільки getMonth() повертає значення від 0 до 11
//     const day = date.getDate();

//     if (!transformedObject[month]) {
//       transformedObject[month] = {};
//     }

//     if (!transformedObject[month][day]) {
//       transformedObject[month][day] = [];
//     }

//     transformedObject[month][day].push(todo);
//   }

//   // Сортуємо задачі за часом
//   for (const month in transformedObject) {
//     for (const day in transformedObject[month]) {
//       if (transformedObject[month][day].length > 0) {
//         transformedObject[month][day].sort((task1: any, task2: any) => {
//           if (typeof task1.time === "object") {
//             debugger;
//           }
//           const task1Time =
//             typeof task1.time === "object" ? task1.time.format() : task1.time;
//           const task2Time =
//             typeof task2.time === "object" ? task2.time.format() : task2.time;

//           return task1Time.localeCompare(task2Time);
//         });
//       }
//     }
//   }

//   return transformedObject;
// };

