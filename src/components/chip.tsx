"use client";

// import Chip from "@/components/chip";
// <Chip
// text="{들어갈 문구}}"
// color="{slate-100, slate-900 중에 선택}"
// size="{small, large 중에 선택}"
// checked = {true, false 중에 선택} /> 처럼 사용하시면 됩니다.
// 예) <Chip text="파일 업로드" color="slate-900" size="small" checked=true />

interface ChipProps {
  text: string;
  color?: "slate-100" | "slate-900";
  size?: "large" | "small";
  checked?: boolean; // 상태를 표시만 해줄 checked prop
}

const Chip = ({
  text,
  color = "slate-100",
  size = "large",
  checked = false,
}: ChipProps) => {
  return (
    <div
      className={`inline-flex cursor-default items-center gap-2 rounded-[8px] px-3 py-2 ${
        color === "slate-100"
          ? "bg-slate-100 text-slate-800"
          : "bg-slate-900 text-white"
      } ${size === "large" ? "text-[16px]" : "text-[14px]"}`}
    >
      {/* 상태 표시용 체크박스 */}
      <input
        type="checkbox"
        checked={checked}
        readOnly // 클릭해도 상태가 바뀌지 않음
        className={`h-4 w-4 rounded-[4px] border-2 ${
          checked ? "bg-blue-500" : "bg-white"
        }`}
      />
      <span className="font-pretendard font-medium">{text}</span>
    </div>
  );
};

export default Chip;
