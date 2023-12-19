import { TYPE_REDUCER } from "../action";
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
export interface ITodo {
  id?: string;
  name: string;
  text: string;
  completed?: boolean;
  createdDate: Date;
  time: Date;
}

const initialState: any = {
  todos: [],
};

const Settings = (state = initialState, action: any) => {
  switch (action.type) {
    case TYPE_REDUCER.ADD_TODO: {
      const { name, text, data, time } = action.payload;

      let newTodo = {
        id: uuidv4(),
        name: name,
        text: text,
        completed: false,
        data: data,
        time: time,
      };
      let cloneTodos = cloneDeep(state.todos);

      if (state.todos.length > 0) {
        cloneTodos.push(newTodo);
      }

      return {
        ...state,
        todos: state.todos.length > 0 ? cloneTodos : [newTodo],
      };
    }
    case TYPE_REDUCER.ADD_TODOS: {
      const todos = action.payload;
 debugger
      return {
        ...state,
        todos: todos,
      };
    }
    case TYPE_REDUCER.REMOVE_TODO: {
      const { id } = action.payload;
      const todos = JSON.parse(JSON.stringify(state.todos)).filter(
        (todo: ITodo) => todo.id !== id
      );

      return {
        ...state,

        todos: todos,
      };
    }

    default:
      return state;
  }
};

export default Settings;
