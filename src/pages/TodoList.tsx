import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import { useGetTodos } from '../hooks/useGetTodo';
import {
  TodoContainer,
  TodoArea,
  TodoTitle,
  TodoInputArea,
  TodoInput,
  TodoAddBtn,
  TodoListArea,
} from '../style/todoStyle';
import { TODO_API } from '../util/api';
import { TodoType } from '../util/interface';

function TodoList() {
  const [todoBody, setTodoBody] = useState<string>('');

  const navigate = useNavigate();
  const { todos, getTodos } = useGetTodos('/todos');
  const reverseTodoData: TodoType[] = todos.sort((a, b) => b.id - a.id);

  const createTodo = async () => {
    try {
      if (todoBody) {
        const newTodo = {
          todo: todoBody,
        };
        await TODO_API.post('/todos', newTodo);
        getTodos();
        setTodoBody('');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoBody(e.target.value);
  };

  const logOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/signin');
  };

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <TodoContainer>
      <TodoArea>
        <TodoTitle>
          TODO LIST
          <FiLogOut className='logoutBtn' size={21} onClick={logOut} />
        </TodoTitle>
        <TodoInputArea>
          <TodoInput
            data-testid='new-todo-input'
            placeholder='할 일을 입력해 주세요.'
            value={todoBody}
            onChange={onChangeTodoBody}
          />
          <TodoAddBtn data-testid='new-todo-add-button' onClick={createTodo}>
            추가
          </TodoAddBtn>
        </TodoInputArea>
        <TodoListArea>
          {reverseTodoData.map((value) => {
            return <TodoItem list={value} key={value.id} getTodos={getTodos} />;
          })}
        </TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoList;
