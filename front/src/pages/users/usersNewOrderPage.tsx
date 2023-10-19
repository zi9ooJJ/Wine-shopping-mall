import { useHistory } from "react-router";
import { useState } from "react";
import { useAuthUser, useMutateOrder, useCart } from "../../hooks";
import { Helmet } from "react-helmet-async";
import { routes } from "../../config/routes";
import { CartList } from "../../components";
import { toPriceString } from "../../utils";
import { ValidationError, UnknownError } from "../../errors";
import {
  ScreenAvailHeight,
  Shimmer,
  Form,
  Input,
  Loading,
  ManyShimmers,
} from "../../components";
import {
  setLocalStorageToken,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../utils";
import { ChangeEvent } from "react";
import { createOrder } from "../../api/order";
import { OrderCard } from "../../components/order";

// createOrder
const { createOrders } = useMutateOrder();

//
//
//
//
const UsersNewOrderPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    address: "",
    price: "",
  });

  const [formErrors, setErrors] = useState({
    name: ValidationError.empty,
    phone: ValidationError.empty,
    address: ValidationError.empty,
    price: ValidationError.empty,
  });

  function confirmBuyProducts() {
    if (!confirm("상품 구매를 하겠습니까?")) {
      return;
    }
  }

  const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // setFormErrors({
    //   ...formErrors,
    //   [name]: error,
    // });

    // setFormValues({
    //   ...formValues,
    //   [name]: value,
    // });
  };

  const onSubmit = async () => {
    const { name, phone, address, price } = formValues;
  };

  return (
    <>
      <Helmet>
        <title>주문조회</title>
      </Helmet>
      <Form
        formTitle="주문정보"
        submitButtonText="주문하기"
        onSubmitButtonClick={onSubmit}
      >
        <Input
          labelText="이름"
          type="text"
          value={formValues.name}
          // validationError={formErrors.email}
          name="name"
          onChange={onChangeForm}
          placeholder="성함을 입력해주세요"
        />
        <Input
          labelText="전화번호"
          type="text"
          value={formValues.phone}
          name="name"
          onChange={onChangeForm}
          placeholder="전화번호을 입력해주세요"
          // validationError={formErrors.name}
        />
        <Input
          labelText="주소"
          type="text"
          value={formValues.address}
          validationError={formErrors.address}
          name="password"
          onChange={onChangeForm}
          placeholder="주소를 입력해주세요"
        />
        <div>{/* <OrderCard /> */}</div>
      </Form>
    </>
  );
};
//
export default UsersNewOrderPage;
