"use client";

// import Counting from "@/components/counting";
// 예) const countWithoutSpaces = (str: string) => str.replace(/\s/g, "").length;
// 예) <Counting type="title" count={title.length} total={30} />
// 예) <Counting type="text" count={countWithoutSpaces(text)} total={text.length} />

interface CountingProps {
  type: "title" | "text";
  count: number;
  total: number;
}

const Counting = ({ type, count, total }: CountingProps) => {
  return (
    <div
      className={`font-pretendard absolute flex items-center justify-center rounded-[4px] text-xs font-medium ${
        type === "title"
          ? "h-[20px] bg-white/50 px-1 text-slate-800"
          : "h-[16px] text-slate-800"
      }`}
    >
      {type === "title" ? (
        <>
          {count}/<span className="text-blue-500">{total}</span>
        </>
      ) : (
        `공백포함 : 총 ${total}자 | 공백제외 : 총 ${count}자`
      )}
    </div>
  );
};

export default Counting;
