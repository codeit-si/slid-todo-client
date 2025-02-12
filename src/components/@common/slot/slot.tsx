import React, { Children, isValidElement, PropsWithChildren } from "react";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Slot(props: SlotProps) {
  const { children, ...slotProps } = props;

  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    const newElement = slottable.props.children as React.ReactNode;

    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1)
          return React.Children.only(null);
        return React.isValidElement(newElement)
          ? (newElement.props.children as React.ReactNode)
          : null;
      }
      return child;
    });

    return (
      <SlotClone {...slotProps}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }
  return <SlotClone {...slotProps}>{children}</SlotClone>;
}

function SlotClone<T>(props: PropsWithChildren<T>) {
  const { children, ...slotProps } = props;

  if (isValidElement(children)) {
    const childrenProps = children.props;
    return React.cloneElement(children, mergeProps(slotProps, childrenProps));
  }

  return Children.count(children) > 1 ? Children.only(null) : null;
}

const Slottable = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

function isSlottable(
  child: React.ReactNode,
): child is React.ReactElement<
  React.ComponentProps<typeof Slottable>,
  typeof Slottable
> {
  return React.isValidElement(child) && child.type === Slottable;
}

type UnknownProps = Record<string, unknown>;

function mergeProps(slotProps: UnknownProps, childProps: UnknownProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          if (typeof childPropValue === "function") {
            childPropValue(...args);
          }
          if (typeof slotPropValue === "function") {
            slotPropValue(...args);
          }
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === "style" && slotPropValue && childPropValue) {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...slotProps, ...overrideProps };
}
