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

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Checkbox = styled.input`
  min-width: 15px;
  min-height: 15px;
  cursor: pointer;
`;

const TodoBodyInput = styled.input`
  padding: 7px 5px 7px 5px;
  border-radius: 4px;
  border: none;
  width: 100%;
  margin: 0 10px 0 10px;
  outline: 1px solid lightgray;
`;

const TodoBody = styled.div`
  font-size: 15px;
  width: 100%;
  margin: 0 10px 0 10px;
  word-break: break-all;
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
  const [editEditTodoInput, setEditTodoInput] = useState(list.todo);
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
    setEditTodoInput(e.target.value);
  };

  const changeEditModeBtn = () => {
    setIsEditBtnClick(!isEditBtnClick);
  };

  const editModeCancelBtn = () => {
    setIsEditBtnClick(!isEditBtnClick);
    setEditTodoInput(list.todo);
  };

  return (
    <TodoWrapper>
      <Label htmlFor={`todo-${list.id}`}>
        <Checkbox
          id={`todo-${list.id}`}
          type="checkbox"
          checked={list.isCompleted}
          onChange={() => updateTodoCheck(list.id)}
        />
        {isEditBtnClick ? (
          <TodoBodyInput
            className="editTodo"
            data-testid="modify-input"
            type="text"
            value={editEditTodoInput}
            onChange={onChangeEditEditTodoInput}
          />
        ) : (
          <TodoBody className="todoBody">{list.todo}</TodoBody>
        )}
      </Label>
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
            onClick={changeEditModeBtn}
          >
            수정
          </EditOrSubmitBtn>
        )}
        {isEditBtnClick ? (
          <DeleteOrCancelBtn
            className="falseBtn"
            data-testid="cancel-button"
            onClick={editModeCancelBtn}
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
