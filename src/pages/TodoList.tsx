import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../components/TodoItem';
import {
  TodoContainer,
  TodoArea,
  TodoTitle,
  TodoInputArea,
  TodoInput,
  TodoAddBtn,
  TodoListArea,
  EmptyTodoWord,
} from '../style/todoStyle';
import { TODO_API } from '../util/api';
import { TodoType } from '../util/interface';

function TodoList() {
  const [todoData, setTodoData] = useState<TodoType[]>([]);
  const [todoBody, setTodoBody] = useState<string>('');

  const reverseTodoData: TodoType[] = todoData.sort((a, b) => b.id - a.id);
  const navigate = useNavigate();

  const getTodoData = async () => {
    try {
      const res = await TODO_API.get('/todos');
      setTodoData(res.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      getTodoData();
    }
  }, []);

  const addTodoText = async () => {
    try {
      if (todoBody) {
        const newTodo = {
          todo: todoBody,
        };
        await TODO_API.post('/todos', newTodo);
        getTodoData();
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
          <TodoAddBtn data-testid='new-todo-add-button' onClick={addTodoText}>
            추가
          </TodoAddBtn>
        </TodoInputArea>
        <TodoListArea>
          {todoData.length !== 0 ? (
            <>
              {reverseTodoData.map((value) => {
                return <TodoItem list={value} key={value.id} getTodoData={getTodoData} />;
              })}
            </>
          ) : (
            <EmptyTodoWord>아직 추가된 할 일이 없습니다.</EmptyTodoWord>
          )}
        </TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoList;
