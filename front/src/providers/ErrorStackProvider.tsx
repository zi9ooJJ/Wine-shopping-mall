import { createContext, useState, useEffect } from "react";
import { ProductModel } from "../models";
import {
  getLocalStorageCart,
  removeLocalStorageCart,
  addLocalStorageCartItem,
} from "../utils/localStorage";

interface ErrorStackContextValues {
  errors: Error[];
  push: (err: Error) => void;
}

export const ErrorStackContext = createContext<ErrorStackContextValues>({
  errors: [],
  push: (err: Error) => {},
});

interface ErrorStackProviderProps {
  children: React.ReactNode;
}

export const ErrorStackProvider = ({ children }: ErrorStackProviderProps) => {
  const [errors, setErrors] = useState<Error[]>([]);

  function push(err: Error) {
    if (errors.length >= 10) {
      setErrors([...errors.slice(1), err]);
    } else {
      setErrors([...errors, err]);
    }
  }

  const values = {
    errors,
    push,
  };

  return (
    <ErrorStackContext.Provider value={values}>
      {children}
    </ErrorStackContext.Provider>
  );
};
