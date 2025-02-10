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
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal<T extends { children: ReactNode }>({
  children,
  open: openProp,
  onOpenChange,
}: T & ModalProps) {
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
      {children}
    </modalContext.Provider>
  );
}

function ModalTrigger({ children }: PropsWithChildren) {
  const { toggleOpen } = useContext(modalContext);

  return (
    <button type="button" onClick={toggleOpen}>
      {children}
    </button>
  );
}

function ModalPortal({ children }: PropsWithChildren) {
  const { open, setOpen } = useContext(modalContext);

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
  const { setOpen } = useContext(modalContext);

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
