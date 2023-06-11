import { useState } from 'react';
import styled from 'styled-components';
import { TOKEN_API } from '../../util/api';

const TodoWrapper = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  list-style: none;
  border-bottom: 1px solid #ebebeb;
`;

const Checkbox = styled.input`
  min-width: 15px;
  min-height: 15px;
`;

const TextArea = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 15px;
  margin: 0 10px 0 10px;

  > .editTodo {
    padding: 7px 5px 7px 5px;
    border-radius: 4px;
    border: solid 1px lightgray;
    width: 100%;
  }

  > .todoBody {
    word-break: break-all;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  > button {
    width: 40px;
    height: 25px;
    font-size: 13px;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const EditOrSubmitBtn = styled.button`
  color: white;
  outline: 1px solid #645cbb;
  background-color: #645cbb;
`;

const DeleteOrCancelBtn = styled.button`
  color: #645cbb;
  outline: 1.5px solid #645cbb;
  background-color: transparent;
`;

function TodoList({ list, getTodoData }: any) {
  const [editEditTodoInput, setEditEditTodoInput] = useState(list.todo);
  const [isEditBtnClick, setIsEditBtnClick] = useState(false);

  const updateEditTodoInput = async (id: number) => {
    const editTodo = {
      todo: editEditTodoInput,
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

  const onChangeEditEditTodoInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditEditTodoInput(e.target.value);
  };

  const onClickEditBtn = () => {
    setIsEditBtnClick(!isEditBtnClick);
  };

  return (
    <TodoWrapper>
      <Checkbox
        type="checkbox"
        checked={list.isCompleted}
        onChange={() => updateTodoCheck(list.id)}
      />
      <TextArea>
        {isEditBtnClick ? (
          <input
            className="editTodo"
            data-testid="modify-input"
            type="text"
            value={editEditTodoInput}
            onChange={onChangeEditEditTodoInput}
          />
        ) : (
          <div className="todoBody">{list.todo}</div>
        )}
      </TextArea>
      <ButtonArea>
        {isEditBtnClick ? (
          <EditOrSubmitBtn
            className="trueBtn"
            data-testid="submit-button"
            onClick={() => updateEditTodoInput(list.id)}
          >
            제출
          </EditOrSubmitBtn>
        ) : (
          <EditOrSubmitBtn
            className="trueBtn"
            data-testid="modify-button"
            onClick={onClickEditBtn}
          >
            수정
          </EditOrSubmitBtn>
        )}
        {isEditBtnClick ? (
          <DeleteOrCancelBtn
            className="falseBtn"
            data-testid="cancel-button"
            onClick={onClickEditBtn}
          >
            취소
          </DeleteOrCancelBtn>
        ) : (
          <DeleteOrCancelBtn
            className="falseBtn"
            data-testid="delete-button"
            onClick={() => deleteTodo(list.id)}
          >
            삭제
          </DeleteOrCancelBtn>
        )}
      </ButtonArea>
    </TodoWrapper>
  );
}

export default TodoList;
