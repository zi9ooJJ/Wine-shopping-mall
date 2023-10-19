import "./ContentTitle.css";

interface ContentTitleArgs {
  text: string;
}

export const ContentTitle = ({ text }: ContentTitleArgs) => {
  return (
    <div className="content-title-container">
      <h1 className="content-title">{text}</h1>
    </div>
  );
};
