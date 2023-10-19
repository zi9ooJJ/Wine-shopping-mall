import { ChangeEvent, useState } from "react";
import { Form, Input, ScreenAvailHeight } from "../../components";
import { updateUserInfo } from "../../api/auth";
import { ValidationError } from "../../errors";
import { validateEmail, validateName, validatePassword } from "../../utils";
import { Helmet } from "react-helmet-async";

const UsersDetailPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    address: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: ValidationError.empty,
    password: ValidationError.empty,
    confirmPassword: ValidationError.empty,
    address: ValidationError.empty,
    email: ValidationError.empty,
  });

  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let error = ValidationError.empty;

    if (value.length > 0) {
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
          error = ValidationError.email;
        }
      }

      if (name === "confirmPassword") {
        if (value === formValues.password) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.confirmPassword;
        }
      }

      if (name === "email") {
        if (validateEmail(value)) {
          error = ValidationError.ok;
        } else {
          error = ValidationError.email;
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

  const onSubmit = async () => {
    const { name, password, address, email } = formValues;

    try {
      // TODO: 비밀번호 검증 등 추가
      updateUserInfo({ name, password, address, email });
      alert("정보 변경이 완료되었습니다.");
    } catch (err) {
      // TODO: 상세 오류 처리
      alert(err);
    }
  };

  // TODO: 버튼 액션 만들기
  return (
    <>
      <Helmet>
        <title>회원정보 수정</title>
      </Helmet>
      <Form
        formTitle="사용자 정보 수정"
        submitButtonText="변경"
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
          labelText="이름"
          type="text"
          value={formValues.name}
          name="name"
          onChange={onChangeForm}
          validationError={formErrors.name}
          placeholder="이름을 적어주세요"
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
        <Input
          labelText="비밀번호 확인"
          type="password"
          value={formValues.confirmPassword}
          name="confirmPassword"
          onChange={onChangeForm}
          validationError={formErrors.confirmPassword}
          placeholder="비밀번호를 다시 적어주세요"
        />
        <Input
          labelText="주소"
          type="text"
          value={formValues.address}
          name="address"
          onChange={onChangeForm}
          placeholder="주소를 적어주세요"
        />
      </Form>
    </>
  );
};

export default UsersDetailPage;
