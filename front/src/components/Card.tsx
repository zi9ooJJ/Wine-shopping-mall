import "./Card.css";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return <div className={`${className}`}>{children}</div>;
};
