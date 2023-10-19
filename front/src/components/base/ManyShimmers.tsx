import { Shimmer } from "./Shimmer";

const SHIMMER_SIZE = 10;
// 로딩시 보여줄 화면
export const ManyShimmers = () => (
  <div className="w-full max-w-lg mx-auto flex flex-col justify-center items-center">
    {Array(SHIMMER_SIZE)
      .fill(SHIMMER_SIZE)
      .map((_, v) => (
        <Shimmer className="mt-10" key={v} />
      ))}
  </div>
);
