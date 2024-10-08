import React, { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">To-Do List</h2>
      <div className="flex mb-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-2 py-1"
          placeholder="Add new todo"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-3 py-1 rounded-r">Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <button onClick={() => toggleTodo(todo.id)} className="mr-2">
              <Check size={20} className={todo.completed ? 'text-green-500' : 'text-gray-300'} />
            </button>
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;