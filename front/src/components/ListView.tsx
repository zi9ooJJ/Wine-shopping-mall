import "./ListView";

interface ListViewProps {
  children: React.ReactNode;
}

export const ListView = ({ children }: ListViewProps) => {
  return <ul className="listview">{children}</ul>;
};
