import { useState } from 'react';
import {
  TodoItemContainer,
  Label,
  Checkbox,
  EditTodoBodyInput,
  TodoBody,
  ButtonArea,
  EditOrSubmitBtn,
  DeleteOrCancelBtn,
} from '../style/todoStyle';
import { TODO_API } from '../util/api';
import { TodoTypeProps } from '../util/interface';

function TodoItem({ list, getTodoData }: TodoTypeProps) {
  const [editEditTodoInput, setEditTodoInput] = useState<string>(list.todo);
  const [isEditBtnClick, setIsEditBtnClick] = useState<boolean>(false);

  const updateEditTodoInput = async (id: number) => {
    try {
      if (editEditTodoInput.length !== 0) {
        const editTodo = {
          todo: editEditTodoInput,
          isCompleted: list.isCompleted,
        };
        await TODO_API.put(`/todos/${id}`, editTodo);
        getTodoData();
        setIsEditBtnClick(false);
      } else {
        alert('수정할 내용이 비어있습니다.');
      }
    } catch (err) {
      alert(err);
    }
  };

  const updateTodoCheck = async () => {
    try {
      const editTodo = {
        todo: list.todo,
        isCompleted: !list.isCompleted,
      };
      await TODO_API.put(`/todos/${list.id}`, editTodo);
      getTodoData();
    } catch (err) {
      alert(err);
    }
  };

  const deleteTodo = async () => {
    try {
      await TODO_API.delete(`/todos/${list.id}`);
      getTodoData();
    } catch (err) {
      alert(err);
    }
  };

  const onChangeEditTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoInput(e.target.value);
  };

  const changeEditModeBtn = () => {
    setIsEditBtnClick(!isEditBtnClick);
  };

  const editModeCancelBtn = () => {
    changeEditModeBtn();
    setEditTodoInput(list.todo);
  };

  return (
    <TodoItemContainer>
      <Label htmlFor={`todo_${list.id}`}>
        <Checkbox
          id={`todo_${list.id}`}
          type='checkbox'
          checked={list.isCompleted}
          onChange={updateTodoCheck}
        />
        {isEditBtnClick ? (
          <EditTodoBodyInput
            data-testid='modify-input'
            type='text'
            value={editEditTodoInput}
            onChange={onChangeEditTodoInput}
          />
        ) : (
          <TodoBody>{list.todo}</TodoBody>
        )}
      </Label>
      <ButtonArea>
        {isEditBtnClick ? (
          <>
            <EditOrSubmitBtn
              data-testid='submit-button'
              onClick={() => updateEditTodoInput(list.id)}
            >
              제출
            </EditOrSubmitBtn>
            <DeleteOrCancelBtn data-testid='cancel-button' onClick={editModeCancelBtn}>
              취소
            </DeleteOrCancelBtn>
          </>
        ) : (
          <>
            <EditOrSubmitBtn data-testid='modify-button' onClick={changeEditModeBtn}>
              수정
            </EditOrSubmitBtn>
            <DeleteOrCancelBtn data-testid='delete-button' onClick={deleteTodo}>
              삭제
            </DeleteOrCancelBtn>
          </>
        )}
      </ButtonArea>
    </TodoItemContainer>
  );
}

export default TodoItem;
