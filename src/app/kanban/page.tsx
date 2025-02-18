"use client";

import { useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type ListName = "todo" | "inProgress" | "done" | "backlog";

export default function Page() {
  const [lists, setLists] = useState<Record<ListName, string[]>>({
    todo: [],
    inProgress: [],
    done: [],
    backlog: [], // Added new list
  });
  const [inputValues, setInputValues] = useState({
    todo: "",
    inProgress: "",
    done: "",
    backlog: "",
  });

  const handleSubmit = (listName: ListName, e: React.FormEvent) => {
    e.preventDefault();
    if (inputValues[listName].trim()) {
      setLists({
        ...lists,
        [listName]: [...lists[listName], inputValues[listName].trim()],
      });
      setInputValues({
        ...inputValues,
        [listName]: "",
      });
    }
  };

  const deleteTodo = (listName: ListName, index: number) => {
    setLists({
      ...lists,
      [listName]: lists[listName].filter((_, i) => i !== index),
    });
  };

  const moveTodo = (fromList: ListName, toList: ListName, index: number) => {
    const todo = lists[fromList][index];
    setLists({
      ...lists,
      [fromList]: lists[fromList].filter((_, i) => i !== index),
      [toList]: [...lists[toList], todo],
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-4">Backlog</h2>
          <form onSubmit={(e) => handleSubmit("backlog", e)} className="mb-4">
            <input
              type="text"
              value={inputValues.backlog}
              onChange={(e) =>
                setInputValues({ ...inputValues, backlog: e.target.value })
              }
              placeholder="Add to backlog..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <ul className="space-y-2">
            {lists.backlog.map((todo, index) => (
              <li
                key={index}
                className="group flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled
                >
                  <ChevronLeft size={18} className="text-gray-300" />
                </button>
                <span className="font-[family-name:var(--font-geist-sans)]">
                  {todo}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveTodo("backlog", "todo", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => deleteTodo("backlog", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">To Do</h2>
          <form onSubmit={(e) => handleSubmit("todo", e)} className="mb-4">
            <input
              type="text"
              value={inputValues.todo}
              onChange={(e) =>
                setInputValues({ ...inputValues, todo: e.target.value })
              }
              placeholder="Add a new todo..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <ul className="space-y-2">
            {lists.todo.map((todo, index) => (
              <li
                key={index}
                className="group flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => moveTodo("todo", "backlog", index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-[family-name:var(--font-geist-sans)]">
                  {todo}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveTodo("todo", "inProgress", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => deleteTodo("todo", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">In Progress</h2>
          <form
            onSubmit={(e) => handleSubmit("inProgress", e)}
            className="mb-4"
          >
            <input
              type="text"
              value={inputValues.inProgress}
              onChange={(e) =>
                setInputValues({ ...inputValues, inProgress: e.target.value })
              }
              placeholder="Add to in progress..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <ul className="space-y-2">
            {lists.inProgress.map((todo, index) => (
              <li
                key={index}
                className="group flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => moveTodo("inProgress", "todo", index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-[family-name:var(--font-geist-sans)]">
                  {todo}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveTodo("inProgress", "done", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => deleteTodo("inProgress", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Done</h2>
          <form onSubmit={(e) => handleSubmit("done", e)} className="mb-4">
            <input
              type="text"
              value={inputValues.done}
              onChange={(e) =>
                setInputValues({ ...inputValues, done: e.target.value })
              }
              placeholder="Add to done..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
          <ul className="space-y-2">
            {lists.done.map((todo, index) => (
              <li
                key={index}
                className="group flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => moveTodo("done", "inProgress", index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-[family-name:var(--font-geist-sans)]">
                  {todo}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled
                  >
                    <ChevronRight size={18} className="text-gray-300" />
                  </button>
                  <button
                    onClick={() => deleteTodo("done", index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
