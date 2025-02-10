"use client";

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

type ModalContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
};

const modalContext = createContext<ModalContextProps>({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
});

interface ModalProps {
  children: (props: {
    Trigger: typeof ModalTrigger;
    Portal: typeof ModalPortal;
  }) => ReactNode;
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

function useModal() {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

function Modal({ children, open: openProp, onOpenChange }: ModalProps) {
  const [open, setOpen] = useState<boolean>(openProp ?? false);
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  useEffect(() => {
    if (!onOpenChange) return undefined;
    onOpenChange(open);
  }, [open, onOpenChange]);

  const providerValue = useMemo(
    () => ({
      open,
      setOpen,
      toggleOpen,
    }),
    [open, setOpen, toggleOpen],
  );

  return (
    <modalContext.Provider value={providerValue}>
      {children({ Trigger: ModalTrigger, Portal: ModalPortal })}
    </modalContext.Provider>
  );
}

function ModalTrigger({ children }: PropsWithChildren) {
  const { toggleOpen } = useModal();

  return (
    <button type="button" onClick={toggleOpen}>
      {children}
    </button>
  );
}

function ModalPortal({ children }: PropsWithChildren) {
  const { open, setOpen } = useModal();

  const ChildrenWithCloseButton = (
    <div>
      <ModalOverlay />
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        x
      </button>
      {children}
    </div>
  );

  return (
    open &&
    createPortal(
      ChildrenWithCloseButton,
      document.getElementById("modal") as HTMLElement,
    )
  );
}

function ModalOverlay() {
  const { setOpen } = useModal();

  useEffect(() => {
    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="presentation"
      className="fixed inset-0 bg-black opacity-50"
      onClick={() => setOpen((prev) => !prev)}
    />
  );
}

export { Modal, ModalTrigger, ModalPortal };
