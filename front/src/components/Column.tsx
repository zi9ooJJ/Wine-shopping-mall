import "./Column.css";

interface ColumnProps {
  children: React.ReactNode;
  maxWidth: number;
}

export const Column = ({ children, maxWidth }: ColumnProps) => {
  return (
    <div
      className="column"
      style={{
        maxWidth: `${maxWidth}px`,
      }}
    >
      {children}
    </div>
  );
};
