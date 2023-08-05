import { useState } from 'react';
import * as Styled from '../style/todoStyle';
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
    <Styled.TodoItemContainer>
      <Styled.Label htmlFor={`todo_${list.id}`}>
        <Styled.Checkbox
          id={`todo_${list.id}`}
          type='checkbox'
          checked={list.isCompleted}
          onChange={updateTodoCheck}
        />
        {isEditBtnClick ? (
          <Styled.EditTodoBodyInput
            data-testid='modify-input'
            type='text'
            value={editEditTodoInput}
            onChange={onChangeEditTodoInput}
          />
        ) : (
          <Styled.TodoBody>{list.todo}</Styled.TodoBody>
        )}
      </Styled.Label>
      <Styled.ButtonArea>
        {isEditBtnClick ? (
          <>
            <Styled.EditOrSubmitBtn
              data-testid='submit-button'
              onClick={() => updateEditTodoInput(list.id)}
            >
              제출
            </Styled.EditOrSubmitBtn>
            <Styled.DeleteOrCancelBtn data-testid='cancel-button' onClick={editModeCancelBtn}>
              취소
            </Styled.DeleteOrCancelBtn>
          </>
        ) : (
          <>
            <Styled.EditOrSubmitBtn data-testid='modify-button' onClick={changeEditModeBtn}>
              수정
            </Styled.EditOrSubmitBtn>
            <Styled.DeleteOrCancelBtn data-testid='delete-button' onClick={deleteTodo}>
              삭제
            </Styled.DeleteOrCancelBtn>
          </>
        )}
      </Styled.ButtonArea>
    </Styled.TodoItemContainer>
  );
}

export default TodoItem;
