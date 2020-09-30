import React, { FC, useEffect, useState } from "react";
import { produce, original } from "immer";

interface TodoListProps {
}

export interface TodoState {
  id: number,
  title: string,
  completed: boolean
}

export const getTodos = (): Promise<TodoState[]> => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
}

export const TodoList: FC<TodoListProps> = (props) => {
  const [list, setList] = useState<TodoState[]>([]);

  useEffect(() => {
    getTodos().then(setList);
  }, []);

  const handleChange = (todo: TodoState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setList(produce((todos) => {
      const t = todos.find((td: TodoState) => original(td) === todo);
      if (t) {
        t.completed = !t.completed;
      }
    }));
  }

  return (
    <div>
      <h4>Todo list</h4>
      {
        list.map((todo) => {
          const { id, title, completed } = todo;
          return (
            <div key={id} style={{ border: "1px solid #000", padding: 5, margin: 2 }}>
              {title} <input type={"checkbox"} checked={completed} onChange={handleChange(todo)}/>
            </div>)
        })
      }
    </div>)
};
