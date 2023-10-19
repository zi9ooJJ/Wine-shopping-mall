import "./Image.css";

interface ImageProps {
  url: string;
  alt: string;
}

export const Image = ({ url, alt }: ImageProps) => {
  return <img src={url} alt={alt} />;
};
