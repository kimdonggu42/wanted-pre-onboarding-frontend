import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import styled from 'styled-components';
import { TOKEN_API } from '../../util/api';
import { TodoType } from '../../util/type';
import TodoList from './TodoList';

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const TodoArea = styled.div`
  width: 100vw;
  max-width: 700px;
  padding: 20px;
`;

const TodoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  margin: 10px 0 20px 0;

  > .logoutBtn {
    cursor: pointer;
  }
`;

const TodoInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
`;

const TodoInput = styled.input`
  font-size: 15px;
  padding: 0px 70px 0px 15px;
  border-radius: 50px;
  border: none;
  width: 100%;
  height: 40px;
  box-shadow: 0px 0px 5px lightgray;

  &:focus {
    outline: none;
    border: solid 1px lightgray;
  }
`;

const TodoCreateBtn = styled.button`
  position: absolute;
  font-size: 15px;
  font-weight: 600;
  right: 17px;
  padding: 5px 10px 5px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const TodoListArea = styled.ul`
  list-style: none;

  :last-child {
    border-bottom: none;
  }
`;

function TodoMain() {
  const [todoData, setTodoData] = useState<TodoType[]>([]);
  const [todoBody, setTodoBody] = useState<string>('');

  const reverseTodoData = todoData.sort((a, b) => b.id - a.id);

  const getTodoData = async () => {
    const res = await TOKEN_API.get('/todos');
    setTodoData(res.data);
  };
  useEffect(() => {
    getTodoData();
  }, []);

  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoBody(e.target.value);
  };

  const addTodoText = async () => {
    const newTodo = {
      todo: todoBody,
    };
    if (todoBody) {
      await TOKEN_API.post('/todos', newTodo);
      getTodoData();
      setTodoBody('');
    }
  };

  const logOut = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <TodoContainer>
      <TodoArea>
        <TodoTitle>
          <span>TODO LIST</span>
          <FiLogOut className="logoutBtn" size={21} onClick={logOut} />
        </TodoTitle>
        <TodoInputArea>
          <TodoInput
            className="todoInput"
            data-testid="new-todo-input"
            placeholder="할 일을 입력해 주세요."
            value={todoBody}
            onChange={onChangeTodoBody}
          />

          <TodoCreateBtn
            data-testid="new-todo-add-button"
            onClick={addTodoText}
          >
            추가
          </TodoCreateBtn>
        </TodoInputArea>
        <TodoListArea>
          {reverseTodoData.map((value) => {
            return (
              <TodoList list={value} key={value.id} getTodoData={getTodoData} />
            );
          })}
        </TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoMain;
