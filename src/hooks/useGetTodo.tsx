import { useEffect, useState } from 'react';
import { TODO_API } from '../util/api';
import { TodoType } from '../util/interface';

export function useGetTodos(path: string) {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = async () => {
    try {
      const res = await TODO_API.get(path);
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (path) {
      getTodos();
    }
  }, [path]);

  return { todos, getTodos };
}
