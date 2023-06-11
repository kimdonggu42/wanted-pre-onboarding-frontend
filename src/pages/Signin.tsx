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

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'email') {
      setFormValue({ ...formValue, email: e.target.value });
      if (e.target.value.includes('@')) {
        setFormValid({ ...formValid, emailValid: true });
      } else {
        setFormValid({ ...formValid, emailValid: false });
        setFormErrMessage({
          ...formErrMessage,
          emailErrMessage: '올바르지 않은 이메일 형식입니다.',
        });
      }
    } else if (e.target.type === 'password') {
      setFormValue({ ...formValue, password: e.target.value });
      if (e.target.value.length >= 8) {
        setFormValid({ ...formValid, passwordValid: true });
      } else {
        setFormValid({ ...formValid, passwordValid: false });
        setFormErrMessage({
          ...formErrMessage,
          passwordErrMessage: '비밀번호는 8자 이상이어야 합니다.',
        });
      }
    }
  };

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
        formValid={formValid}
        formErrMessage={formErrMessage}
        onChangeInput={onChangeInput}
        handleSubmit={handleSubmit}
        submitBtnName={'로그인'}
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
