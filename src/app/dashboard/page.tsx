import {
  Modal,
  ModalPortal,
  ModalTrigger,
} from "@/components/@common/modal/modal";

const DashboardPage = () => {
  return (
    <Modal>
      <ModalTrigger>Open Modal</ModalTrigger>
      <ModalPortal>
        <div>Modal is SUCCESSLY OPENED</div>
      </ModalPortal>
    </Modal>
  );
};

export default DashboardPage;
