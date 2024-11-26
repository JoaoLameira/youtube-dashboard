export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  className?: string;
  noItemsMessage?: string;
}

export interface ListItemProps {
  title: string;
  description: string;
  videoId: string;
}
