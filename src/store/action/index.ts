export const TYPE_REDUCER = {
  ADD_TODO: "add:todo",
  REMOVE_TODO: "remove:todo",
};
export const addTodo = (data: any) => ({
  type: TYPE_REDUCER.ADD_TODO,
  payload: data,
});
export const removeTodo = (data: any) => ({
  type: TYPE_REDUCER.REMOVE_TODO,
  payload: data,
});
