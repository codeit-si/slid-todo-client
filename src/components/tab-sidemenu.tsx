"use client";

// import Tab from "@/components/tab-sidemenu";
// <Tab text="{넣을 문구}" /> 이런식으로 사용하시면 됩니다.
// 예) <Tab text="자바스크립트로 웹 서비스 만들기" />

interface TabProps {
  text: string;
}

const Tab = ({ text }: TabProps) => {
  return (
    <div className="flex h-9 w-full items-center bg-white px-2 text-sm text-[#334155]">
      · {text}
    </div>
  );
};

export default Tab;
