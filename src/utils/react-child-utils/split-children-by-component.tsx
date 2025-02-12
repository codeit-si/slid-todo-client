import { Children, ComponentType, isValidElement, ReactNode } from "react";

export default function splitChildrenByComponents(
  targets: ComponentType[],
  children: ReactNode,
) {
  const extracted: ReactNode[] = new Array(targets.length).fill(null);
  const remaining: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return remaining.push(child);
    const index = targets.findIndex(
      (Component) => child.type === (<Component />).type,
    );
    if (index !== -1) {
      extracted[index] = child;
    } else {
      remaining.push(child);
    }
  });

  return [extracted, remaining];
}
