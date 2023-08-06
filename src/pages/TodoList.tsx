import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import TodoItem from '../components/TodoItem';
import { useGetTodos } from '../hooks/useGetTodo';
import {
  TodoContainer,
  TodoArea,
  TodoTitle,
  TodoInputArea,
  TodoInput,
  TodoAddBtn,
  TodoListArea,
} from '../style/todoStyle';
import { TODO_API } from '../util/api';
import { TodoType } from '../util/interface';

function TodoList() {
  const [newTodoInput, setNewTodoInput] = useState<string>('');

  const { todos, getTodos } = useGetTodos('/todos');
  const reverseTodoData: TodoType[] = todos.sort((a, b) => b.id - a.id);

  const createTodo = async () => {
    try {
      if (newTodoInput) {
        const newTodo = {
          todo: newTodoInput,
        };
        await TODO_API.post('/todos', newTodo);
        getTodos();
        setNewTodoInput('');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChangeTodoBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(e.target.value);
  };

  const logOut = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  return (
    <TodoContainer>
      <TodoArea>
        <TodoTitle>
          Todo List
          <FiLogOut className='logoutBtn' size={21} onClick={logOut} />
        </TodoTitle>
        <TodoInputArea>
          <TodoInput
            data-testid='new-todo-input'
            placeholder='할 일을 입력해 주세요.'
            value={newTodoInput}
            onChange={onChangeTodoBody}
          />
          <TodoAddBtn data-testid='new-todo-add-button' onClick={createTodo}>
            추가
          </TodoAddBtn>
        </TodoInputArea>
        <TodoListArea>
          {reverseTodoData.map((value) => {
            return <TodoItem list={value} key={value.id} getTodos={getTodos} />;
          })}
        </TodoListArea>
      </TodoArea>
    </TodoContainer>
  );
}

export default TodoList;
