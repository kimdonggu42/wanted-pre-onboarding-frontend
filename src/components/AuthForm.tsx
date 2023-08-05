import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from '../style/authStyle';
import {
  AuthFormTypeProps,
  FormValueType,
  FormValidType,
  FormErrMessageType,
} from '../util/interface';

function AuthForm({ submitBtnName, dataTestId, authReq }: AuthFormTypeProps) {
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

  const navigate = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
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
    try {
      if (formValid.emailValid && formValid.passwordValid) {
        authReq(formValue);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/todo');
    }
  }, [navigate]);

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.FormInput
        data-testid='email-input'
        value={formValue.email}
        placeholder='이메일을 입력해 주세요'
        onChange={onChangeInput}
      />
      {formValid.emailValid === false && (
        <Styled.ErrMessage>{formErrMessage.emailErrMessage}</Styled.ErrMessage>
      )}
      <Styled.FormInput
        data-testid='password-input'
        type='password'
        value={formValue.password}
        placeholder='비밀번호를 입력해 주세요'
        onChange={onChangeInput}
      />
      {formValid.passwordValid === false && (
        <Styled.ErrMessage>{formErrMessage.passwordErrMessage}</Styled.ErrMessage>
      )}
      <Styled.SubmitBtn
        data-testid={dataTestId}
        type='submit'
        disabled={formValid.emailValid === false || formValid.passwordValid === false}
      >
        {submitBtnName}
      </Styled.SubmitBtn>
    </Styled.Form>
  );
}

export default AuthForm;
