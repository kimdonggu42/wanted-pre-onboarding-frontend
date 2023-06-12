import { useState } from 'react';
import styled from 'styled-components';
import { TOKEN_API } from '../../util/instance';
import { TodoTypeProps } from '../../util/type';

const TodoItem = styled.li`
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
  accent-color: ${(props) => props.theme.color.mainColor};
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
  outline: 1px solid ${(props) => props.theme.color.mainColor};
  background-color: ${(props) => props.theme.color.mainColor};
`;

const DeleteOrCancelBtn = styled.button`
  color: ${(props) => props.theme.color.mainColor};
  outline: 1.1px solid ${(props) => props.theme.color.mainColor};
  background-color: transparent;
`;

function TodoList({ list, getTodoData }: TodoTypeProps) {
  const [editEditTodoInput, setEditTodoInput] = useState<string>(list.todo);
  const [isEditBtnClick, setIsEditBtnClick] = useState<boolean>(false);

  const updateEditTodoInput = async (id: number) => {
    try {
      const editTodo = {
        todo: editEditTodoInput,
        isCompleted: list.isCompleted,
      };
      await TOKEN_API.put(`/todos/${id}`, editTodo);
      getTodoData();
    } catch (err) {
      console.error(err);
    }
    setIsEditBtnClick(false);
  };

  const updateTodoCheck = async (id: number) => {
    try {
      const editTodo = {
        todo: list.todo,
        isCompleted: !list.isCompleted,
      };
      await TOKEN_API.put(`/todos/${id}`, editTodo);
      getTodoData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await TOKEN_API.delete(`/todos/${id}`);
      getTodoData();
    } catch (err) {
      console.error(err);
    }
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
    <TodoItem>
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
    </TodoItem>
  );
}

export default TodoList;
