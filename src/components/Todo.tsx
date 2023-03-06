import { Todo } from "../types";

interface TodoProps {
  todo: Todo;
  toggleComplete: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoComponent({
  todo,
  toggleComplete,
  deleteTodo,
}: TodoProps) {
  return (
    <li className="flex flex-row items-center justify-between space-x-2 mb-2 pb-1 border-b border-gray-600 max-w-sm">
      <input
        onChange={() => toggleComplete(todo)}
        type="checkbox"
        checked={todo.completed}
        className="bg-slate-100  border-black text-gray-700 focus:ring-0 checked:shadow-xl rounded-full"
      />
      <p
        className={`${
          todo.completed && "line-through"
        } text-left flex-1 hover:text-black transition-all`}
        onClick={() => toggleComplete(todo)}
      >
        {todo.text}
      </p>
      <button className="font-bold" onClick={() => deleteTodo(todo.id)}>
        x
      </button>
    </li>
  );
}
