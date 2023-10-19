import { Link as ReactLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => (
  <ReactLink to={to} style={{ textDecoration: "none" }}>
    {children}
  </ReactLink>
);
