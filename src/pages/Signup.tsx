import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthForm from '../components/AuthForm';
import { useSignup } from '../hooks/useSignup';
import { FormValueType, FormValidType, FormErrMessageType } from '../util/type';

export const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const FormName = styled.div`
  font-size: 30px;
  font-weight: bolder;
  margin-bottom: 20px;
`;

export const MoveBtn = styled.button`
  font-size: 15px;
  margin-top: 20px;
  width: 410px;
  height: 60px;
  border-radius: 4px;
  border: none;
  border: 1px solid lightgray;
  background-color: transparent;
  cursor: pointer;

  > .bold {
    font-weight: 600;
  }
`;

function Signup() {
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

  const { signup } = useSignup();

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
    signup(
      formValue.email,
      formValue.password,
      formValid.emailValid,
      formValid.passwordValid
    );
  };

  return (
    <FormContainer>
      <FormName>회원가입</FormName>
      <AuthForm
        formValue={formValue}
        formValid={formValid}
        formErrMessage={formErrMessage}
        onChangeInput={onChangeInput}
        handleSubmit={handleSubmit}
        submitBtnName={'회원가입'}
      />
      <Link to="/">
        <MoveBtn>
          계정이 있으신가요? <span className="bold">로그인</span>
        </MoveBtn>
      </Link>
    </FormContainer>
  );
}

export default Signup;
