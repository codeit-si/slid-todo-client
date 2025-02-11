"use client";

import { useEffect, useState } from "react";

import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
  InfiniteQueryObserverResult,
  InfiniteData,
} from "@tanstack/react-query";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type Todo = {
  id: string;
  title: string;
  status: "todo" | "done";
  hasNote: string | null;
  hasLink: boolean;
  hasFile: boolean;
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
        status: i % 2 === 0 ? "todo" : "done",
        hasNote: Math.random() > 0.5 ? getRandomNote() : null,
        hasLink: Math.random() > 0.5,
        hasFile: Math.random() > 0.5,
      }));
      resolve({ todos, nextPage: pageParam < 3 ? pageParam + 1 : undefined });
    }, 500);
  });
};

interface ListTodoProps {
  fetchTodos: (
    pageParam?: number,
  ) => Promise<{ todos: Todo[]; nextPage?: number }>;
}

const queryClient = new QueryClient();

function ListTodoStructure({ fetchTodos }: ListTodoProps) {
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
    if (data) {
      const allTodos = data.pages
        .flatMap((page) => page.todos)
        .filter((x) => x.status !== filter);
      setTodos(allTodos);
    }
  }, [data, filter]);

  const toggleStatus = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
          : todo,
      ),
    );
  };

  const statusButtons = (status: string) => {
    if (status === "all") return "All";
    if (status === "done") return "To do";
    return "Done";
  };

  const statusMap = (["all", "todo", "done"] as const).map((status) => {
    return (
      <li
        key={status}
        className={`${
          status === filter ? "border-blue-500 bg-blue-500 text-white" : ""
        } cursor-pointer rounded-3xl border px-3 py-1`}
      >
        <button onClick={() => setFilter(status)}>
          {statusButtons(status)}
        </button>
      </li>
    );
  });

  const handleKebabClick = (index: number) =>
    setActiveKebab(index === activeKebab ? null : index);

  const noteIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#EFF6FF" />
      <path
        d="M10.5779 9.95929C10.5854 9.94634 10.5926 9.94091 10.5983 9.93774C10.6054 9.93381 10.6154 9.93081 10.6273 9.93081C10.6391 9.93081 10.6491 9.93381 10.6562 9.93774C10.6619 9.94092 10.6691 9.94635 10.6766 9.95929L14.1302 15.9411C14.1377 15.954 14.1388 15.963 14.1387 15.9695C14.1385 15.9776 14.1361 15.9878 14.1302 15.9981C14.1242 16.0083 14.1166 16.0155 14.1097 16.0197C14.1041 16.023 14.0958 16.0265 14.0808 16.0265H7.17366C7.15871 16.0265 7.15042 16.023 7.14481 16.0197C7.13786 16.0155 7.13026 16.0083 7.12432 15.9981C7.11839 15.9878 7.11599 15.9776 7.11585 15.9695C7.11573 15.963 7.11685 15.954 7.12432 15.9411L10.5779 9.95929Z"
        stroke="#94A3B8"
        strokeWidth="1.02545"
      />
      <path
        d="M10.627 9.70302V7.99393M10.627 7.99393V6.18436C10.627 6.09966 10.7161 6.04457 10.7918 6.08245L12.672 7.02254C12.761 7.06703 12.7542 7.1962 12.6611 7.23113L10.627 7.99393Z"
        stroke="#94A3B8"
        strokeWidth="1.02545"
      />
      <mask id="path-4-inside-1_1_6949" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3604 12.834L13.4773 10.8994L16.1415 15.5139H13.9076L14.0063 15.6849C14.2256 16.0647 13.9515 16.5394 13.5129 16.5394H16.9309C17.3694 16.5394 17.6435 16.0647 17.4243 15.6849L13.9707 9.70306C13.7514 9.32326 13.2032 9.32326 12.9839 9.70306L11.7683 11.8086L12.3604 12.834Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3604 12.834L13.4773 10.8994L16.1415 15.5139H13.9076L14.0063 15.6849C14.2256 16.0647 13.9515 16.5394 13.5129 16.5394H16.9309C17.3694 16.5394 17.6435 16.0647 17.4243 15.6849L13.9707 9.70306C13.7514 9.32326 13.2032 9.32326 12.9839 9.70306L11.7683 11.8086L12.3604 12.834Z"
        fill="#94A3B8"
      />
      <path
        d="M13.4773 10.8994L14.3654 10.3867L13.4773 8.84852L12.5892 10.3867L13.4773 10.8994ZM12.3604 12.834L11.4723 13.3467L12.3604 14.8849L13.2484 13.3467L12.3604 12.834ZM16.1415 15.5139V16.5394H17.9176L17.0296 15.0012L16.1415 15.5139ZM13.9076 15.5139V14.4885H12.1315L13.0195 16.0267L13.9076 15.5139ZM14.0063 15.6849L13.1182 16.1976H13.1182L14.0063 15.6849ZM17.4243 15.6849L18.3123 15.1721L18.3123 15.1721L17.4243 15.6849ZM13.9707 9.70306L13.0826 10.2158L13.0826 10.2158L13.9707 9.70306ZM12.9839 9.70306L12.0959 9.19033L12.9839 9.70306ZM11.7683 11.8086L10.8802 11.2958L10.5842 11.8086L10.8802 12.3213L11.7683 11.8086ZM12.5892 10.3867L11.4723 12.3213L13.2484 13.3467L14.3654 11.4121L12.5892 10.3867ZM17.0296 15.0012L14.3654 10.3867L12.5892 11.4121L15.2534 16.0267L17.0296 15.0012ZM13.9076 16.5394H16.1415V14.4885H13.9076V16.5394ZM13.0195 16.0267L13.1182 16.1976L14.8944 15.1721L14.7957 15.0012L13.0195 16.0267ZM13.1182 16.1976C12.9428 15.8937 13.1621 15.5139 13.5129 15.5139V17.5648C14.7409 17.5648 15.5083 16.2356 14.8944 15.1721L13.1182 16.1976ZM13.5129 17.5648H16.9309V15.5139H13.5129V17.5648ZM16.9309 17.5648C18.1588 17.5648 18.9263 16.2356 18.3123 15.1721L16.5362 16.1976C16.3608 15.8937 16.58 15.5139 16.9309 15.5139V17.5648ZM18.3123 15.1721L14.8587 9.19034L13.0826 10.2158L16.5362 16.1976L18.3123 15.1721ZM14.8587 9.19034C14.2448 8.12691 12.7098 8.1269 12.0959 9.19033L13.872 10.2158C13.6966 10.5196 13.258 10.5196 13.0826 10.2158L14.8587 9.19034ZM12.0959 9.19033L10.8802 11.2958L12.6564 12.3213L13.872 10.2158L12.0959 9.19033ZM10.8802 12.3213L11.4723 13.3467L13.2484 12.3213L12.6564 11.2958L10.8802 12.3213Z"
        fill="#94A3B8"
        mask="url(#path-4-inside-1_1_6949)"
      />
    </svg>
  );

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-6 text-sm text-slate-800">
      <ul className="mb-6 flex gap-2">{statusMap}</ul>
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="todo-check"
                  className="relative flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    id="todo-check"
                    checked={todo.status === "done"}
                    onChange={() => toggleStatus(todo.id)}
                    className="peer absolute hidden"
                  />
                  <div className="flex h-5 w-5 items-center justify-center rounded-md border peer-checked:border-blue-500 peer-checked:bg-blue-500">
                    <span className="absolute h-full w-full text-center text-sm font-bold text-white">
                      ✓
                    </span>
                  </div>
                </label>
                <span
                  className={`${todo.status === "done" ? "line-through" : ""}`}
                >
                  {todo.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {todo.hasLink && <p>링크</p>}
                {todo.hasFile && <p>파일</p>}
                <div className="relative">
                  <button onClick={() => handleKebabClick(index)}>...</button>
                  <div
                    className={`${activeKebab !== index ? "hidden" : "flex"} absolute -left-16 z-10 w-20 flex-col items-center gap-2 rounded-lg bg-white p-2 shadow-md`}
                  >
                    <button>수정하기</button>
                    <button>삭제하기</button>
                  </div>
                </div>
              </div>
            </div>
            {todo.hasNote && (
              <div className="ml-8 mt-2 flex gap-3 text-slate-700">
                {noteIcon}
                <p
                  className={`${todo.status === "done" ? "line-through" : ""}`}
                >
                  {todo.hasNote}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div ref={setTarget} className="h-[1rem]" />
    </div>
  );
}

export default function ListTodo(/* { fetchTodos }: ListTodoProps */) {
  return (
    <QueryClientProvider client={queryClient}>
      <ListTodoStructure fetchTodos={mockFetchTodos} />
    </QueryClientProvider>
  );
}
