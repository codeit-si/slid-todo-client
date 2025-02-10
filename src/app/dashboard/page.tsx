"use client";

import { Modal } from "@/components/@common/modal/modal";

const DashboardPage = () => {
  return (
    <Modal>
      {({ Trigger, Portal }) => (
        <>
          <Trigger>Open Modal</Trigger>
          <Portal>
            <div>Modal is SUCCESSLY OPENED</div>
          </Portal>
        </>
      )}
    </Modal>
  );
};

export default DashboardPage;
