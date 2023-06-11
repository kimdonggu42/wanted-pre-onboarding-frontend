import { useState } from 'react';
import styled from 'styled-components';
import { TOKEN_API } from '../../util/api';

const TodoWrapper = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  list-style: none;
  border-bottom: 1px solid #ebebeb;

  :last-child {
    border-bottom: none;
  }
`;

const TextArea = styled.label`
  display: flex;
  align-items: center;
  flex: 8;
  height: 30px;

  > .checkBox {
    margin-right: 20px;
    cursor: pointer;
  }

  > input[type='checkbox'] {
    width: 18px;
    height: 18px;
  }

  > .editTodo {
    font-size: 15px;
    padding: 0px 5px 0px 5px;
    border-radius: 4px;
    border: solid 1px #22262c;
    width: 100%;
    height: 30px;
  }

  > .todoContent {
    width: 100%;
    font-size: 15px;
    word-break: break-all;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  height: 30px;
  column-gap: 10px;
  margin-left: 10px;

  > button {
    width: 40px;
    height: 25px;
    font-size: 13px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  > .trueBtn {
    color: white;
    outline: 1px solid #645cbb;
    background-color: #645cbb;
  }

  > .falseBtn {
    color: #645cbb;
    outline: 1.5px solid #645cbb;
    background-color: transparent;
  }
`;

function TodoList({ list, getTodoData }: any) {
  const [editTodoBody, setEditTodoBody] = useState(list.todo);
  const [isEditBtnClick, setIsEditBtnClick] = useState(false);

  const updateTodoBody = async (id: number) => {
    const editTodo = {
      todo: editTodoBody,
      isCompleted: list.isCompleted,
    };
    await TOKEN_API.put(`/todos/${id}`, editTodo);
    getTodoData();
    setIsEditBtnClick(false);
  };

  const updateTodoCheck = async (id: number) => {
    const editTodo = {
      todo: list.todo,
      isCompleted: !list.isCompleted,
    };
    await TOKEN_API.put(`/todos/${id}`, editTodo);
    getTodoData();
    setIsEditBtnClick(false);
  };

  const deleteTodo = async (id: number) => {
    await TOKEN_API.delete(`/todos/${id}`);
    getTodoData();
  };

  const onChangeEditTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoBody(e.target.value);
  };

  const onClickEditBtn = () => {
    setIsEditBtnClick(!isEditBtnClick);
  };

  return (
    <TodoWrapper>
      <TextArea>
        <input
          className="checkBox"
          type="checkbox"
          checked={list.isCompleted}
          onChange={() => updateTodoCheck(list.id)}
        />
        {isEditBtnClick ? (
          <input
            className="editTodo"
            data-testid="modify-input"
            type="text"
            value={editTodoBody}
            onChange={onChangeEditTodoBody}
          />
        ) : (
          <span className="todoContent">{list.todo}</span>
        )}
      </TextArea>
      <ButtonArea>
        {isEditBtnClick ? (
          <button
            className="trueBtn"
            data-testid="submit-button"
            onClick={() => updateTodoBody(list.id)}
          >
            제출
          </button>
        ) : (
          <button
            className="trueBtn"
            data-testid="modify-button"
            onClick={onClickEditBtn}
          >
            수정
          </button>
        )}
        {isEditBtnClick ? (
          <button
            className="falseBtn"
            data-testid="cancel-button"
            onClick={onClickEditBtn}
          >
            취소
          </button>
        ) : (
          <button
            className="falseBtn"
            data-testid="delete-button"
            onClick={() => deleteTodo(list.id)}
          >
            삭제
          </button>
        )}
      </ButtonArea>
    </TodoWrapper>
  );
}

export default TodoList;
