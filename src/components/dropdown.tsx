"use client";

import { useId } from "react";

// Dropdown 컴포넌트를 사용할 때는 다음과 같이 사용할 수 있습니다:
// import Dropdown from "@/components/dropdown";
// 예시 1:
// <Dropdown size="md" items={[ { label: "수정하기", onClick: handleEdit }, { label: "삭제하기", onClick: handleDelete } ]} />

// 예시 2:
// <Dropdown size="sm" items={[ { label: "수정하기", onClick: handleEdit }, { label: "삭제하기", onClick: handleDelete } ]} />

interface DropdownProps {
  size?: "sm" | "md";
  items: { txt: string; onClick: () => void }[];
}

function Dropdown({ size = "md", items }: DropdownProps) {
  const dropdownId = useId();

  const widthClass = size === "sm" ? "w-81" : "w-106";
  const itemHeightClass =
    size === "sm" ? "h-34 px-2 text-sm" : "h-42 px-4 text-lg";

  return (
    <div
      id={dropdownId}
      role="menu"
      aria-label="옵션 선택 드롭다운"
      className={`absolute z-50 h-auto ${widthClass} overflow-hidden rounded-[12px] bg-white shadow-lg`}
    >
      {items.map(({ txt, onClick }) => {
        const key = crypto.randomUUID(); // 중복 방지를 위한 유니크한 key

        return (
          <button
            key={key}
            onClick={onClick}
            role="menuitem"
            className={`font-pretendard flex w-full items-center justify-center font-normal text-[#334155] ${itemHeightClass}`}
          >
            {txt}
          </button>
        );
      })}
    </div>
  );
}

export default Dropdown;
