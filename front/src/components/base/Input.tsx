import { ChangeEventHandler } from "react";
import { ValidationError } from "../../errors";

interface InputProps {
  labelText: string;
  type: "text" | "password" | "email";
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  validationError?: ValidationError;
}

export const Input = ({
  labelText,
  type,
  placeholder,
  value,
  onChange,
  name,
  validationError = ValidationError.empty,
}: InputProps) => {
  let validationClassName = ``;

  if (validationError !== ValidationError.empty) {
    if (validationError === ValidationError.ok) {
      validationClassName = "text-green-600 border-green-600";
    } else {
      validationClassName = "text-red-600 border-red-600";
    }
  }

  return (
    <div className="w-60 mb-3">
      <label className="font-semibold text-lg shadow-lg dark:text-gray-700">
        {labelText}
      </label>
      <input
        className={`focus:motion-safe:animate-bounce input input-bordered w-full max-w-xs shadow-lg shadow-slate-700 dark:text-neutral-content ${validationClassName}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
      <div className="h-5">
        {validationError !== ValidationError.empty && (
          <span className={`${validationClassName} text-xs`}>
            {validationError}
          </span>
        )}
      </div>
    </div>
  );
};
