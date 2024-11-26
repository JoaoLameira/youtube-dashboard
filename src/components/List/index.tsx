import React from "react";
import { ListProps } from "~/components/List/types";
import { cn } from "~/utils";

const List = <T,>({
  items,
  renderItem,
  keyExtractor,
  className,
  noItemsMessage = "No items to display.",
}: ListProps<T>): JSX.Element => {
  if (items.length === 0) return <div>{noItemsMessage}</div>;

  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default List;
