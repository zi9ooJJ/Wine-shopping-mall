import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../api/auth";
import { Form, Input, Loading, ScreenAvailHeight } from "../../components";
import { useAuthUser } from "../../hooks";
import {
  setLocalStorageToken,
  validateEmail,
  validatePassword,
} from "../../utils";
import { ChangeEvent } from "react";
import { ValidationError } from "../../errors";
import { routes } from "../../config/routes";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const history = useHistory();
  const { authUser, isLoading, error } = useAuthUser();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: ValidationError.empty,
    password: ValidationError.empty,
  });

  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let error = ValidationError.empty;

    if (value.length > 0) {
      if (name === "email") {
        if (validateEmail(value)) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.email;
        }
      }

      if (name === "password") {
        if (validatePassword(value)) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.password;
        }
      }
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
    });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // 로그인 버튼 눌렀을 때 발생하는 로직
  const onSubmit = async () => {
    const { email, password } = formValues;
    try {
      const token = await login({ email, password });

      if (token) {
        setLocalStorageToken({ token });
        window.location.href = routes.home.path;
      }
    } catch (err) {
      alert("로그인 실패. 이메일과 비밀번호를 다시 입력해주세요");
      // TODO: 오류 상세 처리
      // if (err instanceof Error) {
      //   if (err.errorCode === AuthErrorCode.EmailNotFound) {
      //     //
      //   }
      //   if (err.errorCode === AuthErrorCode.InvalidPassword) {
      //   }
      // }
    }
  };

  // 1. 사용자 로그인 여부 확인중
  if (isLoading) {
    return <Loading />;
  }

  // 2. 이미 로그인 되었으므로 홈으로 보냄
  if (authUser) {
    history.push(routes.home.path);
    return null;
  }

  // 3. 로그인 안되었으므로 로그인 페이지로 이동 가능
  return (
    <>
      <Helmet>
        <title>로그인 하시오</title>
      </Helmet>
      <Form
        formTitle="로그인"
        submitButtonText="로그인"
        onSubmitButtonClick={onSubmit}
      >
        <Input
          labelText="이메일"
          type="text"
          value={formValues.email}
          name="email"
          onChange={onChangeForm}
          validationError={formErrors.email}
          placeholder="이메일을 적어주세요"
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={formValues.password}
          name="password"
          onChange={onChangeForm}
          validationError={formErrors.password}
          placeholder="비밀번호를 적어주세요"
        />
      </Form>
    </>
  );
};

export default LoginPage;
