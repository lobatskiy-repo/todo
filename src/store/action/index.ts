export const TYPE_REDUCER = {
  ADD_TODO: "add:todo",
  ADD_TODOS: "add:todos",
  REMOVE_TODO: "remove:todo",
};
export const addTodo = (data: any) => ({
  type: TYPE_REDUCER.ADD_TODO,
  payload: data,
});
export const addTodos = (data: any) => ({
  type: TYPE_REDUCER.ADD_TODOS,
  payload: data,
});
export const removeTodo = (data: any) => ({
  type: TYPE_REDUCER.REMOVE_TODO,
  payload: data,
});
