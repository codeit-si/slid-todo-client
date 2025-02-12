"use client";

import {
  ComponentProps,
  createContext,
  ElementType,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";
import splitChildrenByComponents from "@/utils/react-child-utils/split-children-by-component";

import Slot from "../slot/slot";

type ModalContextProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ModalCommonProps {
  className?: string;
}

type ModalElementProps<T extends ElementType> = ComponentProps<T> & {
  asChild?: boolean;
};

const modalContext = createContext<ModalContextProps>({
  open: false,
  setOpen: () => {},
});

function useModal() {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}

interface ModalRootProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function ModalRoot({
  children,
  open: openProp = false,
  onOpenChange,
}: PropsWithChildren<ModalRootProps>) {
  const [open, setOpen] = useState<boolean>(openProp);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  useEffect(() => {
    if (!onOpenChange) return undefined;
    onOpenChange(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const providerValue = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen],
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
  asChild = false,
}: ModalElementProps<"button">) {
  const { setOpen } = useModal();
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn("", className)}
      type="button"
      onClick={() => setOpen(true)}
    >
      {children}
    </Comp>
  );
}

function ModalPortal({
  children,
  className = "",
}: PropsWithChildren<ModalCommonProps>) {
  const { open } = useModal();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const ChildrenWithCloseButton = <div className={className}>{children}</div>;

  if (!isClient) return null;

  return open && createPortal(ChildrenWithCloseButton, document.body);
}

interface ModalOverlayProps {
  closeOnOverlyClick?: boolean;
}

function ModalOverlay({
  className,
  closeOnOverlyClick = true,
}: ModalCommonProps & ModalOverlayProps) {
  const { setOpen } = useModal();

  return (
    <div
      role="presentation"
      aria-hidden
      className={cn("fixed inset-0 bg-black opacity-50", className)}
      onClick={() => {
        if (closeOnOverlyClick) setOpen(false);
      }}
    />
  );
}
function ModalContent({
  children,
  className,
  asChild = false,
}: ModalElementProps<"div">) {
  const [[title, description], nonContentChild] = splitChildrenByComponents(
    [ModalTitle, ModalDescription],
    children,
  );
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-md border bg-white p-6 shadow-xl duration-200",
        className,
      )}
    >
      {title && <div className="flex justify-between">{title}</div>}
      {description}
      {nonContentChild}
    </Comp>
  );
}

function ModalTitle({
  children,
  className,
  asChild = false,
}: ModalElementProps<"h2">) {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp className={cn("text-xl font-semibold", className)}>{children}</Comp>
  );
}

function ModalDescription({
  children,
  className,
  asChild = false,
}: ModalElementProps<"p">) {
  const Comp = asChild ? Slot : "p";

  return <Comp className={cn("", className)}>{children}</Comp>;
}

interface ModalCloseProps extends ModalElementProps<"button"> {
  onClose?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function ModalClose({
  children,
  className,
  asChild = false,
  onClose = () => {},
}: ModalCloseProps) {
  const { setOpen } = useModal();
  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClose(e);
    setOpen(false);
  };

  return (
    <Comp
      className={cn("text-xl font-semibold", className)}
      onClick={handleClick}
    >
      {children}
    </Comp>
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
