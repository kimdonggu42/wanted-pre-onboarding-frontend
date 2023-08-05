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

function TodoItem({ list, getTodos }: TodoTypeProps) {
  const [editTodoInput, setEditTodoInput] = useState<string>(list.todo);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const updateTodo = async () => {
    try {
      if (editTodoInput.length !== 0) {
        const editTodo = {
          todo: editTodoInput,
          isCompleted: list.isCompleted,
        };
        await TODO_API.put(`/todos/${list.id}`, editTodo);
        getTodos();
        setIsEditMode(false);
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
      getTodos();
    } catch (err) {
      alert(err);
    }
  };

  const deleteTodo = async () => {
    try {
      await TODO_API.delete(`/todos/${list.id}`);
      getTodos();
    } catch (err) {
      alert(err);
    }
  };

  const onChangeEditTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoInput(e.target.value);
  };

  const changeEditModeBtn = () => {
    setIsEditMode(!isEditMode);
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
        {isEditMode ? (
          <EditTodoBodyInput
            data-testid='modify-input'
            type='text'
            value={editTodoInput}
            onChange={onChangeEditTodoInput}
          />
        ) : (
          <TodoBody>{list.todo}</TodoBody>
        )}
      </Label>
      <ButtonArea>
        {isEditMode ? (
          <>
            <EditOrSubmitBtn data-testid='submit-button' onClick={updateTodo}>
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
