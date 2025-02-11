"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";
import splitChildrenByComponents from "@/utils/react-child-utils/split-children-by-component";

type ModalContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
};

interface ModalCommonProps {
  className?: string;
}

const modalContext = createContext<ModalContextProps>({
  open: false,
  setOpen: () => {},
  toggleOpen: () => {},
});

function useModal() {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

interface ModalRootProps {
  open?: boolean;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalRoot({
  children,
  open: openProp,
  onOpenChange,
}: PropsWithChildren<ModalRootProps>) {
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

function ModalTrigger({
  children,
  className,
}: PropsWithChildren<ModalCommonProps>) {
  const { toggleOpen } = useModal();

  return (
    <button className={cn("", className)} type="button" onClick={toggleOpen}>
      {children}
    </button>
  );
}

function ModalPortal({ children }: PropsWithChildren<ModalCommonProps>) {
  const { open } = useModal();

  const ChildrenWithCloseButton = <div>{children}</div>;

  return open && createPortal(ChildrenWithCloseButton, document.body);
}

function ModalOverlay({ className }: ModalCommonProps) {
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
      className={cn("fixed inset-0 bg-black opacity-50", className)}
      onClick={() => setOpen((prev) => !prev)}
    />
  );
}

function ModalContent({
  children,
  className,
}: PropsWithChildren<ModalCommonProps>) {
  const [[title, close, description], nonModalChild] =
    splitChildrenByComponents(
      [ModalTitle, ModalClose, ModalDescription],
      children,
    );

  return (
    <div
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border bg-white p-6 shadow-xl duration-200",
        className,
      )}
    >
      <div className="flex justify-between">
        {title}
        {close}
      </div>
      {description}
      {nonModalChild}
    </div>
  );
}

interface ModalChildProps extends ModalCommonProps {
  asChild?: boolean;
}

function ModalTitle({
  children,
  className,
  asChild = false,
}: PropsWithChildren<ModalChildProps>) {
  if (asChild) {
    return children;
  }
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
}

function ModalDescription({
  children,
  className,
  asChild = false,
}: PropsWithChildren<ModalChildProps>) {
  if (asChild) {
    return children;
  }
  return (
    <div className={cn("text-xl font-semibold", className)}>{children}</div>
  );
}

function ModalClose({
  children,
  className,
  asChild = false,
}: PropsWithChildren<ModalChildProps>) {
  const { setOpen } = useModal();

  if (asChild) {
    return children;
  }
  return (
    <button
      className={cn("text-xl font-semibold", className)}
      onClick={() => setOpen(false)}
    >
      X
    </button>
  );
}

const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
};

export default Modal;
