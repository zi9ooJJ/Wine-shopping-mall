import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  ScreenAvailHeight,
  Shimmer,
  Form,
  Input,
  Loading,
  ManyShimmers,
} from "../../components";
import { useAuthUser } from "../../hooks";
import { register } from "../../api/auth";
import {
  setLocalStorageToken,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../utils";
import { ChangeEvent } from "react";
import { routes } from "../../config/routes";
import { UnknownError, ValidationError } from "../../errors";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  const { authUser, isLoading, error } = useAuthUser();
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: ValidationError.empty,
    name: ValidationError.empty,
    password: ValidationError.empty,
    confirmPassword: ValidationError.empty,
    address: ValidationError.empty,
  });

  // TODO: 리팩토링
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

      if (name === "name") {
        if (validateName(value)) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.name;
        }
      }

      if (name === "password") {
        if (validatePassword(value)) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.password;
        }
      }

      if (name === "confirmPassword") {
        if (value === formValues.password) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.confirmPassword;
        }
      }

      if (name === "address") {
        if (value.length >= 3) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.address;
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

  // 회원가입 버튼을 눌렀을 때 실행
  const onSubmit = async () => {
    const { email, name, password, address } = formValues;
    const {
      address: addressErr,
      confirmPassword: confirmPasswordErr,
      email: emailErr,
      name: nameErr,
      password: passwordErr,
    } = formErrors;
    try {
      // TODO: register http 함수의 인자로 phone 추가하기
      if (
        passwordErr !== ValidationError.ok &&
        confirmPasswordErr !== ValidationError.ok &&
        emailErr !== ValidationError.ok &&
        nameErr !== ValidationError.ok &&
        addressErr !== ValidationError.ok
      ) {
        throw new Error("회원가입 양식이 잘못되었습니다.");
      }
      const token = await register({ email, name, password, address });
      setLocalStorageToken({ token });
      window.location.href = routes.home.path;
      // history.push("/");
    } catch (err) {
      if (err instanceof UnknownError) {
        throw err;
      }

      alert((err as Error).message);
    }
  };

  // 1. 로그인 되었다면(token이 있는 것) token과 함께 사용자 정보 서버에 요청
  if (isLoading) {
    return <ManyShimmers />;
  }

  // 2. 이미 로그인 된 상태면 홈페이지로 이동
  if (authUser !== undefined && authUser !== null) {
    history.push(routes.home.path);
    return null;
  }

  // 3. 로그인 안되었으면 회원가입 페이지 컴포넌트 반환
  return (
    <>
      <Helmet>
        <title>회원가입을 하시오</title>
      </Helmet>
      <Form
        formTitle="회원가입"
        submitButtonText="회원가입"
        onSubmitButtonClick={onSubmit}
      >
        <Input
          labelText="이메일"
          type="text"
          value={formValues.email}
          validationError={formErrors.email}
          name="email"
          onChange={onChangeForm}
          placeholder="이메일을 적어주세요"
        />
        <Input
          labelText="이름"
          type="text"
          value={formValues.name}
          name="name"
          onChange={onChangeForm}
          placeholder="이름을 적어주세요"
          validationError={formErrors.name}
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={formValues.password}
          validationError={formErrors.password}
          name="password"
          onChange={onChangeForm}
          placeholder="비밀번호를 적어주세요"
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          value={formValues.confirmPassword}
          validationError={formErrors.confirmPassword}
          name="confirmPassword"
          onChange={onChangeForm}
          placeholder="비밀번호를 다시 적어주세요"
        />
        <Input
          labelText="주소"
          type="text"
          value={formValues.address}
          name="address"
          onChange={onChangeForm}
          placeholder="주소를 적어주세요"
          validationError={formErrors.address}
        />
      </Form>
    </>
  );
};

export default RegisterPage;
