import styled from 'styled-components';

// TodoList
export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const TodoArea = styled.div`
  width: 100vw;
  max-width: 700px;
  padding: 20px;
`;

export const TodoTitle = styled.div`
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

export const TodoInputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
`;

export const TodoInput = styled.input`
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

export const TodoAddBtn = styled.button`
  position: absolute;
  font-size: 15px;
  font-weight: 600;
  right: 17px;
  padding: 5px 10px 5px 10px;
  background-color: transparent;
  border: none;
`;

export const TodoListArea = styled.ul`
  list-style: none;

  :last-child {
    border-bottom: none;
  }
`;

// TodoItem
export const TodoItemContainer = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  list-style: none;
  border-bottom: 1px solid #ebebeb;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Checkbox = styled.input`
  min-width: 15px;
  min-height: 15px;
  accent-color: #576cbc;
  cursor: pointer;
`;

export const EditTodoBodyInput = styled.input`
  padding: 7px 5px 7px 5px;
  border-radius: 4px;
  border: none;
  width: 100%;
  margin: 0 10px 0 10px;
  outline: 1px solid lightgray;
`;

export const TodoBody = styled.div`
  font-size: 15px;
  width: 100%;
  margin: 0 10px 0 10px;
  word-break: break-all;
`;

export const ButtonArea = styled.div`
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
  }
`;

export const EditOrSubmitBtn = styled.button`
  color: white;
  outline: 1px solid #576cbc;
  background-color: #576cbc;
`;

export const DeleteOrCancelBtn = styled.button`
  color: #576cbc;
  outline: 1.1px solid #576cbc;
  background-color: transparent;
`;
