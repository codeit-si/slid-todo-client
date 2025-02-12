"use client";

import { useState } from "react";

import Modal from "@/components/@common/modal/modal";

const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  const handleToggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      {/* open과 onOpenChange를 모달의 상태를 외부에서 관리 */}
      {/* prop을 전달하지 않으면 내부에서 자체적으로 open 관리 */}
      <Modal.Root open={open} onOpenChange={setOpen}>
        {/* trigger는 모달을 열기 위한 버튼 (**필수**) */}
        <Modal.Trigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Open Modal
        </Modal.Trigger>
        {/* portal은 필수 */}
        <Modal.Portal>
          {/* 보여줄 요소들을 Content로 감싸서 사용 (필수) */}
          <Modal.Content>
            {/* Modal에서 사용할 수 있는 기본적인 요소들 제공 (Title, Description, Close) */}
            {/* asChild 속성을 사용하면 컴포넌트에 적용된 기본 태그 속성을 무시하고 자식 요소의 태그를 사용 */}
            <Modal.Title>TITLE</Modal.Title>
            <Modal.Description asChild>
              <div>
                <p className="flex w-full justify-center">Hello world!!</p>
              </div>
            </Modal.Description>
            <Modal.Close>취소</Modal.Close>
          </Modal.Content>
          {/* overlay는 모달의 배경을 담당 (필수) */}
          {/* isTriggerActive 속성으로 배경 클릭 시 모달 닫기 여부 설정 */}
          <Modal.Overlay className="bg-gray-500" isTriggerActive={false} />
        </Modal.Portal>
      </Modal.Root>
      <button className="p-4" onClick={handleToggleModal}>
        click here!!
      </button>
    </div>
  );
};

export default DashboardPage;
