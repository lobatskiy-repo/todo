import { cloneDeep } from "lodash";
import { transformObject } from "../../utils/workData";

export const getAllTodo = (state: any) => {
  return state["Configuration"]["todos"];
};
export const getAllTodoCalendar = (state: any) => {
  let allTodo = cloneDeep(getAllTodo(state));
  debugger
  if (allTodo.length < 1) return {};

  return transformObject(allTodo);
};
