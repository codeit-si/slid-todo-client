"use client";

// import Filter from "@/components/filter";
// const [filter, setFilter] = useState("all"); 를 사용한다고 하면
// <Filter filter={filter} setFilter={setFilter} /> 이렇게 사용하시면 됩니다. (All, To do, Done 세 개가 동시에 뜹니다.)

interface FilterProps {
  filter: string;
  setFilter: (value: string) => void;
}

const Filter = ({ filter, setFilter }: FilterProps) => {
  const filters = [
    { value: "all", label: "All" },
    { value: "todo", label: "To do" },
    { value: "done", label: "Done" },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`rounded-2xl border px-4 py-2 text-base transition-colors ${
            filter === value
              ? "bg-blue-500 text-white"
              : "border-slate-300 bg-white text-slate-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
