import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../config/constants";
import { ChangeEvent } from "react";
import { withdraw } from "../../api/auth";
import { routes } from "../../config/routes";
import { ValidationError } from "../../errors";
import { Form, Input } from "../../components";
import { Helmet } from "react-helmet-async";
import { removeLocalStorageToken } from "../../utils";

const WithdrawPage = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(ValidationError.empty);

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let error = ValidationError.empty;

    if (value.length > 0) {
      error = ValidationError.ok;
    } else {
      error = ValidationError.password;
    }

    setPasswordError(error);
    setPassword(value);
  };

  // TODO: 미완성
  const onSubmit = async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    // 로그인이 되지 않으면
    // token이 없으니 home으로 돌아감
    if (!token) {
      alert("로그인되지 않았습니다.");
      history.push(routes.home.path);
    }

    try {
      await withdraw({ password });
      removeLocalStorageToken();
      window.location.href = routes.home.path;
    } catch (err) {
      alert("오류 발생");
    }
  };

  return (
    <div>
      <Helmet>
        <title>회원탈퇴</title>
      </Helmet>
      <Form
        formTitle="회원정보 삭제"
        submitButtonText="회원정보 삭제"
        onSubmitButtonClick={onSubmit}
      >
        <Input
          labelText="현재 비밀번호"
          type="password"
          value={password}
          name="password"
          onChange={onChangePassword}
          placeholder="비밀번호를 적어주세요"
        />
      </Form>
    </div>
  );
};

export default WithdrawPage;
