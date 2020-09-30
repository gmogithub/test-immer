import React, { FC, useEffect, useReducer } from "react";
import produce, { original } from "immer";
import { getTodos, TodoState } from "./TodoList";

interface TodoListReducerProps {
}

interface TodoListReducerState {
  list: TodoState[]
}

enum ActionType {
  INIT,
  ADD,
  COMPLETED,
  DELETE
}

const reducer = produce((state: TodoListReducerState, { type, payload }: { type: ActionType, payload: any }) => {
  switch (type) {
    case ActionType.INIT:
      state.list = payload;
      break;
    case ActionType.ADD:
      state.list.push(payload);
      break;
    case ActionType.DELETE:
      const index = state.list.findIndex((t: TodoState) => original(t) === payload);
      if (index > -1) {
        state.list.splice(index, 1);
      }
      break;
    case ActionType.COMPLETED:
      const find: TodoState | undefined = state.list.find((t: TodoState) => original(t) === payload);
      if (find) {
        find.completed = !find.completed;
      }
      break;
  }
});

export const TodoListReducer: FC<TodoListReducerProps> = (props) => {

  const [state, dispatch] = useReducer(reducer, { list: [] });
  const { list } = state;

  useEffect(() => {
    getTodos().then(todos => {
      dispatch({ type: ActionType.INIT, payload: todos });
    })
  }, []);

  const handleChange = (todo: TodoState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.COMPLETED, payload: todo });
  };

  const handleClickDeleteTodo = (todo: TodoState) => () => {
    dispatch({type: ActionType.DELETE, payload: todo});
  }

  function handleClickAddTodo() {
    const id = list.length + 1;
    dispatch({ type: ActionType.ADD, payload: { id, title: "Add toto " + id, completed: false } })
  }

  return <div>
    <h4>Todo list avex reducer</h4>
    <div>
      <button onClick={handleClickAddTodo}>Ajouter todo</button>
    </div>
    {
      list.map((todo) => {
        const { id, title, completed } = todo;
        return (
          <div key={id} style={{ border: "1px solid #000", padding: 5, margin: 2 }}>
            {id} {title} <input type={"checkbox"} checked={completed} onChange={handleChange(todo)}/>
            <button onClick={handleClickDeleteTodo(todo)}>delete</button>
          </div>)
      })
    }
  </div>
};
