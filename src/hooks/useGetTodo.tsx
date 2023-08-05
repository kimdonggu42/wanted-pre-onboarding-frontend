import { useEffect, useState } from 'react';
import { TODO_API } from '../util/api';
import { TodoType } from '../util/interface';

export function useGetTodo(path: string) {
  const [todoData, setTodoData] = useState<TodoType[]>([]);

  const getTodoData = async () => {
    try {
      const res = await TODO_API.get(path);
      setTodoData(res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (path) {
      getTodoData();
    }
  }, [path]);

  return { todoData, getTodoData };
}
