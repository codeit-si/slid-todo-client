"use client";

import { useEffect, useState } from "react";

import {
  useInfiniteQuery,
  InfiniteQueryObserverResult,
  InfiniteData,
} from "@tanstack/react-query";

import NoteIcon from "@/assets/note.svg";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export type Todo = {
  id: string;
  title: string;
  status: "todo" | "done";
  hasNote: string | null;
  hasLink: boolean;
  hasFile: boolean;
};
interface ListTodoProps {
  fetchTodos?: (
    pageParam?: number,
  ) => Promise<{ todos: Todo[]; nextPage?: number }>;
}
type BaseTodoProps = {
  index: number;
  todo: Todo;
};
type TodoTitleAndCheckBoxProps = BaseTodoProps & {
  toggleStatus: (id: string) => void;
};

type TodoEditAndDeleteAndIconsProps = BaseTodoProps & {
  activeKebab: number | null;
  handleKebabClick: (index: number) => void;
};
type NoteProps = {
  todo: Todo;
  noteIcon: JSX.Element;
};

const notes = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quod.",
  "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  "orem ipsum dolor sit amet.",
  "Lorem ipsum dolor sit amet consectetur.",
];
const getRandomNote = () => {
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
};
const mockFetchTodos = async (pageParam = 1) => {
  return new Promise<{ todos: Todo[]; nextPage?: number }>((resolve) => {
    setTimeout(() => {
      const todos: Todo[] = Array.from({ length: 40 }, (_, i) => ({
        id: `todo-${pageParam}-${i}`,
        title: `${pageParam}-${i + 1} ${getRandomNote()}`,
        status: Math.random() > 0.5 ? "todo" : "done",
        hasNote: Math.random() > 0.5 ? getRandomNote() : null,
        hasLink: Math.random() > 0.5,
        hasFile: Math.random() > 0.5,
      }));
      resolve({ todos, nextPage: pageParam < 3 ? pageParam + 1 : undefined });
    }, 500);
  });
};
const TodoTitleAndCheckBox = ({
  index,
  todo,
  toggleStatus,
}: TodoTitleAndCheckBoxProps) => {
  return (
    <div className="flex items-center gap-10">
      <label
        htmlFor={`todo-check-${index}`}
        className="relative flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          id={`todo-check-${index}`}
          checked={todo.status === "done"}
          onChange={() => toggleStatus(todo.id)}
          className="peer absolute hidden"
        />
        <div className="flex h-20 w-20 items-center justify-center rounded-md border peer-checked:border-purple-500 peer-checked:bg-purple-500">
          <span className="absolute h-full w-full text-center text-sm font-bold text-slate-50">
            ✓
          </span>
        </div>
      </label>
      <span className={`${todo.status === "done" ? "line-through" : ""}`}>
        {todo.title}
      </span>
    </div>
  );
};
const TodoEditAndDeleteAndIcons = ({
  todo,
  index,
  activeKebab,
  handleKebabClick,
}: TodoEditAndDeleteAndIconsProps) => {
  return (
    <div className="flex items-center gap-15">
      {todo.hasLink && <p>링크</p>}
      {todo.hasFile && <p>파일</p>}
      <div className="relative">
        <button className="px-3" onClick={() => handleKebabClick(index)}>
          ⋮
        </button>
        <div
          className={`${activeKebab !== index ? "hidden" : "flex"} absolute -left-70 z-10 w-80 flex-col items-center gap-10 rounded-lg bg-slate-50 p-10 shadow-md`}
        >
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
      </div>
    </div>
  );
};
const Note = ({ noteIcon, todo }: NoteProps) => {
  if (!todo.hasNote) return;
  return (
    <div className="ml-30 mt-10 flex items-center gap-10 text-slate-700">
      {noteIcon}
      <p className={`${todo.status === "done" ? "line-through" : ""}`}>
        {todo.hasNote}
      </p>
    </div>
  );
};

export default function ListTodo({
  fetchTodos = mockFetchTodos,
}: ListTodoProps) {
  const [filter, setFilter] = useState<"all" | "todo" | "done">("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeKebab, setActiveKebab] = useState<null | number>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
  }: InfiniteQueryObserverResult<
    InfiniteData<{ todos: Todo[]; nextPage?: number }>
  > = useInfiniteQuery({
    queryKey: ["todos", filter],
    queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const { setTarget } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  useEffect(() => {
    setTodos(
      (data?.pages ?? [])
        .flatMap((page) => page.todos)
        .filter((x) => filter === "all" || x.status === filter),
    );
  }, [data, filter]);

  const toggleStatus = (id: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = new Map(prevTodos.map((todo) => [todo.id, todo]));
      if (updatedTodos.has(id)) {
        updatedTodos.set(id, {
          ...updatedTodos.get(id)!,
          status: updatedTodos.get(id)!.status === "todo" ? "done" : "todo",
        });
      }
      return Array.from(updatedTodos.values());
    });
  };

  const statusLabels: Record<"all" | "todo" | "done", string> = {
    all: "All",
    todo: "To do",
    done: "Done",
  };

  const statusMap = (["all", "todo", "done"] as const).map((status) => (
    <li
      key={status}
      className={`${
        status === filter ? "border-purple-500 bg-purple-500 text-slate-50" : ""
      } cursor-pointer rounded-3xl border`}
    >
      <button
        className="h-full w-full px-10 py-2"
        onClick={() => setFilter(status)}
      >
        {statusLabels[status]}
      </button>
    </li>
  ));

  const handleKebabClick = (index: number) =>
    setActiveKebab((prev) => (prev === index ? null : index));

  return (
    <div className="mx-auto min-h-[2080px] w-full max-w-2xl rounded-xl border-slate-300 bg-slate-50 p-20 text-sm text-slate-800">
      <ul className="mb-20 flex gap-10">{statusMap}</ul>
      <ul className="space-y-15">
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <div className="flex items-center justify-between">
              <TodoTitleAndCheckBox
                index={index}
                todo={todo}
                toggleStatus={toggleStatus}
              />
              <TodoEditAndDeleteAndIcons
                activeKebab={activeKebab}
                handleKebabClick={handleKebabClick}
                index={index}
                todo={todo}
              />
            </div>
            <Note todo={todo} noteIcon={<NoteIcon />} />
          </li>
        ))}
      </ul>
      <div ref={setTarget} className="h-[.5px]" />
    </div>
  );
}
