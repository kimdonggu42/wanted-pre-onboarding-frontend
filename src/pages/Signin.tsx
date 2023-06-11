import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <Signup.Form onSubmit={handleSubmit}>
        <Signup.EmailInput
          data-testid="email-input"
          type="email"
          value={formValue.email}
          placeholder="이메일을 입력해 주세요"
          onChange={onChangeInput}
        />
        {formValid.emailValid === false && (
          <Signup.ErrMessage>
            {formErrMessage.emailErrMessage}
          </Signup.ErrMessage>
        )}
        <Signup.PasswordInput
          data-testid="password-input"
          type="password"
          value={formValue.password}
          placeholder="비밀번호를 입력해 주세요"
          onChange={onChangeInput}
        />
        {formValid.passwordValid === false && (
          <Signup.ErrMessage>
            {formErrMessage.passwordErrMessage}
          </Signup.ErrMessage>
        )}
        <Signup.SubmitBtn
          data-testid="signin-button"
          type="submit"
          disabled={
            formValid.emailValid === false || formValid.passwordValid === false
          }
        >
          로그인
        </Signup.SubmitBtn>
      </Signup.Form>
      <Link to="/signup">
        <Signup.MoveBtn>
          계정이 없으신가요? <span className="bold">가입하기</span>
        </Signup.MoveBtn>
      </Link>
    </Signup.FormContainer>
  );
}

export default Signin;
