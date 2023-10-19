import { ChangeEvent, useState } from "react";

interface JoayoProps {
  className: string;
}

export const Joayo = ({ className }: JoayoProps) => {
  return (
    <div className={`rating gap-1 ${className}`}>
      <input
        type="radio"
        name="rating-3"
        className="mask mask-heart bg-red-400"
        readOnly
      />
      <input
        type="radio"
        name="rating-3"
        className="mask mask-heart bg-orange-400"
        checked
        readOnly
      />
      <input
        type="radio"
        name="rating-3"
        className="mask mask-heart bg-yellow-400"
        readOnly
      />
      <input
        type="radio"
        name="rating-3"
        className="mask mask-heart bg-lime-400"
        readOnly
      />
      <input
        type="radio"
        name="rating-3"
        className="mask mask-heart bg-green-400"
        readOnly
      />
    </div>
  );
};
