import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 90vw;
  max-width: 410px;
  border-radius: 4px;
  border: none;
  border: 1px solid lightgray;
`;

export const EmailInput = styled.input`
  font-size: 14px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  border: none;
  border: 1px solid lightgray;

  &:focus {
    outline: none;
  }
`;

export const PasswordInput = styled.input`
  font-size: 14px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  padding: 10px 8px 10px 8px;
  margin-top: 10px;
  border: none;
  border: 1px solid lightgray;

  &:focus {
    outline: none;
  }
`;

export const SubmitBtn = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  color: white;
  font-size: 15px;
  font-weight: 600;
  background-color: ${(props) => props.theme.color.mainColor};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: lightgray;
  }
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

export const ErrMessage = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${(props) => props.theme.color.errColor};
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
      <Form onSubmit={handleSubmit}>
        <EmailInput
          data-testid="email-input"
          type="email"
          value={formValue.email}
          placeholder="이메일을 입력해 주세요"
          onChange={onChangeInput}
        />
        {formValid.emailValid === false && (
          <ErrMessage>{formErrMessage.emailErrMessage}</ErrMessage>
        )}
        <PasswordInput
          data-testid="password-input"
          type="password"
          value={formValue.password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={onChangeInput}
        />
        {formValid.passwordValid === false && (
          <ErrMessage>{formErrMessage.passwordErrMessage}</ErrMessage>
        )}
        <SubmitBtn
          data-testid="signup-button"
          type="submit"
          disabled={
            formValid.emailValid === false || formValid.passwordValid === false
          }
        >
          회원가입
        </SubmitBtn>
      </Form>
      <Link to="/">
        <MoveBtn>
          계정이 있으신가요? <span className="bold">로그인</span>
        </MoveBtn>
      </Link>
    </FormContainer>
  );
}

export default Signup;
