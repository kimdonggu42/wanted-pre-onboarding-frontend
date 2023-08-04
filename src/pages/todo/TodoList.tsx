import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../../style/todoStyle';
import { TOKEN_API } from '../../util/api';
import { TodoType } from '../../util/interface';
import TodoItem from './TodoItem';

function TodoList() {
  const [todoData, setTodoData] = useState<TodoType[]>([]);
  const [todoBody, setTodoBody] = useState<string>('');

  const navigate = useNavigate();
  const reverseTodoData: TodoType[] = todoData.sort((a, b) => b.id - a.id);

  const getTodoData = async () => {
    try {
      const res = await TOKEN_API.get('/todos');
      setTodoData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getTodoData();
  }, []);

  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoBody(e.target.value);
  };

  const addTodoText = async () => {
    try {
      const newTodo = {
        todo: todoBody,
      };
      if (todoBody) {
        await TOKEN_API.post('/todos', newTodo);
        getTodoData();
        setTodoBody('');
      }
    } catch (err) {
      console.error(err);
    }
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
    <Styled.TodoContainer>
      <Styled.TodoArea>
        <Styled.TodoTitle>
          TODO LIST
          <FiLogOut className='logoutBtn' size={21} onClick={logOut} />
        </Styled.TodoTitle>
        <Styled.TodoInputArea>
          <Styled.TodoInput
            data-testid='new-todo-input'
            placeholder='할 일을 입력해 주세요.'
            value={todoBody}
            onChange={onChangeTodoBody}
          />
          <Styled.TodoAddBtn data-testid='new-todo-add-button' onClick={addTodoText}>
            추가
          </Styled.TodoAddBtn>
        </Styled.TodoInputArea>
        <Styled.TodoListArea>
          {todoData.length !== 0 ? (
            <>
              {reverseTodoData.map((value) => {
                return <TodoItem list={value} key={value.id} getTodoData={getTodoData} />;
              })}
            </>
          ) : (
            <Styled.EmptyTodoWord>아직 추가된 할 일이 없습니다.</Styled.EmptyTodoWord>
          )}
        </Styled.TodoListArea>
      </Styled.TodoArea>
    </Styled.TodoContainer>
  );
}

export default TodoList;
