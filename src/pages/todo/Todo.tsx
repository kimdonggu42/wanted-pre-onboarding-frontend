import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TOKEN_API } from '../../util/api';
import { TodoType } from '../../util/type';
import TodoList from './TodoList';

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoArea = styled.div`
  width: 100vw;
  max-width: 600px;
`;

const TodoInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
`;

const InputText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 9.5;

  > input {
    font-size: 15px;
    padding: 0px 55px 0px 15px;
    border-radius: 50px;
    border: none;
    width: 100%;
    height: 40px;
    box-shadow: 0px 0px 5px lightgray;

    > input[type='checkbox'] {
      width: 50px;
    }

    &:focus {
      outline: none;
      border: solid 1px lightgray;
    }
  }
`;

const TodoPostBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: absolute;
  right: 20px;

  > button {
    color: #22262c;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

function TodoMain() {
  const [todoData, setTodoData] = useState<TodoType[]>([]);
  const [todoBody, setTodoBody] = useState<string>('');

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

  return (
    <TodoContainer>
      <TodoArea>
        <TodoInputArea>
          <InputText>
            <input
              className="todoInput"
              data-testid="new-todo-input"
              placeholder="할 일을 입력해 주세요."
              onChange={onChangeTodoBody}
            />
          </InputText>
          <TodoPostBtn>
            <button data-testid="new-todo-add-button" onClick={addTodoText}>
              추가
            </button>
          </TodoPostBtn>
        </TodoInputArea>
        <ul>
          {todoData.map((value) => {
            return (
              <TodoList list={value} key={value.id} getTodoData={getTodoData} />
            );
          })}
        </ul>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoMain;
