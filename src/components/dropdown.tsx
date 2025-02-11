"use client";

import React from "react";

// import Dropdown from "@/components/dropdown";
// <Dropdown size="{md, sm 중에 선택}" items = { [ {label: "{드롭 다운 항목 텍스트}", onClick: {함수}}] } /> 이런 식으로 사용하시면 됩니다.
// 예) <Dropdown size="md" items={[ { label: "수정하기", onClick: handleEdit }, { label: "삭제하기", onClick: handleDelete }, ]} />

interface DropdownProps {
  size?: "sm" | "md";
  items: { label: string; onClick: () => void }[];
}

const Dropdown = ({ size = "md", items }: DropdownProps) => {
  return (
    <div
      className={`absolute ${
        size === "sm" ? "w-[81px] h-auto" : "w-[106px] h-auto"
      } shadow-lg bg-white rounded-[12px] overflow-hidden`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`w-full flex justify-center items-center text-[#334155] font-pretendard font-normal ${
            size === "sm" ? "h-[34px] px-2 text-sm" : "h-[42px] px-4 text-lg"
          } ${
            index === 0
              ? "rounded-t-[12px]"
              : index === items.length - 1
              ? "rounded-b-[12px]"
              : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
