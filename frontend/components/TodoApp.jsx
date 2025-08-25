"use client";
import { fetchData } from "@/lib/fetchData";
import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchData("todos");
      if (data) setTodos(data);
      setLoading(false);
    };

    loadTodos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Your Todos</h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="p-2 border rounded ">
            <p>{todo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
