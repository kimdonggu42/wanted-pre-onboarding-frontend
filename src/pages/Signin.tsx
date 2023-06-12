import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useSignin } from '../hooks/useSignin';
import { FormValueType, FormValidType, FormErrMessageType } from '../util/type';
import * as Signup from './Signup';

function Signin() {
  const [formValue, setFormValue] = useState<FormValueType>({
    email: '',
    password: '',
  });
  const [formValid, setFormValid] = useState<FormValidType>({
    emailValid: false,
    passwordValid: false,
  });
  const [formErrMessage, setFormErrMessage] = useState<FormErrMessageType>({
    emailErrMessage: '',
    passwordErrMessage: '',
  });

  const { signin } = useSignin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(
      formValue.email,
      formValue.password,
      formValid.emailValid,
      formValid.passwordValid
    );
  };

  return (
    <Signup.FormContainer>
      <Signup.FormName>로그인</Signup.FormName>
      <AuthForm
        formValue={formValue}
        setFormValue={setFormValue}
        formValid={formValid}
        setFormValid={setFormValid}
        formErrMessage={formErrMessage}
        setFormErrMessage={setFormErrMessage}
        handleSubmit={handleSubmit}
        submitBtnName={'로그인'}
        dataTestId={'signin-button'}
      />
      <Link to="/signup">
        <Signup.MoveBtn>
          계정이 없으신가요? <span className="bold">가입하기</span>
        </Signup.MoveBtn>
      </Link>
    </Signup.FormContainer>
  );
}

export default Signin;
