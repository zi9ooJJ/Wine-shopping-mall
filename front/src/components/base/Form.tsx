import { Button } from "./Button";

interface FormProps {
  formTitle: string;
  children: React.ReactNode;
  submitButtonText: string;
  onSubmitButtonClick: VoidFunction;
}

export const Form = ({
  formTitle,
  children,
  submitButtonText,
  onSubmitButtonClick,
}: FormProps) => {
  return (
    <div className="mt-7 pb-40 w-full h-full flex justify-center items-center">
      <div className="max-w-xl px-10 py-10 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            {formTitle}
          </span>
        </h1>
        <span className="mt-20"></span>
        {children}
        <Button
          text={submitButtonText}
          onClick={onSubmitButtonClick}
          className="mt-4 w-40 drop-shadow-xl shadow-neutral-content"
        />
      </div>
    </div>
  );
};
