"use client";

import Modal from "@/components/@common/modal/modal";

const DashboardPage = () => {
  return (
    <Modal.Root>
      <Modal.Trigger className="rounded-md bg-blue-500 px-4 py-2 text-white">
        Open Modal
      </Modal.Trigger>
      <Modal.Portal>
        <Modal.Content>
          <Modal.Title>TITLE</Modal.Title>
          <Modal.Description className="flex w-full">
            <button>취소</button>
            <button>확인</button>
          </Modal.Description>
          <Modal.Close />
        </Modal.Content>
        <Modal.Overlay className="bg-gray-500" />
      </Modal.Portal>
    </Modal.Root>
  );
};

export default DashboardPage;
